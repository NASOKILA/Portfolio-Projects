namespace HTTPServer.GameStoreApplication.Models
{
    public class UserGame
    {
        public int CreatorId { get; set; }

        public int GameId { get; set; }

        public Game Game { get; set; }

        public User Creator { get; set; }
    }
}
