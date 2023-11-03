using Microsoft.AspNetCore.Mvc;

namespace ProjectC.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CustCompanyController : ControllerBase
    {


        [HttpGet]
        
        public CustCompany[] Get()
        {
            using (var context = new VisconContext())
            {
                var test = context.CustCompany.ToArray();
                return test;
            }
            
            
        }

    }
}