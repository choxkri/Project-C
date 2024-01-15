using System;
using ProjectC.Security;

public class Seeder
{
    public void Seed()
    {
        var db = new VisconContext();

        TypeAccount Type1 = new TypeAccount { TypeID = 1, TypeName = "Employee" };
        TypeAccount Type2 = new TypeAccount { TypeID = 2, TypeName = "Customer" };
        TypeAccount Type3 = new TypeAccount { TypeID = 3, TypeName = "Admin" };

        db.TypeAccounts.AddRange(new[] {
           Type1, Type2, Type3
        });

        Machine Machine1 = new Machine { MachineID = 1, MachineName = "SkibiMax" };
        Machine Machine2 = new Machine { MachineID = 2, MachineName = "Trollobir" };
        Machine Machine3 = new Machine { MachineID = 3, MachineName = "SuperX" };
        Machine Machine4 = new Machine { MachineID = 4, MachineName = "RoboBlater" };
        Machine Machine5 = new Machine { MachineID = 5, MachineName = "MaxMachin" };
        Machine Machine6 = new Machine { MachineID = 6, MachineName = "SkibiPro" };
        Machine Machine7 = new Machine { MachineID = 7, MachineName = "AutomatronX" };
        Machine Machine8 = new Machine { MachineID = 8, MachineName = "CyberNexus" };
        Machine Machine9 = new Machine { MachineID = 9, MachineName = "TechTronix" };
        Machine Machine10 = new Machine { MachineID = 10, MachineName = "MechaForge" };
        Machine Machine11 = new Machine { MachineID = 11, MachineName = "NanoMech" };
        Machine Machine12 = new Machine { MachineID = 12, MachineName = "RoboMatic" };
        Machine Machine13 = new Machine { MachineID = 13, MachineName = "ByteBlast" };
        Machine Machine14 = new Machine { MachineID = 14, MachineName = "CircuitCraft" };
        Machine Machine15 = new Machine { MachineID = 15, MachineName = "SteelSync" };
        Machine Machine16 = new Machine { MachineID = 16, MachineName = "ElectroPulse" };

        db.Machines.AddRange(new[] {
    Machine1, Machine2, Machine3, Machine4, Machine5, Machine6,
    Machine7, Machine8, Machine9, Machine10, Machine11, Machine12,
    Machine13, Machine14, Machine15, Machine16
                 });


        Department department1 = new Department { DepartmentID = 1, DepartmentName = "Development" };
        Department department2 = new Department { DepartmentID = 2, DepartmentName = "Flower and Plants" };
        Department department3 = new Department { DepartmentID = 3, DepartmentName = "Fruit and Vegetables" };
        Department department4 = new Department { DepartmentID = 4, DepartmentName = "Poultry" };
        Department department5 = new Department { DepartmentID = 5, DepartmentName = "Insects" };
        Department department6 = new Department { DepartmentID = 6, DepartmentName = "Production Logistics" };
        Department department7 = new Department { DepartmentID = 7, DepartmentName = "Warehousing and Fulfillment" };

        db.Department.AddRange(new[]
        {
          department1, department2, department3, department4,
          department5, department6, department7
          });

        CustCompany Company1 = new CustCompany { CustCompanyID = 1, CustCompanyName = "Viscon", Machines = { Machine1 } };
        CustCompany Company2 = new CustCompany { CustCompanyID = 2, CustCompanyName = "CustCompany2", Machines = { Machine3, Machine4 } };
        CustCompany Company3 = new CustCompany { CustCompanyID = 3, CustCompanyName = "CustCompany3", Machines = { Machine5, Machine6,Machine7 , Machine8 } };
        CustCompany Company4 = new CustCompany { CustCompanyID = 4, CustCompanyName = "CustCompany4", Machines = { Machine9, Machine10  } };
        CustCompany Company5 = new CustCompany { CustCompanyID = 5, CustCompanyName = "CustCompany5", Machines = { Machine11,Machine12,Machine13,Machine14,Machine15 } };
        CustCompany Company6 = new CustCompany { CustCompanyID = 6, CustCompanyName = "CustCompany6", Machines = { Machine2, Machine16 } };

        db.CustCompany.AddRange(new[]
        {
           Company1, Company2, Company3 , Company4, Company5, Company6
        });
 
        Account Account1 = new Account { AccountName = "Jeff", AccountEmail = "VisconJeffMail@.Vis", AccountPhone = "125512124", AccountPassword = Security.EncodePasswordToBase64("JeffPassword"), CustCompanyID = null, Department = department1, TypeAccount = Type1 };
        Account Account2 = new Account { AccountName = "Jim", AccountEmail = "VisconJimMail@.Vis", AccountPhone = "125512124", AccountPassword = Security.EncodePasswordToBase64("JimPassword"), CustCompanyID = null, Department = department1, TypeAccount = Type1 };
        Account Account3 = new Account { AccountName = "Jank", AccountEmail = "VisconJankMail@.Vis", AccountPhone = "125512124", AccountPassword = Security.EncodePasswordToBase64("JankPassword"), CustCompanyID = null, Department = department1, TypeAccount = Type3 };
        Account Account4 = new Account { AccountName = "Sara", AccountEmail = "VisconSaraMail@.Vis", AccountPhone = "125512124", AccountPassword = Security.EncodePasswordToBase64("SaraPassword"), CustCompanyID = null, Department = department2, TypeAccount = Type1 };
        Account Account5 = new Account { AccountName = "Sem", AccountEmail = "VisconSemMail@.Vis", AccountPhone = "125512124", AccountPassword = Security.EncodePasswordToBase64("SemPassword"), CustCompanyID = null, Department = department2, TypeAccount = Type1 };
        Account Account6 = new Account { AccountName = "Seff", AccountEmail = "VisconSeffMail@.Vis", AccountPhone = "125512124", AccountPassword = Security.EncodePasswordToBase64("SeffPassword"), CustCompanyID = null, Department = department2, TypeAccount = Type3 };
        Account Account7 = new Account { AccountName = "Tim", AccountEmail = "VisconTimMail@.Vis", AccountPhone = "125512124", AccountPassword = Security.EncodePasswordToBase64("TimPassword"), CustCompanyID = null, Department = department3, TypeAccount = Type1 };
        Account Account8 = new Account { AccountName = "Tom", AccountEmail = "VisconTomMail@.Vis", AccountPhone = "125512124", AccountPassword = Security.EncodePasswordToBase64("TomPassword"), CustCompanyID = null, Department = department3, TypeAccount = Type1 };
        Account Account9 = new Account { AccountName = "Tap", AccountEmail = "VisconTapMail@.Vis", AccountPhone = "125512124", AccountPassword = Security.EncodePasswordToBase64("TapPassword"), CustCompanyID = null, Department = department3, TypeAccount = Type3 };
        Account Account10 = new Account { AccountName = "Umar", AccountEmail = "UmarCompain@.Comp", AccountPhone = "0123456789", AccountPassword= Security.EncodePasswordToBase64("UmarPassword"), Department = null, CustCompany = Company1, TypeAccount = Type2 };
        Account Account11 = new Account { AccountName = "Henk", AccountEmail = "HenkCompain@.Comp", AccountPhone = "0123456789", AccountPassword = Security.EncodePasswordToBase64("HenkPassword"), Department = null, CustCompany = Company1, TypeAccount = Type2 };
        Account Account12 = new Account { AccountName = "Bink", AccountEmail = "BinkCompain@.Comp", AccountPhone = "0123456789", AccountPassword = Security.EncodePasswordToBase64("BinkPassword"), Department = null, CustCompany = Company1, TypeAccount = Type2 };
        Account Account13 = new Account { AccountName = "Piet", AccountEmail = "PietCompain@.Comp", AccountPhone = "0123456789", AccountPassword = Security.EncodePasswordToBase64("PietPassword"), Department = null, CustCompany = Company2, TypeAccount = Type2 };
        Account Account14 = new Account { AccountName = "Sam", AccountEmail = "SamCompain@.Comp", AccountPhone = "0123456789", AccountPassword = Security.EncodePasswordToBase64("SamPassword"), Department = null, CustCompany = Company2, TypeAccount = Type2 };
        Account Account15 = new Account { AccountName = "Sem", AccountEmail = "SemCompain@.Comp", AccountPhone = "0123456789", AccountPassword = Security.EncodePasswordToBase64("SemPassword"), Department = null, CustCompany = Company2, TypeAccount = Type2 };
        Account Account16 = new Account { AccountName = "Klaas", AccountEmail = "KlaasCompain@.Comp", AccountPhone = "0123456789", AccountPassword = Security.EncodePasswordToBase64("KlaasPassword"), Department = null, CustCompany = Company2, TypeAccount = Type2 };
        Account Account17 = new Account { AccountName = "Siebe", AccountEmail = "SiebeCompain@.Comp", AccountPhone = "0123456789", AccountPassword = Security.EncodePasswordToBase64("SiebePassword"), Department = null, CustCompany = Company3, TypeAccount = Type2 };
        Account Account18 = new Account { AccountName = "Tymo", AccountEmail = "TymoCompain@.Comp", AccountPhone = "0123456789", AccountPassword = Security.EncodePasswordToBase64("TymoPassword"), Department = null, CustCompany = Company3, TypeAccount = Type2 };
        Account Account19 = new Account { AccountName = "Tester", AccountEmail = "VisconTesterMail@.Vis", AccountPhone = "125512124", AccountPassword = Security.EncodePasswordToBase64("TesterPassword"), CustCompanyID = null, Department = null, TypeAccount = Type1 };
        db.Accounts.AddRange(new[]
        {
            Account1,Account2,Account3,Account4,Account5,Account6,Account7,Account8,Account9
        });

        db.Accounts.AddRange(new[]
        {
           Account10,Account11,Account12,Account13,Account14,Account15,Account16,Account17,Account18,Account19
        });

        db.SaveChanges();

        db.Tickets.AddRange(new[]
        {
            new Ticket { CreatorID = Account10.AccountID, SolverID = Account1.AccountID, MachineID = 2, TicketDate = DateTime.UtcNow, TicketPhoto = "None", TicketName = "Some Problem" , TicketMessage = "Ergens een probleem", Status = false, TriedExplanation = "You have to do this and dat", ExpectedResultExplanation = "I just want to work lets be fair", HowToFixExplanation = "throw it in water lol", },
            new Ticket { CreatorID = Account11.AccountID, SolverID = Account2.AccountID, MachineID = 1, TicketDate = DateTime.UtcNow, TicketPhoto = "None", TicketName = "Some Problem" , TicketMessage = "Ergens een probleem",  Status = false, TriedExplanation = "You have to do this and dat", ExpectedResultExplanation = "I just want to work lets be fair", HowToFixExplanation = "throw it in water lol"},
            new Ticket { CreatorID = Account12.AccountID, SolverID = Account3.AccountID, MachineID = 1, TicketDate = DateTime.UtcNow, TicketPhoto = "None", TicketName = "Some Problem" , TicketMessage = "Ergens een probleem", Status = false, TriedExplanation = "You have to do this and dat", ExpectedResultExplanation = "I just want to work lets be fair", HowToFixExplanation = "throw it in water lol"},
            new Ticket { CreatorID = Account13.AccountID, SolverID = Account4.AccountID, MachineID = 2, TicketDate = DateTime.UtcNow, TicketPhoto = "None", TicketName = "Some Problem" , TicketMessage = "Ergens een probleem" , Status = false, TriedExplanation = "You have to do this and dat", ExpectedResultExplanation = "I just want to work lets be fair", HowToFixExplanation = "throw it in water lol"},
            new Ticket { CreatorID = Account14.AccountID, SolverID = Account5.AccountID, MachineID = 3, TicketDate = DateTime.UtcNow, TicketPhoto = "None", TicketName = "Some Problem" , TicketMessage = "Ergens een probleem", Status = false, TriedExplanation = "You have to do this and dat", ExpectedResultExplanation = "I just want to work lets be fair", HowToFixExplanation = "throw it in water lol"},
            new Ticket { CreatorID = Account15.AccountID, SolverID = Account6.AccountID, MachineID = 4, TicketDate = DateTime.UtcNow, TicketPhoto = "None", TicketName = "Some Problem" , TicketMessage = "Ergens een probleem", Status = false, TriedExplanation = "You have to do this and dat", ExpectedResultExplanation = "I just want to work lets be fair", HowToFixExplanation = "throw it in water lol"},
            new Ticket { CreatorID = Account16.AccountID, SolverID = Account7.AccountID, MachineID = 2, TicketDate = DateTime.UtcNow, TicketPhoto = "None", TicketName = "Some Problem" , TicketMessage = "Ergens een probleem", Status = false, TriedExplanation = "You have to do this and dat", ExpectedResultExplanation = "I just want to work lets be fair", HowToFixExplanation = "throw it in water lol"},
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

    public void ResetDB()
    {
        Clear();
        Seed();
    }
}
