using ArcDamageCalculator.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace ArcDamageCalculator.Api.Data;

public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{

    public DbSet<Gun> Guns { get; set; }
    public DbSet<Shield> Shields { get; set; }
    public DbSet<Grenade> Grenades { get; set; }
}