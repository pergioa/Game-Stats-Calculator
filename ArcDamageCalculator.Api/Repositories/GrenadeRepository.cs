using ArcDamageCalculator.Api.Data;
using ArcDamageCalculator.Api.Models;

namespace ArcDamageCalculator.Api.Repositories;

public class GrenadeRepository(AppDbContext context) : IGrenadeRepository
{
    private readonly AppDbContext _context = context;
    public IEnumerable<Grenade> GetAll()
    {
        return _context.Grenades.ToList();
    }
}