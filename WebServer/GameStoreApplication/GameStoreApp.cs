namespace HTTPServer.GameStoreApplication
{
    using Server.Contracts;
    using Server.Routing.Contracts;
    using Data;
    using Microsoft.EntityFrameworkCore;
    using Controllers;
    using Services;
    using Models;
    using System.Collections.Generic;

    public class GameStoreApp : IApplication
    {
        private readonly UserService userService;
        private readonly GameService gameService;

        private HashSet<Game> cart { get; set; }

        public GameStoreApp()
        {
            this.cart = new HashSet<Game>();
            this.userService = new UserService();
            this.gameService = new GameService();
        }
        
        public void Configure(IAppRouteConfig appRouteConfig)
        {
            ConfigureDatabase();
            ConfigureRoutes(appRouteConfig);
        }

        private void ConfigureDatabase()
        { 
            var context = new GameStoreContext();
            context.Database.Migrate();
        }
        
        private void ConfigureRoutes(IAppRouteConfig appRouteConfig)
        {
            
            appRouteConfig
               .Get(
                   "/register",
                   req => new AccountController(this.userService, this.cart).Register());
            
            appRouteConfig
                .Post(
                    "/register",
                    req => new AccountController(this.userService, this.cart).Register(req));
            
            appRouteConfig
                .Get(
                    "/login",
                    req => new AccountController(this.userService, this.cart).Login());
            
            appRouteConfig
                .Post(
                    "/login",
                    req => new AccountController(this.userService, this.cart).Login(req));
                    
            appRouteConfig
                .Get(
                    "/logout",
                    req => new AccountController(this.userService, this.cart).Logout(req));
            




            appRouteConfig
                .Get(
                    "/",
                    req => new HomeController().Index(req));

            appRouteConfig
                .Get(
                    "/cart",
                    req => new CartController(this.userService, this.gameService, this.cart)
                        .ShowCart(req));
            
            appRouteConfig
                .Post(
                    "/order",
                    req => new CartController(this.userService, this.gameService, this.cart).FinishOrder(req));

            appRouteConfig
                .Get(
                    "/buy/{(?<id>[0-9]+)}",
                    req => new CartController(this.userService, this.gameService, this.cart).StoreGameInCart(req));

            appRouteConfig
                .Get(
                    "/removeFromCart/{(?<id>[0-9]+)}",
                    req => new CartController(this.userService, this.gameService, this.cart).RemoveFromCart(req));

            



            appRouteConfig
                .Get(
                    "/games",
                    req => new GamesController().AllGames());
            
            appRouteConfig
                .Get(
                    "/add",
                    req => new GamesController().AddGame());


            appRouteConfig
                .Post(
                    "/add",
                    req => new GamesController().AddGame(req));


            appRouteConfig
                .Get(
                    "/delete/{(?<id>[0-9]+)}",
                    req => new GamesController().RemoveGame(req));

            appRouteConfig
                .Post(
                    "/delete/{(?<id>[0-9]+)}",
                    req => new GamesController().RemoveGamePost(req));


            appRouteConfig
                .Get(
                    "/edit/{(?<id>[0-9]+)}",
                    req => new GamesController().UpdateGame(req));


            appRouteConfig
                .Post(
                    "/edit/{(?<id>[0-9]+)}",
                    req => new GamesController().UpdateGamePost(req));
            

            appRouteConfig
                .Get(
                    "/details/{(?<id>[0-9]+)}",
                    req => new GamesController().GameDetails(req));

            

        }
    }
}
