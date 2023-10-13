using System;

public class Seeder
{
    public void Seed()
    {
        var db = new VisconContext();

        TypeAccount Type1 = new TypeAccount { Type_ID = 1, Type_Name = "Employee" };
        TypeAccount Type2 = new TypeAccount { Type_ID = 2, Type_Name = "Customer" };
        TypeAccount Type3 = new TypeAccount { Type_ID = 3, Type_Name = "Admin" };

        db.TypeAccounts.AddRange(new[] {
           Type1, Type2, Type3
        });

        Machine Machine1 = new Machine { Machine_ID = 1, Machine_Name = "Machine1" };
        Machine Machine2 = new Machine { Machine_ID = 2, Machine_Name = "Machine2" };
        Machine Machine3 = new Machine { Machine_ID = 3, Machine_Name = "Machine3" };
        Machine Machine4 = new Machine { Machine_ID = 4, Machine_Name = "Machine4" };

        db.Machines.AddRange(new[] {
            Machine1 , Machine2 , Machine3 , Machine4
        });

        Department department1 = new Department { Department_ID = 1, Department_Name = "Department1" };
        Department department2 = new Department { Department_ID = 2, Department_Name = "Department2" };
        Department department3 = new Department { Department_ID = 3, Department_Name = "Department3" };

        db.Department.AddRange(new[]
        {
            department1 , department2 , department3
        });

        CustCompany Company1 = new CustCompany { CustCompany_ID = 1, CustCompany_Name = "CustCompany1" };
        CustCompany Company2 = new CustCompany { CustCompany_ID = 2, CustCompany_Name = "CustCompany2" };
        CustCompany Company3 = new CustCompany { CustCompany_ID = 3, CustCompany_Name = "CustCompany3" };

        db.CustCompany.AddRange(new[]
        {
           Company1, Company2, Company3
        });

        db.AccountViscon.AddRange(new[]
        {
            new AccountViscon { AccountViscon_ID = 1, AccountViscon_Name = "Jeff", AccountViscon_Email = "VisconJeffMail@.Vis", AccountViscon_Phone = "125512124", AccountViscon_Password = "JeffPassword", Department = department1, TypeAccount = Type1},
            new AccountViscon { AccountViscon_ID = 2, AccountViscon_Name = "Jim", AccountViscon_Email = "VisconJimMail@.Vis", AccountViscon_Phone = "125512124", AccountViscon_Password = "JimPassword", Department = department1, TypeAccount = Type1},
            new AccountViscon { AccountViscon_ID = 3, AccountViscon_Name = "Jank", AccountViscon_Email = "VisconJankMail@.Vis", AccountViscon_Phone = "125512124", AccountViscon_Password = "JankPassword", Department = department1, TypeAccount = Type3},
            new AccountViscon { AccountViscon_ID = 4, AccountViscon_Name = "Sara", AccountViscon_Email = "VisconSaraMail@.Vis", AccountViscon_Phone = "125512124", AccountViscon_Password = "Sara", Department = department2, TypeAccount = Type1},
            new AccountViscon { AccountViscon_ID = 5, AccountViscon_Name = "Sem", AccountViscon_Email = "VisconSemMail@.Vis", AccountViscon_Phone = "125512124", AccountViscon_Password = "SemPassword", Department = department2, TypeAccount = Type1},
            new AccountViscon { AccountViscon_ID = 6, AccountViscon_Name = "Seff", AccountViscon_Email = "VisconSeffMail@.Vis", AccountViscon_Phone = "125512124", AccountViscon_Password = "SeffPassword", Department = department2, TypeAccount = Type3},
            new AccountViscon { AccountViscon_ID = 7, AccountViscon_Name = "Tim", AccountViscon_Email = "VisconTimMail@.Vis", AccountViscon_Phone = "125512124", AccountViscon_Password = "TimPassword", Department = department3, TypeAccount = Type1},
            new AccountViscon { AccountViscon_ID = 8, AccountViscon_Name = "Tom", AccountViscon_Email = "VisconTomMail@.Vis", AccountViscon_Phone = "125512124", AccountViscon_Password = "TomPassword", Department = department3, TypeAccount = Type1},
            new AccountViscon { AccountViscon_ID = 9, AccountViscon_Name = "Tap", AccountViscon_Email = "VisconTapMail@.Vis", AccountViscon_Phone = "125512124", AccountViscon_Password = "TapPassword", Department = department3, TypeAccount = Type3}
        });

        db.AccountCustomers.AddRange(new[]
        {
            new AccountCustomer { AccountCustomer_ID = 1, AccountCustomer_Name = "Umar", AccountCustomer_Password = "UmarPassword", Machines = { Machine1,Machine2},AccountCustomer_Phone = "0123456789" ,AccountCustomer_Email = "UmarCompain@.Comp", CustCompany_ID = 1, TypeAccount = Type1},
            new AccountCustomer { AccountCustomer_ID = 2, AccountCustomer_Name = "Henk", AccountCustomer_Password = "HenkPassword", Machines = { Machine1,Machine2},AccountCustomer_Phone = "0123456789"  ,AccountCustomer_Email = "HenkCompain@.Comp", CustCompany_ID = 1, TypeAccount = Type1},
            new AccountCustomer { AccountCustomer_ID = 3, AccountCustomer_Name = "Bink", AccountCustomer_Password = "BinkPassword", Machines = { Machine1,Machine2},AccountCustomer_Phone = "0123456789"  ,AccountCustomer_Email = "BinkCompain@.Comp", CustCompany_ID = 1, TypeAccount = Type3},
            new AccountCustomer { AccountCustomer_ID = 4, AccountCustomer_Name = "Piet", AccountCustomer_Password = "PietPassword", Machines = { Machine3,Machine2},AccountCustomer_Phone = "0123456789"  ,AccountCustomer_Email = "PietCompain@.Comp", CustCompany_ID = 2, TypeAccount = Type1},
            new AccountCustomer { AccountCustomer_ID = 5, AccountCustomer_Name = "Sam", AccountCustomer_Password = "SamPassword", Machines = { Machine3,Machine2} ,AccountCustomer_Phone = "0123456789" ,AccountCustomer_Email = "SamCompain@.Comp", CustCompany_ID = 2, TypeAccount = Type1},
            new AccountCustomer { AccountCustomer_ID = 6, AccountCustomer_Name = "Sem", AccountCustomer_Password = "SemPassword", Machines = { Machine3,Machine2} ,AccountCustomer_Phone = "0123456789" ,AccountCustomer_Email = "SemCompain@.Comp", CustCompany_ID = 2, TypeAccount = Type3},
            new AccountCustomer { AccountCustomer_ID = 7, AccountCustomer_Name = "Klaas", AccountCustomer_Password = "KlaasPassword", Machines = { Machine4,Machine2},AccountCustomer_Phone = "0123456789"  ,AccountCustomer_Email = "KlaasCompain@.Comp", CustCompany_ID = 3, TypeAccount = Type1},
            new AccountCustomer { AccountCustomer_ID = 8, AccountCustomer_Name = "Siebe", AccountCustomer_Password = "SiebePassword", Machines = { Machine4,Machine2} ,AccountCustomer_Phone = "0123456789" ,AccountCustomer_Email = "SiebeCompain@.Comp", CustCompany_ID = 3, TypeAccount = Type1},
            new AccountCustomer { AccountCustomer_ID = 9, AccountCustomer_Name = "Tymo", AccountCustomer_Password = "TymoPassword", Machines = { Machine4,Machine2} ,AccountCustomer_Phone = "0123456789" ,AccountCustomer_Email = "TymoCompain@.Comp", CustCompany_ID = 3, TypeAccount = Type3}
        });

        db.Tickets.AddRange(new[]
        {
            new Ticket { Ticket_ID = 1, AccountCustomerID = 2, AccountVisconID = 3, MachineID = 2, Ticket_Date = DateTime.UtcNow, Ticket_Photo = "None", Ticket_Name = "Some Problem" , Ticket_Message = "Ergens een probleem"},
            new Ticket { Ticket_ID = 2, AccountCustomerID = 3, AccountVisconID = 1, MachineID = 1, Ticket_Date = DateTime.UtcNow, Ticket_Photo = "None", Ticket_Name = "Some Problem" , Ticket_Message = "Ergens een probleem"},
            new Ticket { Ticket_ID = 3, AccountCustomerID = 2, AccountVisconID = 8, MachineID = 1, Ticket_Date = DateTime.UtcNow, Ticket_Photo = "None", Ticket_Name = "Some Problem" , Ticket_Message = "Ergens een probleem"},
            new Ticket { Ticket_ID = 4, AccountCustomerID = 1, AccountVisconID = 6, MachineID = 2, Ticket_Date = DateTime.UtcNow, Ticket_Photo = "None", Ticket_Name = "Some Problem" , Ticket_Message = "Ergens een probleem"},
            new Ticket { Ticket_ID = 5, AccountCustomerID = 8, AccountVisconID = 5, MachineID = 3, Ticket_Date = DateTime.UtcNow, Ticket_Photo = "None", Ticket_Name = "Some Problem" , Ticket_Message = "Ergens een probleem"},
            new Ticket { Ticket_ID = 6, AccountCustomerID = 6, AccountVisconID = 4, MachineID = 4, Ticket_Date = DateTime.UtcNow, Ticket_Photo = "None", Ticket_Name = "Some Problem" , Ticket_Message = "Ergens een probleem"},
            new Ticket { Ticket_ID = 7, AccountCustomerID = 4, AccountVisconID = 3, MachineID = 2, Ticket_Date = DateTime.UtcNow, Ticket_Photo = "None", Ticket_Name = "Some Problem" , Ticket_Message = "Ergens een probleem"},
        });

        db.SaveChanges();
    }

    public void Clear()
    {
        var db = new VisconContext();

        db.AccountCustomers.RemoveRange(db.AccountCustomers);
        db.AccountViscon.RemoveRange(db.AccountViscon);
        db.Tickets.RemoveRange(db.Tickets);
        db.TypeAccounts.RemoveRange(db.TypeAccounts);
        db.Department.RemoveRange(db.Department);
        db.CustCompany.RemoveRange(db.CustCompany);
        db.Machines.RemoveRange(db.Machines);
        db.SaveChanges();
    }
}
