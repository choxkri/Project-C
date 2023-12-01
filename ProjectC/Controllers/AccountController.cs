using Microsoft.AspNetCore.Mvc;

namespace ProjectC.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AccountController : ControllerBase
    {


       

        //[HttpGet]
        //Used for testing to see how it goes from database to front-end
        //public AccountViscon[] Get()
        //{
        //    using (var context = new VisconContext())
        //    {
        //        var test = context.AccountViscon.ToArray();
        //        return test;
        //    }


        //}

        [HttpGet("{name}/{password}")]

        public Account LogIn(string name, string password)
        {
            using (var context = new VisconContext())
            {
                List<Account> user = context.Accounts.Where(_ => _.AccountName == name && _.AccountPassword == password).ToList();
                if (user.Count == 0)
                {
                    return null;
                }
                else
                {
                    return user[0];
                }
            }

        }

        [HttpGet("{id}")]
        public string GetType(int id)
        {
            using (var context = new VisconContext())
            {
                string type = (from acc in context.Accounts
                               join typse in context.TypeAccounts on acc.TypeAccountID equals typse.TypeID
                               where acc.AccountID == id
                               select typse.TypeName).FirstOrDefault()!;
                return type;
                

            }
        }

        [HttpGet("GetAllInfoOfUser/{myid}")]
        public object GetAllInfoOfUser(int myid)
        {
            using(var context = new VisconContext())
            {
                var allInfo = from acc in context.Accounts
                              join typ in context.TypeAccounts on acc.TypeAccountID equals typ.TypeID
                              join dep in context.Department on acc.DepartmentID equals dep.DepartmentID
                              where acc.AccountID == myid
                              select new
                              {
                                  id = acc.AccountID,
                                  name = acc.AccountName,
                                  password = acc.AccountPassword,
                                  number = acc.AccountPhone,
                                  email = acc.AccountEmail,
                                  department = dep.DepartmentName,
                                  type = typ.TypeName,
                              };
                var arr = allInfo.ToArray()[0];
                return arr;


            }
        }

        [HttpGet("{name}/{password}/{phone}/{email}/{companyid}/{departmentid}/{typeaccountid}")]
        public string AddAccount(string name, string password, string phone, string email, int? companyid, int? departmentid, int typeaccountid)
        {
            using (var context = new VisconContext())
            {
                if(departmentid == 0) { departmentid = null; }
                context.Accounts.Add(new Account { AccountName = name, AccountPassword = password, AccountEmail = email, AccountPhone = phone, CustCompanyID = companyid, DepartmentID = departmentid, TypeAccountID = typeaccountid });
                var amount = context.SaveChanges();
                if (amount > 0) { return "Added the account"; }
                else { return "Error occured"; }
            }
        }

        [HttpGet("GetMachinesFromUser/{id}")]
        public Machine[] GetMachines(int id)
        {
            using (var context = new VisconContext())
            {
                var getMachines = (from acc in context.Accounts
                                   join cus in context.CustCompany on acc.CustCompanyID equals cus.CustCompanyID
                                   where acc.AccountID == id
                                   select cus.Machines).FirstOrDefault(); // Get the Machines collection

                // Check if getMachines is not null before converting to array
                return getMachines?.ToArray() ?? Array.Empty<Machine>();
            }
        }

        [HttpGet("{account}")]
        public string EditAccount(Account account)
        {
            using (var context = new VisconContext())
            {
                context.Accounts.Update(account);
                var amount = context.SaveChanges();
                if (amount > 0) { return "Edited the account"; }
                else { return "Error occured"; }
            }
        }

        [HttpGet("Delete/{id}")]
        public string Delete(int id)
        {
            using (var context = new VisconContext())
            {
                var accountToDelete = context.Accounts.Find(id);
                if (accountToDelete != null)
                {
                    context.Accounts.Remove(accountToDelete);
                }
                var amount = context.SaveChanges();
                if (amount > 0) { return "Deleted"; }
                else { return "Not Found"; }
            }
        }
    }


}