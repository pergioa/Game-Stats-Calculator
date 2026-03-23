namespace ArcDamageCalculator.Api.Models;

public enum GrenadeType{Frag, Fire, Trigger }

public record Grenade(
    int Id,
    GrenadeType Type,
    string Name,
    double Damage,
    double Radius,
    double? Delay,
    double? Duration
    );