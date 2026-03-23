using ArcDamageCalculator.Api.Models;

namespace ArcDamageCalculator.Api.Dtos;

public record GunDto(
    string Name,
    double Damage,
    double FireRate,
    double RelativeDps,
    double HeadshotMultiplier,
    double LimbMultiplier)
{
    public static GunDto FromGun(Gun gun)=> new GunDto( gun.Name, gun.Damage, gun.FireRate, gun.RelativeDps, gun.HeadshotMultiplier, gun.LimbMultiplier);
}