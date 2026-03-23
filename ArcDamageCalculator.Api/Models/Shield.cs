namespace ArcDamageCalculator.Api.Models;

public enum ShieldType
{
    Light,
    Medium,
    Heavy
}

public record Shield(
    int Id,
    ShieldType Name,
    double TotalCharge,
    double Mitigation);