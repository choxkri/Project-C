using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

public class VisconContext : DbContext
{
    protected override void OnConfiguring(DbContextOptionsBuilder builder)
    {
        builder.UseNpgsql("User ID=postgres;password=1234;Host=localhost;Port=5432;Database=ProjectC;Pooling=true;");
        builder.LogTo(Console.WriteLine, Microsoft.Extensions.Logging.LogLevel.Debug);
    }



    public DbSet<AccountCustomer> AccountCustomers { get; set; }
    public DbSet<AccountViscon> AccountViscon { get; set; }
    public DbSet<Department> Department { get; set; }
    public DbSet<CustCompany> CustCompany { get; set; }
    public DbSet<TypeAccount> TypeAccounts { get; set; }
    public DbSet<Machine> Machines { get; set; }
    public DbSet<Ticket> Tickets { get; set; }



}

