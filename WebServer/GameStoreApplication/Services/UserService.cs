namespace HTTPServer.GameStoreApplication.Services
{
    using Data;
    using Contracts;
    using Models;
    using Server.Http.Contracts;
    using Server.Http;
    using Server.Http.Response;
    using Server.Utilities;
    using System.Linq;
    using System.Collections.Generic;

    public class UserService : IUserService
    {

        private GameStoreContext context { get; set; }

        public UserService()
        {
            this.context = new GameStoreContext();
        }

        public bool ExistsByEmail(string email)
        {
            return this.context.Users.Any(u => u.Email == email);
        }

        public void RegisterUser(User user)
        {
            this.context.Users.Add(user);
            this.context.SaveChanges();
        }

        public IHttpResponse LoginUser(User user, IHttpRequest req)
        {
            req.Session.Add(SessionStore.CurrentUserKey, user.Id);
            req.Session.Add(ShoppingCart.SessionKey, new ShoppingCart());

            return new RedirectResponse("/");
        }

        public User FindUser(string email, string password)
        {
            User user = this.context.Users
                .FirstOrDefault(u => u.Email == email && u.Password == PasswordUtilities.GenerateHash256(password));

            return user;
        }

        public List<User> GetAllUsers()
        {
            return this.context.Users.ToList();
        }

        public User GetUserById(int id)
        {
            return this.context.Users.Find(id);
        }



        public User GetCurrentUser(IHttpRequest req)
        {
            int currentUserId = req.Session.Get<int>(SessionStore.CurrentUserKey);
            User currentUser = this.GetUserById(currentUserId);
            return currentUser;
        }


        public bool UserGameNotAvaliable(int creatorId, int gameId)
        {
            return this.context.UsersGames.Any(ug => ug.CreatorId == creatorId && ug.GameId == gameId);
        }

        

        public bool CheckIfLogedIn(IHttpRequest req)
        {
            try
            {
                int currentUserId = req.Session.Get<int>(SessionStore.CurrentUserKey);
                return true;
            }
            catch {
                return false;
            }
        }
    }
}
