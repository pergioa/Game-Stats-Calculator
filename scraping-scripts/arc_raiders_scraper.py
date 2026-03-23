"""
Arc Raiders Weapon Stats Scraper
=================================
Scrapes weapon stats (damage, headshot multiplier, fire rate, etc.)
from thearcraiders.com and killmath.com, then merges the results.

Fallback hardcoded data (Patch 1.20.0) is used if scraping fails.

Usage:
    pip install requests beautifulsoup4
    python arc_raiders_scraper.py

Output:
    arc_raiders_weapons.json
"""

import json
import re
import time
import logging
from dataclasses import dataclass, asdict
from typing import Optional

import requests
from bs4 import BeautifulSoup

# ── Logging ──────────────────────────────────────────────────────────────────

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
)
log = logging.getLogger(__name__)

# ── Data Model ────────────────────────────────────────────────────────────────

@dataclass
class Weapon:
    name: str
    weapon_class: str
    rarity: str
    ammo_type: str
    fire_mode: str
    base_damage: float
    headshot_damage: float
    headshot_multiplier: float
    leg_multiplier: float          # universal 0.75 across all weapons
    fire_rate: float               # shots per second
    magazine: int
    arc_penetration: str
    dps: Optional[float] = None
    ttk_light_shield: Optional[float] = None   # seconds vs light shield, body shots
    shots_to_kill_light: Optional[int] = None
    patch_version: str = "1.20.0"

# ── HTTP Helper ───────────────────────────────────────────────────────────────

HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
        "AppleWebKit/537.36 (KHTML, like Gecko) "
        "Chrome/124.0.0.0 Safari/537.36"
    ),
    "Accept-Language": "en-US,en;q=0.9",
}

def fetch(url: str, retries: int = 3, delay: float = 2.0) -> Optional[BeautifulSoup]:
    """Fetch a URL and return a BeautifulSoup object, or None on failure."""
    for attempt in range(1, retries + 1):
        try:
            log.info(f"Fetching {url} (attempt {attempt})")
            resp = requests.get(url, headers=HEADERS, timeout=20)
            resp.raise_for_status()
            return BeautifulSoup(resp.text, "html.parser")
        except requests.RequestException as exc:
            log.warning(f"Attempt {attempt} failed: {exc}")
            if attempt < retries:
                time.sleep(delay)
    log.error(f"All {retries} attempts failed for {url}")
    return None

# ── Source 1: thearcraiders.com ───────────────────────────────────────────────

def scrape_thearcraiders() -> dict[str, dict]:
    """
    Scrapes the weapon cards from thearcraiders.com/weapons/.
    Returns a dict keyed by lowercased weapon name.
    """
    url = "https://thearcraiders.com/weapons/"
    soup = fetch(url)
    if not soup:
        return {}

    weapons = {}

    # Each weapon card is inside a div with a heading tag for the weapon name
    # Structure: weapon name in h3, stats in labeled divs
    cards = soup.select("div.weapon-card, article.weapon, div[class*='weapon']")
    
    if not cards:
        # Fallback: look for any structured card-like elements containing weapon names
        cards = soup.find_all("div", class_=re.compile(r"card|weapon|item", re.I))

    for card in cards:
        try:
            name_el = card.find(["h2", "h3", "h4"])
            if not name_el:
                continue
            name = name_el.get_text(strip=True)
            if not name or len(name) > 40:
                continue

            data = {"name": name}

            text = card.get_text(" ", strip=True)

            # Extract numeric stats using regex on label: value patterns
            for label, key in [
                ("Damage", "base_damage"),
                ("Fire Rate", "fire_rate"),
                ("Range", "range"),
                ("Magazine", "magazine"),
            ]:
                m = re.search(rf"{label}\s*[:\-]?\s*([\d.]+)", text, re.I)
                if m:
                    data[key] = float(m.group(1))

            # Rarity, ammo type, fire mode
            for label, key in [
                ("Ammo", "ammo_type"),
                ("Fire Mode", "fire_mode"),
            ]:
                m = re.search(rf"{label}\s*[:\-]?\s*([A-Za-z ]+?)(?:\n|  |\d)", text, re.I)
                if m:
                    data[key] = m.group(1).strip()

            rarity_tags = ["Common", "Uncommon", "Rare", "Epic", "Legendary"]
            for r in rarity_tags:
                if r.lower() in text.lower():
                    data["rarity"] = r
                    break

            weapons[name.lower()] = data
        except Exception as exc:
            log.debug(f"Error parsing card: {exc}")

    log.info(f"thearcraiders.com: scraped {len(weapons)} weapons")
    return weapons

