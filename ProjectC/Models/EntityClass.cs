using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

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
    [Key]
    public int CustCompany_ID { get; set; }
    public string CustCompany_Name { get;  set; }

}

public class Machine
{
    [Key]
    public int Machine_ID { get; set; }
    public string Machine_Name { get; set; }
}

public class AccountViscon
{
    [Key]
    public int AccountViscon_ID { get; set; }
    public string AccountViscon_Name { get; set; }
    public string AccountViscon_Password { get; set; }
    public string? AccountViscon_Email { get; set; }
    public string? AccountViscon_Phone { get; set; }


    public int DepartmentID { get; set; }

    // Define navigation property
    [ForeignKey("DepartmentID")]
    public Department Department { get; set; }

    public int TypeAccountID { get; set; }
    [ForeignKey("TypeAccountID")]
    public TypeAccount? TypeAccount { get; set; }
}

public class AccountCustomer
{
    
    public AccountCustomer()
    {
        Machines = new HashSet<Machine>();
    }
    [Key]
    public int AccountCustomer_ID { get; set; }
    public string AccountCustomer_Name { get; set; }
    public string AccountCustomer_Password { get; set; }
    public string? AccountCustomer_Email { get; set; }
    public string? AccountCustomer_Phone { get; set; }


    public int CustCompany_ID { get; set; }

    // Define navigation property
    [ForeignKey("CustCompany_ID")]
    public CustCompany CustCompany { get; set; }


    public int TypeAccountID { get; set; }
    [ForeignKey("TypeAccountID")]
    public TypeAccount? TypeAccount { get; set; }

    public virtual ICollection<Machine> Machines { get; set; }
}

public class Ticket
{
    [Key]
    public int Ticket_ID { get; set; }
    public string Ticket_Name { get; set; }
    public string Ticket_Message {  get; set; }
    public string Ticket_Photo { get; set; }

    public int AccountCustomerID { get; set; }
    [ForeignKey("AccountCustomerID")]
    public AccountCustomer? AccountCustomer { get; set; }

    public int MachineID { get; set; }
    [ForeignKey("MachineID")]
    public Machine? Machine { get; set; }

    public int AccountVisconID { get; set; }
    [ForeignKey("AccountVisconID")]
    public AccountViscon? AccountViscon { get; set; }
    public DateTime? Ticket_Date { get; set; }
}

