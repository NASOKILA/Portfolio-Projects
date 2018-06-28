namespace HTTPServer.Server.Handlers
{
    using Common;
    using Contracts;
    using Http.Contracts;
    using Http.Response;
    using Routing.Contracts;
    using Server.Http;
    using System;
    using System.Linq;
    using System.Text.RegularExpressions;

    public class HttpHandler : IRequestHandler
    {
        private readonly IServerRouteConfig serverRouteConfig;

        public HttpHandler(IServerRouteConfig routeConfig)
        {
            CoreValidator.ThrowIfNull(routeConfig, nameof(routeConfig));

            this.serverRouteConfig = routeConfig;
        }

        public IHttpResponse Handle(IHttpContext context)
        {
            const string registerPath = "/register";
            const string loginPath = "/login";
            const string homePath = "/";

            const string detailsStartingPath = "/details/";
            const string removeFromCartStartingPath = "/removeFromCart/";
            const string buyingStartingPath = "/buy/";
            const string cartStartingPath = "/cart";
            const string orderStartingPath = "/order";

            try
            {


                // Check if user is authenticated
                //AKO SME ANONIMNI USERI TRQBVA DA MOJEM DA VIJDAME SAMO Login i Register stranicite inache da ni redirektva kum Login

                bool deferentPath =
                           !context.Request.Path.StartsWith(detailsStartingPath) 
                        && !context.Request.Path.StartsWith(removeFromCartStartingPath)
                        && !context.Request.Path.StartsWith(buyingStartingPath)
                        && !context.Request.Path.StartsWith(cartStartingPath)
                        && !context.Request.Path.StartsWith(orderStartingPath)
                        && context.Request.Path != loginPath
                        && context.Request.Path != registerPath 
                        && context.Request.Path != homePath;

                bool nonExistentSession = context.Request.Session == null || !context.Request.Session.Contains(SessionStore.CurrentUserKey);

               

                if (deferentPath && nonExistentSession)
                {
                    return new RedirectResponse(homePath);
                }

                var requestMethod = context.Request.Method;
                var requestPath = context.Request.Path;
                var registeredRoutes = this.serverRouteConfig.Routes[requestMethod];

                foreach (var registeredRoute in registeredRoutes)
                {
                    var routePattern = registeredRoute.Key;
                    var routingContext = registeredRoute.Value;

                    var routeRegex = new Regex(routePattern);
                    var match = routeRegex.Match(requestPath);

                    if (!match.Success)
                    {
                        continue;
                    }

                    var parameters = routingContext.Parameters;

                    foreach (var parameter in parameters)
                    {
                        var parameterValue = match.Groups[parameter].Value;
                        context.Request.AddUrlParameter(parameter, parameterValue);
                    }

                    return routingContext.Handler.Handle(context);
                }
            }
            catch (Exception ex)
            {
                return new InternalServerErrorResponse(ex);
            }

            return new NotFoundResponse();
        }
    }
}
