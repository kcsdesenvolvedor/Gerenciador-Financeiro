using Gerenciador_Financeiro.Domains.Domains.Revenue;
using Gerenciador_Financeiro.Domains.Domains.Revenue.Service;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace Gerenciador_Financeiro.API.Controllers
{
    [Route("v1/[controller]")]
    public class RevenueController : ControllerBase
    {
        private IRevenueService _revenueService;
        public RevenueController(IRevenueService revenueService)
        {
            _revenueService = revenueService;
        }

        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> Save([FromBody] Revenue revenue)
        {
            try
            {
                _revenueService.Save(revenue);
                return Ok(new { message = "Saldo adicionado com sucesso!", status = "success"});
            }
            catch (System.Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }
    }
}
