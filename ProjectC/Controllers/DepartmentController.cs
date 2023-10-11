using Microsoft.AspNetCore.Mvc;

namespace ProjectC.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class DepartmentController : ControllerBase
    {


        [HttpGet]
        //Used for testing to see how it goes from database to front-end
        public Department[] Get()
        {
            using (var context = new VisconContext())
            {
                var test = context.Department.ToArray();
                return test;
            }
            
            
        }

    }
}