# ── Source 2: killmath.com ────────────────────────────────────────────────────

def scrape_killmath() -> dict[str, dict]:
    """
    Scrapes the weapon rankings table from killmath.com which contains
    base damage, headshot damage, DPS, TTK, and shots-to-kill.
    Returns a dict keyed by lowercased weapon name.
    """
    url = "https://killmath.com/arc-raiders-ttk-calculator/weapon-rankings"
    soup = fetch(url)
    if not soup:
        return {}

    weapons = {}

    table = soup.find("table")
    if not table:
        log.warning("killmath.com: could not find stats table")
        return {}

    headers_row = table.find("tr")
    if not headers_row:
        return {}

    col_headers = [th.get_text(strip=True).lower() for th in headers_row.find_all(["th", "td"])]
    log.info(f"killmath columns: {col_headers}")

    for row in table.find_all("tr")[1:]:  # skip header row
        cells = row.find_all(["td", "th"])
        if len(cells) < 5:
            continue
        try:
            row_data = [c.get_text(strip=True) for c in cells]
            # Map columns dynamically
            entry = {}
            for i, col in enumerate(col_headers):
                if i < len(row_data):
                    entry[col] = row_data[i]

            # Try to get weapon name from a link or the NAME/WEAPON column
            name = None
            for key in ["weapon", "name", "#"]:
                if key in entry and entry[key] and not entry[key].isdigit():
                    name = entry[key]
                    break
            if not name:
                # Try finding an anchor tag
                link = row.find("a")
                if link:
                    name = link.get_text(strip=True)

            if not name:
                continue

            weapon_data = {"name": name}

            # Map known column names to our fields
            col_map = {
                "dmg": "base_damage",
                "damage": "base_damage",
                "hs dmg": "headshot_damage",
                "headshot": "headshot_damage",
                "dps": "dps",
                "ttk": "ttk_light_shield",
                "stk": "shots_to_kill_light",
                "mag": "magazine",
                "class": "weapon_class",
                "ammo": "ammo_type",
            }
            for col, field in col_map.items():
                if col in entry and entry[col]:
                    val = entry[col]
                    # Strip non-numeric suffixes like "s" from TTK
                    numeric = re.sub(r"[^0-9.]", "", val)
                    if numeric:
                        weapon_data[field] = float(numeric)

            weapons[name.lower()] = weapon_data

        except Exception as exc:
            log.debug(f"Error parsing killmath row: {exc}")

    log.info(f"killmath.com: scraped {len(weapons)} weapons")
    return weapons

# ── Merge Sources ─────────────────────────────────────────────────────────────

def merge_sources(source1: dict, source2: dict) -> dict:
    """Merge two weapon dicts, with source2 taking priority on conflicts."""
    merged = {}
    all_keys = set(source1) | set(source2)
    for key in all_keys:
        merged[key] = {**(source1.get(key, {})), **(source2.get(key, {}))}
    return merged

# ── Hardcoded Fallback Data (Patch 1.20.0) ───────────────────────────────────
# Source: killmath.com (verified March 21, 2026) and thearcraiders.com
# Used automatically if scraping fails or returns incomplete data.

