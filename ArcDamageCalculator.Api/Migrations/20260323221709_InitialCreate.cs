using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace ArcDamageCalculator.Api.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Grenades",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Type = table.Column<int>(type: "integer", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Damage = table.Column<double>(type: "double precision", nullable: false),
                    Radius = table.Column<double>(type: "double precision", nullable: false),
                    Delay = table.Column<double>(type: "double precision", nullable: true),
                    Duration = table.Column<double>(type: "double precision", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Grenades", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Guns",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Damage = table.Column<double>(type: "double precision", nullable: false),
                    FireRate = table.Column<double>(type: "double precision", nullable: false),
                    RelativeDps = table.Column<double>(type: "double precision", nullable: false),
                    HeadshotMultiplier = table.Column<double>(type: "double precision", nullable: false),
                    LimbMultiplier = table.Column<double>(type: "double precision", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Guns", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Shields",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<int>(type: "integer", nullable: false),
                    TotalCharge = table.Column<double>(type: "double precision", nullable: false),
                    Mitigation = table.Column<double>(type: "double precision", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Shields", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "Grenades",
                columns: new[] { "Id", "Damage", "Delay", "Duration", "Name", "Radius", "Type" },
                values: new object[,]
                {
                    { 1, 30.0, 0.0, null, "Light Impact Grenade", 2.5, 0 },
                    { 2, 80.0, 3.0, null, "Heavy Fuze", 7.5, 0 },
                    { 3, 70.0, 3.0, null, "Snap Blast", 7.5, 0 },
                    { 4, 5.0, null, 10.0, "Blaze", 10.0, 1 },
                    { 5, 90.0, 1.5, null, "Trigger 'Nade", 7.5, 2 }
                });

            migrationBuilder.InsertData(
                table: "Guns",
                columns: new[] { "Id", "Damage", "FireRate", "HeadshotMultiplier", "LimbMultiplier", "Name", "RelativeDps" },
                values: new object[,]
                {
                    { 1, 8.5, 30.0, 2.5, 0.75, "Kettle", 280.0 },
                    { 2, 9.0, 33.299999999999997, 2.0, 0.75, "Rattler", 299.69999999999999 },
                    { 3, 9.5, 18.300000000000001, 2.0, 0.75, "Arpeggio", 173.90000000000001 },
                    { 4, 10.0, 36.700000000000003, 1.5, 0.75, "Tempest", 367.0 },
                    { 5, 14.0, 32.0, 2.0, 0.75, "Bettina", 448.0 },
                    { 6, 40.0, 6.5999999999999996, 2.5, 0.75, "Ferro", 264.0 },
                    { 7, 35.0, 21.0, 2.25, 0.75, "Renegade", 735.0 },
                    { 8, 25.0, 9.0, 2.0, 0.75, "Aphelion", 216.0 },
                    { 9, 6.5, 45.299999999999997, 1.75, 0.75, "Stitcher", 317.10000000000002 },
                    { 10, 6.0, 66.700000000000003, 2.0, 0.75, "Bobcat", 400.0 },
                    { 11, 67.5, 14.0, 1.5, 0.75, "Il Toro", 965.29999999999995 },
                    { 12, 49.5, 26.300000000000001, 1.0, 0.75, "Vulcano", 1302.9000000000001 },
                    { 13, 20.0, 9.0, 2.0, 0.75, "Hairpin", 180.0 },
                    { 14, 10.0, 28.0, 2.0, 0.75, "Burletta", 280.0 },
                    { 15, 16.0, 36.700000000000003, 2.0, 0.75, "Venator", 660.60000000000002 },
                    { 16, 40.0, 16.300000000000001, 2.5, 0.75, "Anvil", 652.0 },
                    { 17, 8.0, 58.299999999999997, 2.0, 0.75, "Torrente", 466.39999999999998 },
                    { 18, 45.0, 17.699999999999999, 2.0, 0.75, "Osprey", 796.5 },
                    { 19, 60.0, 7.7000000000000002, 2.0, 0.75, "Jupiter", 423.5 },
                    { 20, 100.0, 20.300000000000001, 1.0, 0.75, "Hullcracker", 2030.0 },
                    { 21, 8.0, 33.299999999999997, 2.0, 0.75, "Equalizer", 266.39999999999998 }
                });

            migrationBuilder.InsertData(
                table: "Shields",
                columns: new[] { "Id", "Mitigation", "Name", "TotalCharge" },
                values: new object[,]
                {
                    { 1, 0.40000000000000002, 0, 40.0 },
                    { 2, 0.42499999999999999, 1, 70.0 },
                    { 3, 0.52500000000000002, 2, 80.0 }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Grenades");

            migrationBuilder.DropTable(
                name: "Guns");

            migrationBuilder.DropTable(
                name: "Shields");
        }
    }
}
