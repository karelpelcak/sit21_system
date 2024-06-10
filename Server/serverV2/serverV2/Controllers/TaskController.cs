using Microsoft.AspNetCore.Mvc;
using serverV2.Data;

namespace serverV2.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TaskController : ControllerBase
    {
        private readonly DatabaseContext _context;

        public TaskController(DatabaseContext context)
        {
            _context = context;
        }
    }
}
