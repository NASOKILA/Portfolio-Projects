namespace HTTPServer.GameStoreApplication.Models
{
    using System;
    using System.Collections.Generic;
    
    public class Order
    {
        public Order()
        {
            this.Products = new HashSet<UserGame>();
        }

        public int Id { get; set; }

        public int UserId { get; set; }

        public DateTime DateOfCreation { get; set; }

        public ICollection<UserGame> Products { get; set; }
    }
}
