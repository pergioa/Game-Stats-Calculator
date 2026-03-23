using ArcDamageCalculator.Api.Models;

namespace ArcDamageCalculator.Api.Dtos;

public record GrenadeDto(
    GrenadeType Type,
    string Name,
    double Damage,
    double Radius,
    double? Delay,
    double? Duration
)
{
    public static GrenadeDto FormGrenade(Grenade grenade) => new GrenadeDto(grenade.Type, grenade.Name, grenade.Damage, grenade.Radius, grenade?.Delay, grenade?.Duration);
}