FALLBACK_DATA: list[dict] = [
    # name, class, rarity, ammo, fire_mode, base_dmg, hs_dmg, hs_mult, fire_rate, mag, arc_pen, dps, ttk, stk
    {"name": "Vulcano",   "weapon_class": "Shotgun",       "rarity": "Epic",      "ammo_type": "Shotgun Ammo", "fire_mode": "Semi-Auto",     "base_damage": 49.5, "headshot_damage": 49.5,  "headshot_multiplier": 1.00, "fire_rate": 26.3, "magazine": 6,  "arc_penetration": "Medium",     "dps": 124, "ttk_light_shield": 0.80, "shots_to_kill_light": 3},
    {"name": "Torrente",  "weapon_class": "LMG",           "rarity": "Rare",      "ammo_type": "Medium Ammo",  "fire_mode": "Full-Auto",     "base_damage": 8.0,  "headshot_damage": 16.0,  "headshot_multiplier": 2.00, "fire_rate": 58.3, "magazine": 90, "arc_penetration": "Medium",     "dps": 107, "ttk_light_shield": 1.05, "shots_to_kill_light": 15},
    {"name": "Bobcat",    "weapon_class": "SMG",           "rarity": "Common",    "ammo_type": "Light Ammo",   "fire_mode": "Full-Auto",     "base_damage": 6.0,  "headshot_damage": 12.0,  "headshot_multiplier": 2.00, "fire_rate": 66.7, "magazine": 20, "arc_penetration": "Weak",       "dps": 103, "ttk_light_shield": 1.11, "shots_to_kill_light": 20},
    {"name": "Tempest",   "weapon_class": "Assault Rifle", "rarity": "Epic",      "ammo_type": "Medium Ammo",  "fire_mode": "Full-Auto",     "base_damage": 10.0, "headshot_damage": 15.0,  "headshot_multiplier": 1.50, "fire_rate": 36.7, "magazine": 25, "arc_penetration": "Strong",     "dps": 92,  "ttk_light_shield": 1.19, "shots_to_kill_light": 12},
    {"name": "Venator",   "weapon_class": "Pistol",        "rarity": "Rare",      "ammo_type": "Medium Ammo",  "fire_mode": "Semi-Auto",     "base_damage": 16.0, "headshot_damage": 32.0,  "headshot_multiplier": 2.00, "fire_rate": 36.7, "magazine": 10, "arc_penetration": "Medium",     "dps": 93,  "ttk_light_shield": 1.20, "shots_to_kill_light": 8},
    {"name": "Rattler",   "weapon_class": "Assault Rifle", "rarity": "Common",    "ammo_type": "Medium Ammo",  "fire_mode": "Full-Auto",     "base_damage": 9.0,  "headshot_damage": 18.0,  "headshot_multiplier": 2.00, "fire_rate": 33.3, "magazine": 22, "arc_penetration": "Medium",     "dps": 77,  "ttk_light_shield": 1.41, "shots_to_kill_light": 13},
    {"name": "Bettina",   "weapon_class": "Assault Rifle", "rarity": "Epic",      "ammo_type": "Heavy Ammo",   "fire_mode": "Full-Auto",     "base_damage": 14.0, "headshot_damage": 28.0,  "headshot_multiplier": 2.00, "fire_rate": 32.0, "magazine": 20, "arc_penetration": "Strong",     "dps": 77,  "ttk_light_shield": 1.45, "shots_to_kill_light": 9},
    {"name": "Arpeggio",  "weapon_class": "Assault Rifle", "rarity": "Uncommon",  "ammo_type": "Medium Ammo",  "fire_mode": "3-Round Burst", "base_damage": 9.5,  "headshot_damage": 19.0,  "headshot_multiplier": 2.00, "fire_rate": 18.3, "magazine": 24, "arc_penetration": "Medium",     "dps": 73,  "ttk_light_shield": 1.56, "shots_to_kill_light": 13},
    {"name": "Burletta",  "weapon_class": "Pistol",        "rarity": "Common",    "ammo_type": "Light Ammo",   "fire_mode": "Semi-Auto",     "base_damage": 10.0, "headshot_damage": 20.0,  "headshot_multiplier": 2.00, "fire_rate": 28.0, "magazine": 12, "arc_penetration": "Weak",       "dps": 69,  "ttk_light_shield": 1.60, "shots_to_kill_light": 12},
    {"name": "Stitcher",  "weapon_class": "SMG",           "rarity": "Common",    "ammo_type": "Light Ammo",   "fire_mode": "Full-Auto",     "base_damage": 6.5,  "headshot_damage": 11.4,  "headshot_multiplier": 1.75, "fire_rate": 45.3, "magazine": 20, "arc_penetration": "Weak",       "dps": 73,  "ttk_light_shield": 1.61, "shots_to_kill_light": 19},
    {"name": "Il Toro",   "weapon_class": "Shotgun",       "rarity": "Uncommon",  "ammo_type": "Shotgun Ammo", "fire_mode": "Pump-Action",   "base_damage": 67.5, "headshot_damage": 101.2, "headshot_multiplier": 1.50, "fire_rate": 14.3, "magazine": 8,  "arc_penetration": "Medium",     "dps": 41,  "ttk_light_shield": 1.67, "shots_to_kill_light": 2},
    {"name": "Kettle",    "weapon_class": "Assault Rifle", "rarity": "Common",    "ammo_type": "Light Ammo",   "fire_mode": "Semi-Auto",     "base_damage": 8.5,  "headshot_damage": 21.2,  "headshot_multiplier": 2.50, "fire_rate": 26.0, "magazine": 20, "arc_penetration": "Weak",       "dps": 66,  "ttk_light_shield": 1.68, "shots_to_kill_light": 14},
    {"name": "Anvil",     "weapon_class": "Pistol",        "rarity": "Uncommon",  "ammo_type": "Heavy Ammo",   "fire_mode": "Single-Action", "base_damage": 40.0, "headshot_damage": 100.0, "headshot_multiplier": 2.50, "fire_rate": 16.3, "magazine": 6,  "arc_penetration": "Strong",     "dps": 47,  "ttk_light_shield": 1.71, "shots_to_kill_light": 3},
    {"name": "Renegade",  "weapon_class": "Battle Rifle",  "rarity": "Rare",      "ammo_type": "Medium Ammo",  "fire_mode": "Lever-Action",  "base_damage": 35.0, "headshot_damage": 78.8,  "headshot_multiplier": 2.25, "fire_rate": 21.0, "magazine": 8,  "arc_penetration": "Strong",     "dps": 46,  "ttk_light_shield": 2.31, "shots_to_kill_light": 4},
    {"name": "Osprey",    "weapon_class": "Sniper Rifle",  "rarity": "Rare",      "ammo_type": "Medium Ammo",  "fire_mode": "Bolt-Action",   "base_damage": 45.0, "headshot_damage": 90.0,  "headshot_multiplier": 2.00, "fire_rate": 17.7, "magazine": 8,  "arc_penetration": "Strong",     "dps": 37,  "ttk_light_shield": 2.44, "shots_to_kill_light": 3},
    {"name": "Equalizer", "weapon_class": "Special",       "rarity": "Legendary", "ammo_type": "Energy Ammo",  "fire_mode": "Full-Auto",     "base_damage": 8.0,  "headshot_damage": 16.0,  "headshot_multiplier": 2.00, "fire_rate": 33.3, "magazine": 40, "arc_penetration": "Very Strong", "dps": 41,  "ttk_light_shield": 2.71, "shots_to_kill_light": 15},
    {"name": "Aphelion",  "weapon_class": "Battle Rifle",  "rarity": "Legendary", "ammo_type": "Energy Ammo",  "fire_mode": "2-Round Burst", "base_damage": 25.0, "headshot_damage": 50.0,  "headshot_multiplier": 2.00, "fire_rate": 9.0,  "magazine": 10, "arc_penetration": "Very Strong", "dps": 36,  "ttk_light_shield": 2.80, "shots_to_kill_light": 5},
    {"name": "Ferro",     "weapon_class": "Battle Rifle",  "rarity": "Common",    "ammo_type": "Heavy Ammo",   "fire_mode": "Break-Action",  "base_damage": 40.0, "headshot_damage": 100.0, "headshot_multiplier": 2.50, "fire_rate": 6.6,  "magazine": 1,  "arc_penetration": "Strong",     "dps": 23,  "ttk_light_shield": 3.46, "shots_to_kill_light": 3},
    {"name": "Hairpin",   "weapon_class": "Pistol",        "rarity": "Common",    "ammo_type": "Light Ammo",   "fire_mode": "Slide-Action",  "base_damage": 20.0, "headshot_damage": 40.0,  "headshot_multiplier": 2.00, "fire_rate": 9.0,  "magazine": 8,  "arc_penetration": "Weak",       "dps": 23,  "ttk_light_shield": 4.27, "shots_to_kill_light": 6},
    {"name": "Jupiter",   "weapon_class": "Sniper Rifle",  "rarity": "Legendary", "ammo_type": "Energy Ammo",  "fire_mode": "Bolt-Action",   "base_damage": 60.0, "headshot_damage": 120.0, "headshot_multiplier": 2.00, "fire_rate": 7.7,  "magazine": 5,  "arc_penetration": "Very Strong", "dps": 19,  "ttk_light_shield": 6.47, "shots_to_kill_light": 3},
]

