using ArcDamageCalculator.Api.Data;
using ArcDamageCalculator.Api.Models;

namespace ArcDamageCalculator.Api.Repositories;

public class GunRepository(AppDbContext context) : IGunRepository
{
    private readonly AppDbContext _context = context;
    public IEnumerable<Gun> GetAll()
    {
        return _context.Guns.ToList();
    }
}