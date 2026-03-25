using ArcDamageCalculator.Api.Data;
using ArcDamageCalculator.Api.Models;

namespace ArcDamageCalculator.Api.Repositories;

public class GunRepository(AppDbContext context) : Repository<Gun>(context), IGunRepository { }
