using ArcDamageCalculator.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace ArcDamageCalculator.Api.Data;

public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
    public DbSet<Gun> Guns { get; set; }
    public DbSet<Shield> Shields { get; set; }
    public DbSet<Grenade> Grenades { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Gun>().HasData(
            new Gun(1, "Kettle", 8.5, 30.0, 280.0, 2.5, 0.75),
            new Gun(2, "Rattler", 9.0, 33.3, 299.7, 2.0, 0.75),
            new Gun(3, "Arpeggio", 9.5, 18.3, 173.9, 2.0, 0.75),
            new Gun(4, "Tempest", 10.0, 36.7, 367.0, 1.5, 0.75),
            new Gun(5, "Bettina", 14.0, 32.0, 448.0, 2.0, 0.75),
            new Gun(6, "Ferro", 40.0, 6.6, 264.0, 2.5, 0.75),
            new Gun(7, "Renegade", 35.0, 21.0, 735.0, 2.25, 0.75),
            new Gun(8, "Aphelion", 25.0, 9.0, 216.0, 2.0, 0.75),
            new Gun(9, "Stitcher", 6.5, 45.3, 317.1, 1.75, 0.75),
            new Gun(10, "Bobcat", 6.0, 66.7, 400.0, 2.0, 0.75),
            new Gun(11, "Il Toro", 67.5, 14.0, 965.3, 1.5, 0.75),
            new Gun(12, "Vulcano", 49.5, 26.3, 1302.9, 1.0, 0.75),
            new Gun(13, "Hairpin", 20.0, 9.0, 180.0, 2.0, 0.75),
            new Gun(14, "Burletta", 10.0, 28.0, 280.0, 2.0, 0.75),
            new Gun(15, "Venator", 16.0, 36.7, 660.6, 2.0, 0.75),
            new Gun(16, "Anvil", 40.0, 16.3, 652.0, 2.5, 0.75),
            new Gun(17, "Torrente", 8.0, 58.3, 466.4, 2.0, 0.75),
            new Gun(18, "Osprey", 45.0, 17.7, 796.5, 2.0, 0.75),
            new Gun(19, "Jupiter", 60.0, 7.7, 423.5, 2.0, 0.75),
            new Gun(20, "Hullcracker", 100.0, 20.3, 2030.0, 1.0, 0.75),
            new Gun(21, "Equalizer", 8.0, 33.3, 266.4, 2.0, 0.75)
        );

        modelBuilder.Entity<Grenade>().HasData(
            new Grenade(1, GrenadeType.Frag, "Light Impact Grenade", 30.0, 2.5, 0.0, null),
            new Grenade(2, GrenadeType.Frag, "Heavy Fuze", 80.0, 7.5, 3.0, null),
            new Grenade(3, GrenadeType.Frag, "Snap Blast", 70.0, 7.5, 3.0, null),
            new Grenade(4, GrenadeType.Fire, "Blaze", 5.0, 10.0, null, 10.0),
            new Grenade(5, GrenadeType.Trigger, "Trigger 'Nade", 90.0, 7.5, 1.5, null)
        );

        modelBuilder.Entity<Shield>().HasData(
            new Shield(1, ShieldType.Light, 40.0, 0.4),
            new Shield(2, ShieldType.Medium, 70.0, 0.425),
            new Shield(3, ShieldType.Heavy, 80.0, 0.525)
        );
    }
}