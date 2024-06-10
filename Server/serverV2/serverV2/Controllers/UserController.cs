using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace serverV2.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly UserManager<IdentityUser> _userManager;

        public UserController(UserManager<IdentityUser> userManager)
        {
            _userManager = userManager;
        }

        [HttpGet("users")]
        [Authorize]
        public async Task<IActionResult> GetUserList()
        {
            try
            {
                var users = _userManager.Users.Select(u => new { u.UserName, u.Id, u.Email }).ToList();
                return Ok(users);
            }
            catch (Exception ex)
            {
                return BadRequest("Failed to retrieve user list. " + ex.Message);
            }
        }

        [HttpGet("userbyid")]
        [Authorize]
        public async Task<IActionResult> GetUserById(string userId)
        {
            try
            {
                var user = await _userManager.Users.FirstOrDefaultAsync(u => u.Id == userId);
                var userData = _userManager.Users.Where(u => u == user).Select(u => new { u.UserName, u.Email }).ToList();
                return Ok(userData);
            }catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
