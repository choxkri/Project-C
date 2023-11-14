using Microsoft.AspNetCore.Mvc;

namespace ProjectC.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TypeAccountController : ControllerBase
    {


        [HttpGet]
        
        public TypeAccount[] Get()
        {
            using (var context = new VisconContext())
            {
                var test = context.TypeAccounts.ToArray();
                return test;
            }
            
            
        }

    }
}