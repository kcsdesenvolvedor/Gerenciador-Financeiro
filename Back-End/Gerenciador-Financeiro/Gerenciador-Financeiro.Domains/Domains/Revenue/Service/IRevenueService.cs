using System;
using System.Collections.Generic;
using System.Text;

namespace Gerenciador_Financeiro.Domains.Domains.Revenue.Service
{
    public interface IRevenueService
    {
        void Save(Revenue revenue);
        void Update(Revenue revenue);
        void Delete(Revenue revenue);
        List<Revenue> GetAllsRevenue();
        Revenue GetRevenueById(int id);
    }
}