# Universal limb multiplier (same for all weapons)
LEG_MULTIPLIER = 0.75

# Shield damage reduction values
SHIELD_MITIGATION = {
    "none":   0.00,
    "light":  0.40,
    "medium": 0.425,
    "heavy":  0.525,
}

# ── Build Final Dataset ───────────────────────────────────────────────────────

def build_dataset(use_scraper: bool = True) -> list[dict]:
    """
    Attempts to scrape live data. Falls back to hardcoded data if scraping
    yields fewer than 10 weapons (likely blocked or page structure changed).
    """
    scraped = {}

    if use_scraper:
        log.info("Attempting live scrape...")
        source1 = scrape_thearcraiders()
        time.sleep(1)
        source2 = scrape_killmath()
        scraped = merge_sources(source1, source2)
        log.info(f"Live scrape total: {len(scraped)} weapons")

    if len(scraped) < 10:
        if use_scraper:
            log.warning("Scrape returned too few results. Using fallback data.")
        else:
            log.info("Using hardcoded fallback data (Patch 1.20.0).")
        return enrich_fallback(FALLBACK_DATA)

    # Enrich scraped data with calculated fields
    results = []
    for name_key, data in scraped.items():
        entry = data.copy()
        entry.setdefault("leg_multiplier", LEG_MULTIPLIER)
        entry.setdefault("patch_version", "1.20.0")

        # Calculate headshot multiplier if both damage values are present
        bd = float(entry.get("base_damage", 0))
        hd = float(entry.get("headshot_damage", 0))
        if bd > 0 and hd > 0:
            entry["headshot_multiplier"] = round(hd / bd, 4)
        elif bd > 0:
            entry.setdefault("headshot_multiplier", 2.0)

        results.append(entry)

    return results

