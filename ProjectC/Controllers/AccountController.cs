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
                List<Account> user = context.Accounts.Where(_ => _.Account_Name == name && _.Account_Password == password).ToList();
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
                               join typse in context.TypeAccounts on acc.TypeAccountID equals typse.Type_ID
                               where acc.Account_ID == id
                               select typse.Type_Name).FirstOrDefault()!;
                return type;
                

            }
        }

        [HttpGet("GetAllInfoOfUser/{myid}")]
        public object GetAllInfoOfUser(int myid)
        {
            using(var context = new VisconContext())
            {
                var allInfo = from acc in context.Accounts
                              join typ in context.TypeAccounts on acc.TypeAccountID equals typ.Type_ID
                              join dep in context.Department on acc.DepartmentID equals dep.Department_ID
                              where acc.Account_ID == myid
                              select new
                              {
                                  id = acc.Account_ID,
                                  name = acc.Account_Name,
                                  password = acc.Account_Password,
                                  number = acc.Account_Phone,
                                  email = acc.Account_Email,
                                  department = dep.Department_Name,
                                  type = typ.Type_Name,
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
                context.Accounts.Add(new Account { Account_Name = name, Account_Password = password, Account_Email = email, Account_Phone = phone, CustCompanyID = companyid, DepartmentID = departmentid, TypeAccountID = typeaccountid });
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
                                   join cus in context.CustCompany on acc.CustCompanyID equals cus.CustCompany_ID
                                   where acc.Account_ID == id
                                   select cus.Machines).FirstOrDefault()!.ToArray(); // materialize the query to an array
                return getMachines;
            }
        }
        //[HttpGet("{id}")]
        //public string Deleteee(int id)
        //{
        //    using (var context = new VisconContext())
        //    {
        //        var accountToDelete = context.Accounts.Find(id);
        //        if (accountToDelete != null)
        //        {
        //            context.Accounts.Remove(accountToDelete);
        //        }
        //        var amount = context.SaveChanges();
        //        if (amount > 0) { return "Deleted"; }
        //        else { return "Not Found"; }
        //    }
        //}
    }


}