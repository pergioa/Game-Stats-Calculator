using ArcDamageCalculator.Api.Models;

namespace ArcDamageCalculator.Api.Repositories;

public interface IShieldRepository
{
    public IEnumerable<Shield> GetAll();
}