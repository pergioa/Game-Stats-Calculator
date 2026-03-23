namespace ArcDamageCalculator.Api.Models;

public record Gun(
    int Id,
    string Name,
    double Damage,
    double FireRate,
    double RelativeDps,
    double HeadshotMultiplier,
    double LimbMultiplier);