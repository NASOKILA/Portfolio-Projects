namespace HTTPServer.GameStoreApplication.Models
{
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;

    public class User
    {

        public User()
        {
            this.Games = new List<UserGame>();
            this.IsAdmin = false;
        }

        public int Id { get; set; }

        [Required]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }

        [Required]
        public string FullName { get; set; }
        
        public ICollection<UserGame> Games { get; set; }

        public bool IsAdmin { get; set; }
    }
}
