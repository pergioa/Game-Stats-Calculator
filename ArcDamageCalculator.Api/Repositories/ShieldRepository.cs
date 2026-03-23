using ArcDamageCalculator.Api.Data;
using ArcDamageCalculator.Api.Models;

namespace ArcDamageCalculator.Api.Repositories;

public class ShieldRepository(AppDbContext context) : IShieldRepository
{
    private readonly AppDbContext _context = context;
    public IEnumerable<Shield> GetAll()
    {
        return _context.Shields.ToList();
    }
}