using System;
using System.Collections.Generic;
using System.Text;

namespace Gerenciador_Financeiro.Domains.Domains.Spending.Service
{
    public interface ISpendingService
    {
        void Save(Spending spending);
        void Delete(Spending spending);
        void Update(Spending spending);
        List<Spending> GetAllsSpending();
        Spending GetSpendingById(int id);
        Spending GetSpendingByName(string name);
    }
}
