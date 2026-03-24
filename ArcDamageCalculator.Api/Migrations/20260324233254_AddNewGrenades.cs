using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace ArcDamageCalculator.Api.Migrations
{
    /// <inheritdoc />
    public partial class AddNewGrenades : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Grenades",
                columns: new[] { "Id", "Damage", "Delay", "Duration", "Name", "Radius", "Type" },
                values: new object[,]
                {
                    { 6, 60.0, 3.0, null, "Shrapnel Grenade", 6.0, 0 },
                    { 7, 20.0, 1.5, null, "Trailblazer", 2.0, 2 }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Grenades",
                keyColumn: "Id",
                keyValue: 6);

            migrationBuilder.DeleteData(
                table: "Grenades",
                keyColumn: "Id",
                keyValue: 7);
        }
    }
}
