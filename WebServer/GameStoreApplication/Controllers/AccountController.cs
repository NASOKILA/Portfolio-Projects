namespace HTTPServer.GameStoreApplication.Controllers
{
    using Models;
    using Infrastructure;
    using Server.Utilities;
    using Server.Http.Contracts;
    using Server.Http.Response;
    using Services;
    using Services.Contracts;
    using System.Collections.Generic;

    public class AccountController : Controller
    {

        private readonly IUserService userService;
        private HashSet<Game> cart;
        

        public AccountController(UserService userService, HashSet<Game> cart)
        {
            this.userService = userService;
            this.cart = cart;
        }

        public IHttpResponse Register()
        {

            return this.FileViewResponse(@"account\register");
        }

        public IHttpResponse Register(IHttpRequest req)
        {
            const string formEmailKey = "email";
            const string formFullnameKey = "fullname";
            const string formPasswordKey = "password";
            const string formConfirmPasswordKey = "confirmpassword";


            if (!req.FormData.ContainsKey(formEmailKey)
                || !req.FormData.ContainsKey(formFullnameKey)
                || !req.FormData.ContainsKey(formPasswordKey)
                || !req.FormData.ContainsKey(formConfirmPasswordKey))
            {
                return this.FileViewResponse(@"account\register-errors");
            }

            var email = req.FormData[formEmailKey];
            var fullname = req.FormData[formFullnameKey];
            var password = req.FormData[formPasswordKey];
            var confirmpassword = req.FormData[formConfirmPasswordKey];

            if (string.IsNullOrWhiteSpace(email)
                || string.IsNullOrWhiteSpace(fullname)
                || string.IsNullOrWhiteSpace(password)
                || string.IsNullOrWhiteSpace(confirmpassword))
            {
                return this.FileViewResponse(@"account\register-errors");
            }

            if ((!email.Contains("@") || !email.Contains(".")) || fullname.Length < 3)
            {
                return this.FileViewResponse(@"account\register-errors");
            }

            if (password.Length < 6)
            {
                return this.FileViewResponse(@"account\register-errors");
            }


            if (password != confirmpassword)
            {
                return this.FileViewResponse(@"account\register-errors");
            }

            
            if (userService.ExistsByEmail(email))
            {
                return this.FileViewResponse(@"account\register-errors");
            }

            User user = new User()
            {
                Email = email,
                FullName = fullname,
                Password = PasswordUtilities.GenerateHash256(password),
            };

            userService.RegisterUser(user);
            
            return new RedirectResponse("/login");
        }

        public IHttpResponse Login()
        {
            return this.FileViewResponse(@"account\login");
        }

        public IHttpResponse Login(IHttpRequest req)
        {
            const string formEmailKey = "email";
            const string formPasswordKey = "password";

            if (!req.FormData.ContainsKey(formEmailKey)
                || !req.FormData.ContainsKey(formPasswordKey))
            {
                return this.FileViewResponse(@"Account\login");
            }

            var email = req.FormData[formEmailKey];
            var password = req.FormData[formPasswordKey];

            if (string.IsNullOrWhiteSpace(email)
                || string.IsNullOrWhiteSpace(password))
            {
                return this.FileViewResponse(@"Account\login");
            }


            User user = userService.FindUser(email, password);

            if (user == null)
            {
                return this.FileViewResponse(@"Account\login");
            }

            return userService.LoginUser(user, req);

        }

        public IHttpResponse Logout(IHttpRequest req)
        {
            req.Session.Clear();
            cart.Clear();

            return new RedirectResponse("/login");
        }
        
    }
}
