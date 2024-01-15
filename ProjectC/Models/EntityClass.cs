using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Reflection.PortableExecutable;
using System.Text.RegularExpressions;

public class Department
{
    [Key]
    public int DepartmentID { get; set; }
    public string DepartmentName { get; set; }

}

public class TypeAccount
{
    [Key]
    public int TypeID { get; set; }
    public string TypeName { get; set; }
}

public class CustCompany
{
    public CustCompany()
    {
        Machines = new HashSet<Machine>();
    }

    [Key]
    public int CustCompanyID { get; set; }
    public string CustCompanyName { get; set; }

    public virtual ICollection<Machine> Machines { get; set; }

}

public class Machine
{
    [Key]
    public int MachineID { get; set; }
    public string MachineName { get; set; }
}

public class Account
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    [Column("AccountID")]
    public int AccountID { get; set; }
    public string AccountName { get; set; }
    public string AccountPassword { get; set; }
    public string? AccountEmail { get; set; }
    public string? AccountPhone { get; set; }


    public int? DepartmentID { get; set; }
    // Define navigation property
    [ForeignKey("DepartmentID")]
    public Department? Department { get; set; }

    public int? CustCompanyID { get; set; }
    [ForeignKey("CustCompanyID")]
    public CustCompany? CustCompany { get; set; }

    public int TypeAccountID { get; set; }
    [ForeignKey("TypeAccountID")]
    public TypeAccount? TypeAccount { get; set; }

    public List<Ticket> CustTicket { get; set; }
    public List<Ticket> ViscTicket { get; set; }
}

public class Ticket
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    [Column("TicketID")]
    public int TicketID { get; set; }
    public string TicketName { get; set; }

    public bool Status { get; set; }
    public string TicketMessage { get; set; }
    public string TicketPhoto { get; set; }

    public int? CreatorID { get; set; }
    [ForeignKey("CreatorID"), Column(Order = 0)]
    public Account? Creator { get; set; }

    public int MachineID { get; set; }
    [ForeignKey("MachineID")]
    public Machine? Machine { get; set; }

    public int? SolverID { get; set; }
    [ForeignKey("SolverID"), Column(Order = 1)]
    public Account? Solver { get; set; }

    public DateTime? TicketDate { get; set; }
    public string TriedExplanation { get; set; }

    public string ExpectedResultExplanation { get; set; }

    public string HowToFixExplanation { get; set; }
}

