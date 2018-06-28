namespace HTTPServer.GameStoreApplication.Services.Contracts
{
    using Models;
    using System.Collections.Generic;

    public interface IGameService
    {
        bool ExistsByTitle(string title);

        Game FindGameById(int id);

        List<Game> GetAllGames();

        void AddGameToDb(Game game);

        void RemoveGameFromDb(Game game);

        void UpdateGame(Game game);

        void AddUserGameToDb(UserGame usergame);
    }
}
