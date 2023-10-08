using Entities.Concrete;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.SqlServer;//UseSqlServer hata verir yoksa
using Microsoft.SqlServer;

namespace DataAccess.Concrete
{
    public class DatabaseContext : DbContext
    {
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(connectionToLocalDb);
        }

        private const string connectionToLocalDb = @"
        Server=77.245.159.8;
        Database=tualdd_db;
        User ID=tualdd;
        Password=y2q4$u%WHa_yt93m;
        Trusted_Connection=false;
        TrustServerCertificate=True
        ";

        public DbSet<Stage> Stages { get; set; }
        public DbSet<Customer> Customers { get; set; }
    }
}