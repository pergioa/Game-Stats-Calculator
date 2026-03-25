using ArcDamageCalculator.Api.Data;
using ArcDamageCalculator.Api.Models;

namespace ArcDamageCalculator.Api.Repositories;

public class GrenadeRepository(AppDbContext context) : Repository<Grenade>(context), IGrenadeRepository { }
