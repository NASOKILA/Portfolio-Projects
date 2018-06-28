namespace HTTPServer.GameStoreApplication.Data
{
    using Models;
    using Microsoft.EntityFrameworkCore;
    
    public class GameStoreContext : DbContext
    {
        
        public DbSet<User> Users { get; set; }

        public DbSet<Game> Games { get; set; }

        public DbSet<UserGame> UsersGames { get; set; }
        

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            const string connectionString = Connection.ConnectionString;
            
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer(connectionString);
            }

            base.OnConfiguring(optionsBuilder);
        }
        
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            modelBuilder.Entity<User>()
                .HasIndex(u => u.Email)
                .IsUnique(true);

            modelBuilder.Entity<User>()
                .HasMany(u => u.Games)
                .WithOne(g => g.Creator);

            modelBuilder.Entity<UserGame>()
             .HasKey(key => new { key.CreatorId, key.GameId});
            
            
            base.OnModelCreating(modelBuilder);
        }

    }
}
