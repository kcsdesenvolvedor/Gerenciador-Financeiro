using Gerenciador_Financeiro.Domains.Domains.User;
using Gerenciador_Financeiro.Domains.Domains.User.Service;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace Gerenciador_Financeiro.API.Controllers
{
    //[AllowAnonymous]
    [Route("v1/[controller]")]
    public class UserController : ControllerBase
    {
        private IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> Save([FromBody] User user)
        {
            if (user == null)
                return BadRequest();
            _userService.Save(user);
            return Ok(new { message = "Usuário cadastrado com sucesso!"});
        }

        [HttpGet]
        [AllowAnonymous]
        public IActionResult GetUsers()
        {
            try
            {
                return Ok(_userService.GetUsers().Result);
            }
            catch (System.Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }
    }
}
