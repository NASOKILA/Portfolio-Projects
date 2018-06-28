namespace HTTPServer
{
    using GameStoreApplication;
    using Server;
    using Server.Routing;

    class Launcher
    {
        static void Main(string[] args)
        {
            Run(args);
        }

        static void Run(string[] args)
        {
            var application = new GameStoreApp();

            var appRouteConfig = new AppRouteConfig();
         
            application.Configure(appRouteConfig);

            var server = new WebServer(8000, appRouteConfig);

            server.Run();
        }
    }
}
