using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

public class VisconContext : DbContext
{
    //public DbSet<Employee> employee { get; set; }  //First, second migration (comment the following two DBSet)
    //public DbSet<Department> department { get; set; } //Third migration (comment the following DBSet)
    //public DbSet<DepartmentLocation> departmentlocation { get; set; } //Fourth migration
    public DbSet<AccountType> accounttype { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder builder)
    {
        builder.UseNpgsql("User ID=postgres;password=gio;Host=localhost;Port=5432;Database=ProjectC;Pooling=true;");
        builder.LogTo(Console.WriteLine, Microsoft.Extensions.Logging.LogLevel.Debug);
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        //First migration   
        //PK Employee using FluentAPI
        //modelBuilder.Entity<Employee>()
        //.HasKey(_ => _.SSN); //.HasKey("SSN");

        modelBuilder.Entity<AccountType>();

        //modelBuilder.Entity<Employee>()
        //.HasIndex(_ => _.BirthDate); //Index creation for this table

        ////Comment the rest (and the navigation properties of class Employee)
        ////of this method and create have a look at the corresponding migration,
        ////and update the DB if it is correct.

        ////Second migration
        ////ForeignKey Employee.Super_SSN -> Employee.SSN (Self Referencing)  
        //modelBuilder.Entity<Employee>()
        //.HasOne(_ => _.Super)            //Navigation property Super
        //.WithMany(_ => _.Subordinates)   //Navigation property Subordinates
        //.HasForeignKey(_ => _.Super_SSN)
        //.IsRequired(false) //NULL allowed
        //.HasConstraintName("FKEmpMan");

        ////Comment the rest of this method (including DepartmentLocations property in Department class)
        ////and create have a look at the corresponding migration,
        ////and update the DB if it is correct.

        ////Third migration
        ////PK Department using FluentAPI
        //modelBuilder.Entity<Department>()
        //.HasKey(d => d.Number);

        ////ForeignKey Employee.DepartmentNumber -> Department.Number (One To Many)

        //modelBuilder.Entity<Employee>()
        //.HasOne(_ => _.Department)    //Employee Navigation property Department
        //.WithMany(_ => _.Employees)   //Department Navigation property Employees
        //.HasForeignKey(e => e.DepartmentNumber)
        //.HasConstraintName("FKEmpDept");

        ////ForeignKey Employee.DepartmentNumber -> Department.Number 
        ////(Many To One) Equivalent to the previous one (try this checking the migration)

        ////   modelBuilder.Entity<Department>()
        ////   .HasMany(dept => dept.Employees)
        ////   .WithOne(emp => emp.Department)
        ////   .HasForeignKey(_ => _.DepartmentNumber)
        ////   .IsRequired() //NOT NULL in SQL
        ////   .HasConstraintName("FKEmpDept");

        //modelBuilder.Entity<Department>()
        //.HasOne(_ => _.Manager)              //Department Navigation property Manager
        //.WithMany(_ => _.ManagedDepartments) //Employee Navigation property ManagedDepartments
        //.HasForeignKey(_ => _.ManagerSSN)
        //.HasConstraintName("FKDeptMan");

        ////Comment the rest of this method and create have a look at the corresponding migration,
        ////and update the DB if it is correct.
        ////Fourth migration

        ////Fluent API for the composite PK 
        //modelBuilder.Entity<DepartmentLocation>()
        //.HasKey(deptLoc => new { deptLoc.DepartmentNumber, deptLoc.Location });

        //modelBuilder.Entity<DepartmentLocation>()
        //.HasOne(_ => _.Department)
        //.WithMany(_ => _.Locations)  //Department Navigation property Locations
        //.HasForeignKey(_ => _.DepartmentNumber)
        //.OnDelete(DeleteBehavior.Cascade)
        //.HasConstraintName("FKDeptNumber-Dep.Number");
    }
}

//public enum Gender { Male, Female, Other }

//public class Employee
//{
//    //Attributes on DB:
//    [Column(TypeName = "varchar(50)")]
//    public string FirstName { get; set; }
//    [Column(TypeName = "varchar(5)")]
//    public string MiddleInitials { get; set; }
//    [Column(TypeName = "varchar(50)")]
//    public string LastName { get; set; }
//    [Key] //PK Employee using DataAnnotation
//    [Column(TypeName = "char(9)")]
//    public string SSN { get; set; }
//    [Column(TypeName = "char(9)")]
//    public string Super_SSN { get; set; }
//    [Column(TypeName = "date")]
//    public DateTime BirthDate { get; set; }
//    public string Address { get; set; }
//    public Gender Gender { get; set; }
//    public double Salary { get; set; }
//    [Column(TypeName = "char(6)")]
//    public string DepartmentNumber { get; set; }

//    //Navigation properties:
//    public Department Department { get; set; }
//    public IEnumerable<Department> ManagedDepartments { get; set; }
//    public Employee Super { get; set; }
//    public IEnumerable<Employee> Subordinates { get; set; }

//}

//public class Department
//{
//    //Attributes on DB:
//    [Column(TypeName = "varchar(20)")]
//    public string Name { get; set; }
//    [Key]
//    [Column(TypeName = "char(6)")]
//    public string Number { get; set; }
//    [Column(TypeName = "char(9)")]
//    public string ManagerSSN { get; set; }
//    [Column(TypeName = "date")]
//    public DateTime ManagerStartDate { get; set; }

//    //Navigation properties:
//    public IEnumerable<Employee> Employees { get; set; }
//    public Employee Manager { get; set; }
//    public IEnumerable<DepartmentLocation> Locations { get; set; }

//}

////Composite PK DepartmentLocation using DataAnnotation
//[PrimaryKey(nameof(DepartmentNumber), nameof(Location))]
//public class DepartmentLocation
//{
//    //Attributes on DB:
//    [Column(TypeName = "char(6)")]
//    //[ForeignKey(nameof(Department))]
//    public string DepartmentNumber { get; set; }
//    [Column(TypeName = "varchar(20)")]
//    public string Location { get; set; }

//    //Navigation properties:
//    public Department Department { get; set; }
//}

public class AccountType
{
    [Key] 
    public int  TypeId { get; set; }

    [Column(TypeName = "varchar(20)")]
    public string TypeName { get; set; }

}