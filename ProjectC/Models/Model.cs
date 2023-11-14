using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.RegularExpressions;

public class VisconContext : DbContext
{
    protected override void OnConfiguring(DbContextOptionsBuilder builder)
    {
        builder.UseNpgsql("User ID=postgres;password=1234;Host=localhost;Port=5432;Database=ProjectC;Pooling=true;Include Error Detail=true;");
        builder.LogTo(Console.WriteLine, Microsoft.Extensions.Logging.LogLevel.Debug);
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Ticket>()
                    .HasOne(m => m.Solver)
                    .WithMany(t => t.ViscTicket)
                    .HasForeignKey(m => m.SolverID);

        modelBuilder.Entity<Ticket>()
                    .HasOne(m => m.Creator)
                    .WithMany(t => t.CustTicket)
                    .HasForeignKey(m => m.CreatorID);
    }


    public DbSet<Account> Accounts { get; set; }
    public DbSet<Department> Department { get; set; }
    public DbSet<CustCompany> CustCompany { get; set; }
    public DbSet<TypeAccount> TypeAccounts { get; set; }
    public DbSet<Machine> Machines { get; set; }
    public DbSet<Ticket> Tickets { get; set; }



}