def enrich_fallback(data: list[dict]) -> list[dict]:
    """Add computed/universal fields to the fallback dataset."""
    enriched = []
    for w in data:
        entry = w.copy()
        entry["leg_multiplier"] = LEG_MULTIPLIER
        entry["shield_mitigation"] = SHIELD_MITIGATION

        # Verify headshot multiplier matches damage values
        if entry.get("base_damage") and entry.get("headshot_damage"):
            calculated = round(entry["headshot_damage"] / entry["base_damage"], 4)
            entry["headshot_multiplier"] = calculated

        enriched.append(entry)
    return enriched

# ── Output ────────────────────────────────────────────────────────────────────

def save_json(data: list[dict], path: str = "arc_raiders_weapons.json") -> None:
    output = {
        "meta": {
            "game": "Arc Raiders",
            "patch": "1.20.0",
            "last_verified": "2026-03-21",
            "sources": [
                "https://killmath.com/arc-raiders-ttk-calculator/weapon-rankings",
                "https://thearcraiders.com/weapons/",
            ],
            "notes": {
                "leg_multiplier": "Universal 0.75x on all weapons (25% damage reduction)",
                "headshot_multiplier": "Per-weapon, does NOT apply to shields — only to health",
                "shield_mechanics": (
                    "Shields take full bullet damage. Health takes reduced damage "
                    "(base_damage * (1 - shield_mitigation)) while shield is active."
                ),
                "upgrades": (
                    "Tier I-IV upgrades do NOT change base_damage. "
                    "They improve fire_rate, reload speed, and magazine size."
                ),
            },
        },
        "shield_mitigation": SHIELD_MITIGATION,
        "weapons": data,
    }

    with open(path, "w", encoding="utf-8") as f:
        json.dump(output, f, indent=2, ensure_ascii=False)

    log.info(f"Saved {len(data)} weapons to {path}")

def print_summary(data: list[dict]) -> None:
    print(f"\n{'='*70}")
    print(f"  Arc Raiders Weapon Stats — {len(data)} weapons")
    print(f"{'='*70}")
    header = f"{'Name':<14} {'Class':<16} {'Dmg':>5} {'HS Dmg':>7} {'HS Mult':>8} {'Leg':>5} {'TTK':>6}"
    print(header)
    print("-" * 70)
    for w in sorted(data, key=lambda x: x.get("ttk_light_shield") or 99):
        print(
            f"{w.get('name','?'):<14} "
            f"{w.get('weapon_class','?'):<16} "
            f"{w.get('base_damage', 0):>5.1f} "
            f"{w.get('headshot_damage', 0):>7.1f} "
            f"{w.get('headshot_multiplier', 0):>7.2f}x "
            f"{w.get('leg_multiplier', 0.75):>4.2f}x "
            f"{str(w.get('ttk_light_shield','?')):>6}s"
        )
    print(f"{'='*70}\n")

# ── Entry Point ───────────────────────────────────────────────────────────────

if __name__ == "__main__":
    import argparse

    parser = argparse.ArgumentParser(description="Arc Raiders weapon stats scraper")
    parser.add_argument(
        "--no-scrape",
        action="store_true",
        help="Skip live scraping; use hardcoded fallback data only",
    )
    parser.add_argument(
        "--output",
        default="arc_raiders_weapons.json",
        help="Output JSON file path (default: arc_raiders_weapons.json)",
    )
    args = parser.parse_args()

    weapons = build_dataset(use_scraper=not args.no_scrape)
    save_json(weapons, args.output)
    print_summary(weapons)
    print(f"Output saved to: {args.output}")
