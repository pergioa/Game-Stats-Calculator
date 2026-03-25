using ArcDamageCalculator.Api.Data;
using ArcDamageCalculator.Api.Models;

namespace ArcDamageCalculator.Api.Repositories;

public class ShieldRepository(AppDbContext context) : Repository<Shield>(context), IShieldRepository { }
