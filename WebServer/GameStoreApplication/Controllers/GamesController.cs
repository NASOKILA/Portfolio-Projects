namespace HTTPServer.GameStoreApplication.Controllers
{
    using Models;
    using Infrastructure;
    using Server.Http.Contracts;
    using System.Collections.Generic;
    using System;
    using Server.Http;
    using Server.Http.Response;
    using Services.Contracts;
    using Services;

    public class GamesController : Controller
    {
        private readonly IGameService gameService;
        private readonly IUserService userService;

        public GamesController()
        {
            this.gameService = new GameService();
            this.userService = new UserService();
        }
        
        public IHttpResponse AllGames()
        {

            string result = "";
            
            List<Game> allGames = this.gameService.GetAllGames();

            for (int i = 0; i < allGames.Count; i++)
            {

                Game game = allGames[i];

                int count = i + 1;

                result += $@"
                            <tr class=""table-warning"">
                                <th scope=""row"">{count}</th>
                                <td>{game.Title}</td>
                                <td>{game.Size}GB</td>
                                <td>{game.Price.ToString("F1")} &euro;</td>
                                <td>
                                    <a href=""/edit/{game.Id}"" class=""btn btn-warning btn-sm"">Edit</a>
                                    <a href=""/delete/{game.Id}"" class=""btn btn-danger btn-sm"">Delete</a>
                                </td>
                            </tr>";

            }

            this.ViewData["allGamesInDb"] = result;

            return this.FileViewResponse(@"Game\admin-games");
        }

        public IHttpResponse AddGame()
        {
            return this.FileViewResponse(@"Game\add-game");
        }

        public IHttpResponse AddGame(IHttpRequest req)
        {
            const string formTitleKey = "title";
            const string formDescriptionKey = "description";
            const string formImageKey = "imageThumbnail";
            const string formSizeKey = "size";
            const string formPriceKey = "price";
            const string formVideoUrlKey = "videoUrl";
            const string formReleaseDateKey = "releaseDate";

            if (!req.FormData.ContainsKey(formTitleKey)
                || !req.FormData.ContainsKey(formDescriptionKey)
                || !req.FormData.ContainsKey(formImageKey)
                || !req.FormData.ContainsKey(formPriceKey)
                || !req.FormData.ContainsKey(formSizeKey)
                || !req.FormData.ContainsKey(formVideoUrlKey)
                || !req.FormData.ContainsKey(formReleaseDateKey))
            {
                return this.FileViewResponse(@"Game\add-game");
            }

            var title = req.FormData[formTitleKey];
            var description = req.FormData[formDescriptionKey];
            var imageUrl = req.FormData[formImageKey];
            decimal price = decimal.Parse(req.FormData[formPriceKey]);
            decimal size = decimal.Parse(req.FormData[formSizeKey]);
            var videoUrl = req.FormData[formVideoUrlKey];
            DateTime releaseDate = Convert.ToDateTime(req.FormData[formReleaseDateKey].ToString());

            if (string.IsNullOrWhiteSpace(title)
                || string.IsNullOrWhiteSpace(description)
                || string.IsNullOrWhiteSpace(imageUrl)
                || string.IsNullOrWhiteSpace(price.ToString())
                || string.IsNullOrWhiteSpace(size.ToString())
                || string.IsNullOrWhiteSpace(videoUrl)
                || string.IsNullOrWhiteSpace(req.FormData[formReleaseDateKey].ToString()))
            {
                return this.FileViewResponse(@"Game\add-game");
            }
            
            if (Char.IsUpper(title[0]) && title.Length > 3 && title.Length > 100)
            {

                return this.FileViewResponse(@"Game\add-game");
            }
            
            if (price < 0)
            {
                return this.FileViewResponse(@"Game\add-game");
            }

            if (size < 0)
            {
                return this.FileViewResponse(@"Game\add-game");
            }

            if (videoUrl.Length != 11)
            {
                return this.FileViewResponse(@"Game\add-game");
            }

            if (!imageUrl.StartsWith("https://") && !imageUrl.StartsWith("http://"))
            {
                return this.FileViewResponse(@"Game\add-game");
            }

            if (description.Length < 20)
            {
                return this.FileViewResponse(@"Game\add-game");
            }
            
            int currentUserId = req.Session.Get<int>(SessionStore.CurrentUserKey);

            User currentUser = userService.GetUserById(currentUserId);
            
            Game game = new Game()
            {
                Description = description,
                ImageThumbnail = imageUrl,
                Price = price,
                ReleaseDate = releaseDate,
                Size = size,
                Title = title,
                Trailer = videoUrl,
                CreatorId = currentUserId,
            };

            gameService.AddGameToDb(game);
            
            return new RedirectResponse("/games");
        }

        public IHttpResponse RemoveGame(IHttpRequest req) {

            int id = int.Parse(req.UrlParameters["id"]);

            Game game = gameService.FindGameById(id);

            this.ViewData["title"] = game.Title;
            this.ViewData["description"] = game.Description;
            this.ViewData["imageUrl"] = game.ImageThumbnail;
            this.ViewData["price"] = game.Price.ToString("F2");
            this.ViewData["size"] = game.Size.ToString("F1");
            this.ViewData["videoUrl"] = game.Trailer;
            this.ViewData["dateOfRegistration"] = game.ReleaseDate.ToString("yyyy-MM-dd");
            
            return this.FileViewResponse(@"Game\delete-game");
        }
        
        public IHttpResponse RemoveGamePost(IHttpRequest req)
        {   
            int id = int.Parse(req.UrlParameters["id"]);

            Game game = gameService.FindGameById(id);

            gameService.RemoveGameFromDb(game);

            return new RedirectResponse("/");
        }

        public IHttpResponse UpdateGame(IHttpRequest req)
        {
            int id = int.Parse(req.UrlParameters["id"]);

            Game game = gameService.FindGameById(id);

            this.ViewData["title"] = game.Title;
            this.ViewData["description"] = game.Description;
            this.ViewData["imageUrl"] = game.ImageThumbnail;
            this.ViewData["price"] = game.Price.ToString("F2");
            this.ViewData["size"] = game.Size.ToString("F1");
            this.ViewData["videoUrl"] = game.Trailer;
            this.ViewData["date"] = game.ReleaseDate.ToString("yyyy-MM-dd");
            
            return this.FileViewResponse(@"Game\edit-game");
        }
        
        public IHttpResponse UpdateGamePost(IHttpRequest req)
        {
            const string formTitleKey = "title";
            const string formDescriptionKey = "description";
            const string formImageKey = "imageThumbnail";
            const string formSizeKey = "size";
            const string formPriceKey = "price";
            const string formVideoUrlKey = "trailer";
            const string formReleaseDateKey = "releaseDate";
            
            if (!req.FormData.ContainsKey(formTitleKey)
                || !req.FormData.ContainsKey(formDescriptionKey)
                || !req.FormData.ContainsKey(formImageKey)
                || !req.FormData.ContainsKey(formPriceKey)
                || !req.FormData.ContainsKey(formSizeKey)
                || !req.FormData.ContainsKey(formVideoUrlKey)
                || !req.FormData.ContainsKey(formReleaseDateKey))
            {
                return this.FileViewResponse(@"Game\edit-game");
            }

            var title = req.FormData[formTitleKey];
            var description = req.FormData[formDescriptionKey];
            var imageUrl = req.FormData[formImageKey];
            decimal price = decimal.Parse(req.FormData[formPriceKey]);
            decimal size = decimal.Parse(req.FormData[formSizeKey]);
            var videoUrl = req.FormData[formVideoUrlKey];
            DateTime releaseDate = Convert.ToDateTime(req.FormData[formReleaseDateKey].ToString());

            if (string.IsNullOrWhiteSpace(title)
                || string.IsNullOrWhiteSpace(description)
                || string.IsNullOrWhiteSpace(imageUrl)
                || string.IsNullOrWhiteSpace(price.ToString())
                || string.IsNullOrWhiteSpace(size.ToString())
                || string.IsNullOrWhiteSpace(videoUrl)
                || string.IsNullOrWhiteSpace(req.FormData[formReleaseDateKey].ToString()))
            {
                return this.FileViewResponse(@"Game\edit-game");
            }
            
            if (Char.IsUpper(title[0]) && title.Length > 3 && title.Length > 100)
            {

                return this.FileViewResponse(@"Game\add-game");
            }

            if (price < 0)
            {
                return this.FileViewResponse(@"Game\edit-game");
            }

            if (size < 0)
            {
                return this.FileViewResponse(@"Game\edit-game");
            }

            if (videoUrl.Length != 11)
            {
                return this.FileViewResponse(@"Game\edit-game");
            }

            if (!imageUrl.StartsWith("https://") && !imageUrl.StartsWith("http://"))
            {
                return this.FileViewResponse(@"Game\edit-game");
            }

            if (description.Length < 20)
            {
                return this.FileViewResponse(@"Game\edit-game");
            }
            
            int id = int.Parse(req.UrlParameters["id"]);
            Game oldGame = gameService.FindGameById(id);
            
            int currentUserId = req.Session.Get<int>(SessionStore.CurrentUserKey);
            User currentUser = userService.GetUserById(currentUserId);
            
            oldGame.Description = description;
            oldGame.ImageThumbnail = imageUrl;
            oldGame.Price = price;
            oldGame.ReleaseDate = releaseDate;
            oldGame.Size = size;
            oldGame.Title = title;
            oldGame.Trailer = videoUrl;
            
            gameService.UpdateGame(oldGame);

            return new RedirectResponse("/");
        }

        public IHttpResponse GameDetails(IHttpRequest req)
        {
            int id = int.Parse(req.UrlParameters["id"]);

            Game game = gameService.FindGameById(id);

            User gameCreator = userService.GetUserById(game.CreatorId);

            this.ViewData["id"] = game.Id.ToString();
            this.ViewData["title"] = game.Title;
            this.ViewData["description"] = game.Description;
            this.ViewData["imageUrl"] = game.ImageThumbnail;
            this.ViewData["price"] = game.Price.ToString("F2");
            this.ViewData["size"] = game.Size.ToString("F1");
            this.ViewData["videoUrl"] = game.Trailer;
            this.ViewData["date"] = game.ReleaseDate.ToString("yyyy / MM / dd");
            this.ViewData["creator"] = gameCreator.FullName;
            
            int currentUserId = 0;

            try
            {
                currentUserId = req.Session.Get<int>(SessionStore.CurrentUserKey);

                User user = userService.GetUserById(currentUserId);

                if (user.IsAdmin)
                {
                    return this.FileViewResponse(@"Game\game-details-admin");
                }
            }
            catch (Exception)
            {
                return this.FileViewResponse(@"Game\game-details-anonimous");
            }
            
            return this.FileViewResponse(@"Game\game-details");
        }    
    }
}
