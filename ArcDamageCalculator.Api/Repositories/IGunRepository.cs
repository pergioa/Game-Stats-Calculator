using ArcDamageCalculator.Api.Models;

namespace ArcDamageCalculator.Api.Repositories;

public interface IGunRepository
{
    IEnumerable<Gun> GetAll();
}

