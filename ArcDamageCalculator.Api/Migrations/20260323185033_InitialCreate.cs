using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

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
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Type = table.Column<int>(type: "INTEGER", nullable: false),
                    Name = table.Column<string>(type: "TEXT", nullable: false),
                    Damage = table.Column<double>(type: "REAL", nullable: false),
                    Radius = table.Column<double>(type: "REAL", nullable: false),
                    Delay = table.Column<double>(type: "REAL", nullable: true),
                    Duration = table.Column<double>(type: "REAL", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Grenades", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Guns",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(type: "TEXT", nullable: false),
                    Damage = table.Column<double>(type: "REAL", nullable: false),
                    FireRate = table.Column<double>(type: "REAL", nullable: false),
                    RelativeDps = table.Column<double>(type: "REAL", nullable: false),
                    HeadshotMultiplier = table.Column<double>(type: "REAL", nullable: false),
                    LimbMultiplier = table.Column<double>(type: "REAL", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Guns", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Shields",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<int>(type: "INTEGER", nullable: false),
                    TotalCharge = table.Column<double>(type: "REAL", nullable: false),
                    Mitigation = table.Column<double>(type: "REAL", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Shields", x => x.Id);
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
