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

        CustCompany Company1 = new CustCompany { CustCompany_ID = 1, CustCompany_Name = "CustCompany1", Machines = { Machine1, Machine2 } };
        CustCompany Company2 = new CustCompany { CustCompany_ID = 2, CustCompany_Name = "CustCompany2", Machines = { Machine1, Machine3 } };
        CustCompany Company3 = new CustCompany { CustCompany_ID = 3, CustCompany_Name = "CustCompany3", Machines = { Machine2, Machine3 } };

        db.CustCompany.AddRange(new[]
        {
           Company1, Company2, Company3
        });

        Account Account1 = new Account { Account_Name = "Jeff", Account_Email = "VisconJeffMail@.Vis", Account_Phone = "125512124", Account_Password = "JeffPassword", CustCompanyID = null, Department = department1, TypeAccount = Type1 };
        Account Account2 = new Account { Account_Name = "Jim", Account_Email = "VisconJimMail@.Vis", Account_Phone = "125512124", Account_Password = "JimPassword", CustCompanyID = null, Department = department1, TypeAccount = Type1 };
        Account Account3 = new Account { Account_Name = "Jank", Account_Email = "VisconJankMail@.Vis", Account_Phone = "125512124", Account_Password = "JankPassword", CustCompanyID = null, Department = department1, TypeAccount = Type3 };
        Account Account4 = new Account { Account_Name = "Sara", Account_Email = "VisconSaraMail@.Vis", Account_Phone = "125512124", Account_Password = "SaraPassword", CustCompanyID = null, Department = department2, TypeAccount = Type1 };
        Account Account5 = new Account { Account_Name = "Sem", Account_Email = "VisconSemMail@.Vis", Account_Phone = "125512124", Account_Password = "SemPassword", CustCompanyID = null, Department = department2, TypeAccount = Type1 };
        Account Account6 = new Account { Account_Name = "Seff", Account_Email = "VisconSeffMail@.Vis", Account_Phone = "125512124", Account_Password = "SeffPassword", CustCompanyID = null, Department = department2, TypeAccount = Type3 };
        Account Account7 = new Account { Account_Name = "Tim", Account_Email = "VisconTimMail@.Vis", Account_Phone = "125512124", Account_Password = "TimPassword", CustCompanyID = null, Department = department3, TypeAccount = Type1 };
        Account Account8 = new Account { Account_Name = "Tom", Account_Email = "VisconTomMail@.Vis", Account_Phone = "125512124", Account_Password = "TomPassword", CustCompanyID = null, Department = department3, TypeAccount = Type1 };
        Account Account9 = new Account { Account_Name = "Tap", Account_Email = "VisconTapMail@.Vis", Account_Phone = "125512124", Account_Password = "TapPassword", CustCompanyID = null, Department = department3, TypeAccount = Type3 };
        Account Account10 = new Account { Account_Name = "Umar", Account_Password = "UmarPassword", Account_Phone = "0123456789", Account_Email = "UmarCompain@.Comp", Department = null, CustCompanyID = 1, TypeAccount = Type1 };
        Account Account11 = new Account { Account_Name = "Henk", Account_Password = "HenkPassword", Account_Phone = "0123456789", Account_Email = "HenkCompain@.Comp", Department = null, CustCompanyID = 1, TypeAccount = Type1 };
        Account Account12 = new Account { Account_Name = "Bink", Account_Password = "BinkPassword", Account_Phone = "0123456789", Account_Email = "BinkCompain@.Comp", Department = null, CustCompanyID = 1, TypeAccount = Type3 };
        Account Account13 = new Account { Account_Name = "Piet", Account_Password = "PietPassword", Account_Phone = "0123456789", Account_Email = "PietCompain@.Comp", Department = null, CustCompanyID = 2, TypeAccount = Type1 };
        Account Account14 = new Account { Account_Name = "Sam", Account_Password = "SamPassword", Account_Phone = "0123456789", Account_Email = "SamCompain@.Comp", Department = null, CustCompanyID = 2, TypeAccount = Type1 };
        Account Account15 = new Account { Account_Name = "Sem", Account_Password = "SemPassword", Account_Phone = "0123456789", Account_Email = "SemCompain@.Comp", Department = null, CustCompanyID = 2, TypeAccount = Type3 };
        Account Account16 = new Account { Account_Name = "Klaas", Account_Password = "KlaasPassword", Account_Phone = "0123456789", Account_Email = "KlaasCompain@.Comp", Department = null, CustCompanyID = 3, TypeAccount = Type1 };
        Account Account17 = new Account { Account_Name = "Siebe", Account_Password = "SiebePassword", Account_Phone = "0123456789", Account_Email = "SiebeCompain@.Comp", Department = null, CustCompanyID = 3, TypeAccount = Type1 };
        Account Account18 = new Account { Account_Name = "Tymo", Account_Password = "TymoPassword", Account_Phone = "0123456789", Account_Email = "TymoCompain@.Comp", Department = null, CustCompanyID = 3, TypeAccount = Type3 };

        db.Accounts.AddRange(new[]
        {
            Account1,Account2,Account3,Account4,Account5,Account6,Account7,Account8,Account9
        });

        db.Accounts.AddRange(new[]
        {
           Account10,Account11,Account12,Account13,Account14,Account15,Account16,Account17,Account18
        });

        db.SaveChanges();

        db.Tickets.AddRange(new[]
        {
            new Ticket { Ticket_ID = 1, CreatorID = 10, SolverID = 1, MachineID = 2, Ticket_Date = DateTime.UtcNow, Ticket_Photo = "None", Ticket_Name = "Some Problem" , Ticket_Message = "Ergens een probleem"},
            new Ticket { Ticket_ID = 2, CreatorID = 11, SolverID = 2, MachineID = 1, Ticket_Date = DateTime.UtcNow, Ticket_Photo = "None", Ticket_Name = "Some Problem" , Ticket_Message = "Ergens een probleem"},
            new Ticket { Ticket_ID = 3, CreatorID = 12, SolverID = 3, MachineID = 1, Ticket_Date = DateTime.UtcNow, Ticket_Photo = "None", Ticket_Name = "Some Problem" , Ticket_Message = "Ergens een probleem"},
            new Ticket { Ticket_ID = 4, CreatorID = 13, SolverID = 4, MachineID = 2, Ticket_Date = DateTime.UtcNow, Ticket_Photo = "None", Ticket_Name = "Some Problem" , Ticket_Message = "Ergens een probleem"},
            new Ticket { Ticket_ID = 5, CreatorID = 14, SolverID = 5, MachineID = 3, Ticket_Date = DateTime.UtcNow, Ticket_Photo = "None", Ticket_Name = "Some Problem" , Ticket_Message = "Ergens een probleem"},
            new Ticket { Ticket_ID = 6, CreatorID = 15, SolverID = 6, MachineID = 4, Ticket_Date = DateTime.UtcNow, Ticket_Photo = "None", Ticket_Name = "Some Problem" , Ticket_Message = "Ergens een probleem"},
            new Ticket { Ticket_ID = 7, CreatorID = 16, SolverID = 7, MachineID = 2, Ticket_Date = DateTime.UtcNow, Ticket_Photo = "None", Ticket_Name = "Some Problem" , Ticket_Message = "Ergens een probleem"},
        });

        db.SaveChanges();
    }

    public void Clear()
    {
        var db = new VisconContext();

        db.Accounts.RemoveRange(db.Accounts);
        db.Tickets.RemoveRange(db.Tickets);
        db.TypeAccounts.RemoveRange(db.TypeAccounts);
        db.Department.RemoveRange(db.Department);
        db.CustCompany.RemoveRange(db.CustCompany);
        db.Machines.RemoveRange(db.Machines);
        db.SaveChanges();
    }
}
