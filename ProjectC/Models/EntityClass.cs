using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Reflection.PortableExecutable;

public class Department
{
    [Key]
    public int Department_ID {  get; set; }
    public string Department_Name { get; set; }

}

public class TypeAccount
{
    [Key]
    public int Type_ID { get; set; }
    public string Type_Name { get; set; }
}

public class CustCompany
{
    public CustCompany()
    {
        Machines = new HashSet<Machine>();
    }
    
    [Key]
    public int CustCompany_ID { get; set; }
    public string CustCompany_Name { get;  set; }

    public virtual ICollection<Machine> Machines { get; set; }

}

public class Machine
{
    [Key]
    public int Machine_ID { get; set; }
    public string Machine_Name { get; set; }
}

public class Account
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    [Column("Account_ID")]
    public int Account_ID { get; set; }
    public string Account_Name { get; set; }
    public string Account_Password { get; set; }
    public string? Account_Email { get; set; }
    public string? Account_Phone { get; set; }


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
}

public class Ticket
{
    [Key]
    public int Ticket_ID { get; set; }
    public string Ticket_Name { get; set; }

    public bool Status { get; set; }
    public string Ticket_Message {  get; set; }
    public string Ticket_Photo { get; set; }


    public int Account_ID { get; set; }
    [ForeignKey("Account_ID")]
    public Account? Account { get; set; }

    //public int AccountCustomerID { get; set; }
    //[ForeignKey("AccountCustomerID")]
    //public Account? AccountCustomer { get; set; }

    public int MachineID { get; set; }
    [ForeignKey("MachineID")]
    public Machine? Machine { get; set; }

    //public int AccountVisconID { get; set; }
    //[ForeignKey("AccountVisconID")]
    //public Account? AccountViscon { get; set; }
    
    public DateTime? Ticket_Date { get; set; }
}

