using ArcDamageCalculator.Api.Models;

namespace ArcDamageCalculator.Api.Dtos;

public record ShieldDto(
    ShieldType Name,
    double TotalCharge,
    double Mitigation)
{
    public static ShieldDto FormShield(Shield shield) => new ShieldDto(shield.Name, shield.TotalCharge, shield.Mitigation);
}