using Microsoft.EntityFrameworkCore.Migrations;

namespace HTTPServer.Migrations.GameStore
{
    public partial class InitialRefactored2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserGame_Users_CreatorId",
                table: "UserGame");

            migrationBuilder.DropForeignKey(
                name: "FK_UserGame_Games_GameId",
                table: "UserGame");

            migrationBuilder.DropPrimaryKey(
                name: "PK_UserGame",
                table: "UserGame");

            migrationBuilder.RenameTable(
                name: "UserGame",
                newName: "UsersGames");

            migrationBuilder.RenameIndex(
                name: "IX_UserGame_GameId",
                table: "UsersGames",
                newName: "IX_UsersGames_GameId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_UsersGames",
                table: "UsersGames",
                columns: new[] { "CreatorId", "GameId" });

            migrationBuilder.AddForeignKey(
                name: "FK_UsersGames_Users_CreatorId",
                table: "UsersGames",
                column: "CreatorId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_UsersGames_Games_GameId",
                table: "UsersGames",
                column: "GameId",
                principalTable: "Games",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UsersGames_Users_CreatorId",
                table: "UsersGames");

            migrationBuilder.DropForeignKey(
                name: "FK_UsersGames_Games_GameId",
                table: "UsersGames");

            migrationBuilder.DropPrimaryKey(
                name: "PK_UsersGames",
                table: "UsersGames");

            migrationBuilder.RenameTable(
                name: "UsersGames",
                newName: "UserGame");

            migrationBuilder.RenameIndex(
                name: "IX_UsersGames_GameId",
                table: "UserGame",
                newName: "IX_UserGame_GameId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_UserGame",
                table: "UserGame",
                columns: new[] { "CreatorId", "GameId" });

            migrationBuilder.AddForeignKey(
                name: "FK_UserGame_Users_CreatorId",
                table: "UserGame",
                column: "CreatorId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_UserGame_Games_GameId",
                table: "UserGame",
                column: "GameId",
                principalTable: "Games",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
