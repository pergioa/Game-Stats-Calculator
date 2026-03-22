import { Gun } from "../models/gun.model";

export const GUNS: Gun[] = [
  // Assault Rifles
  { name: 'Kettle',       damage: 8.5,  fireRate: 30,   relativeDps: 280 },
  { name: 'Rattler',      damage: 9,    fireRate: 33.3, relativeDps: 299.7 },
  { name: 'Arpeggio',     damage: 9.5,  fireRate: 18.3, relativeDps: 173.9 },
  { name: 'Tempest',      damage: 10,   fireRate: 36.7, relativeDps: 367 },
  { name: 'Bettina',      damage: 14,   fireRate: 32,   relativeDps: 448 },

  // Battle Rifles
  { name: 'Ferro',        damage: 40,   fireRate: 6.6,  relativeDps: 264 },
  { name: 'Renegade',     damage: 35,   fireRate: 21,   relativeDps: 735 },
  { name: 'Aphelion',     damage: 25,   fireRate: 9,    relativeDps: 216 },

  // SMGs
  { name: 'Stitcher',     damage: 6.5,  fireRate: 45.3, relativeDps: 317.1 },
  { name: 'Bobcat',       damage: 6,    fireRate: 66.7, relativeDps: 400 },

  // Shotguns
  { name: 'Il Toro',      damage: 67.5, fireRate: 14,   relativeDps: 965.3 },
  { name: 'Vulcano',      damage: 49.5, fireRate: 26.3, relativeDps: 1302.9 },

  // Pistols
  { name: 'Hairpin',      damage: 20,   fireRate: 9,    relativeDps: 180 },
  { name: 'Burletta',     damage: 10,   fireRate: 28,   relativeDps: 280 },
  { name: 'Venator',      damage: 16,   fireRate: 36.7, relativeDps: 660.6 },

  // Hand Cannons
  { name: 'Anvil',        damage: 40,   fireRate: 16.3, relativeDps: 652 },

  // LMGs
  { name: 'Torrente',     damage: 8,    fireRate: 58.3, relativeDps: 466.4 },

  // Sniper Rifles
  { name: 'Osprey',       damage: 45,   fireRate: 17.7, relativeDps: 796.5 },
  { name: 'Jupiter',      damage: 60,   fireRate: 7.7,  relativeDps: 423.5 },

  // Specials
  { name: 'Hullcracker',  damage: 100,  fireRate: 20.3, relativeDps: 2030 },
  { name: 'Equalizer',    damage: 8,    fireRate: 33.3, relativeDps: 266.4 },
];