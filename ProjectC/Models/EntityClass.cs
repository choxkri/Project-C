using System.ComponentModel.DataAnnotations;

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

    public Department? Department { get; set; }

    public TypeAccount? TypeAccount { get; set; }
}

public class AccountCustomer
{
    [Key]
    public int AccountCustomer_ID { get; set; }
    public string AccountCustomer_Name { get; set; }
    public string AccountCustomer_Password { get; set; }
    public string? AccountCustomer_Email { get; set; }
    public string? AccountCustomer_Phone { get; set; }

    public CustCompany? CustCompany { get; set; }

    public TypeAccount? TypeAccount { get; set; }

    public ICollection<Machine> Machines { get; set; }
}

public class Ticket
{
    [Key]
    public int Ticket_ID { get; set; }
    public string Ticket_Name { get; set; }
    public string Ticket_Message {  get; set; }
    public string Ticket_Photo { get; set; }

    public AccountCustomer? AccountCustomer { get; set; }

    public DateTime? Ticket_Date { get; set; }

    public Machine? Machine { get; set; }

    public AccountViscon AccountViscon { get; set; }
}

