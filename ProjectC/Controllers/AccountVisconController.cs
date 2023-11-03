using Microsoft.AspNetCore.Mvc;

namespace ProjectC.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AccountVisconController : ControllerBase
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

        public AccountViscon LogIn(string name, string password)
        {
            using (var context = new VisconContext())
            {
                List<AccountViscon> user = context.AccountViscon.Where(_ => _.AccountViscon_Name == name && _.AccountViscon_Password == password).ToList();
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
                string type = (from acc in context.AccountViscon
                               join typse in context.TypeAccounts on acc.TypeAccountID equals typse.Type_ID
                               where acc.AccountViscon_ID == id
                               select typse.Type_Name).FirstOrDefault()!;
                return type;
                

            }
        }

        [HttpGet("GetAllInfoOfUser/{myid}")]
        public object GetAllInfoOfUser(int myid)
        {
            using(var context = new VisconContext())
            {
                var allInfo = from acc in context.AccountViscon
                              join typ in context.TypeAccounts on acc.TypeAccountID equals typ.Type_ID
                              join dep in context.Department on acc.DepartmentID equals dep.Department_ID
                              where acc.AccountViscon_ID == myid
                              select new
                              {
                                  id = acc.AccountViscon_ID,
                                  name = acc.AccountViscon_Name,
                                  password = acc.AccountViscon_Password,
                                  number = acc.AccountViscon_Phone,
                                  email = acc.AccountViscon_Email,
                                  department = dep.Department_Name,
                                  type = typ.Type_Name,
                              };
                var arr = allInfo.ToArray()[0];
                return arr;


            }
        }
    }


}