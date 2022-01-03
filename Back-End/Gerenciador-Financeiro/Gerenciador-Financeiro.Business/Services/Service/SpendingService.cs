using Gerenciador_Financeiro.Domains.Domains.Spending;
using Gerenciador_Financeiro.Domains.Domains.Spending.Repository;
using Gerenciador_Financeiro.Domains.Domains.Spending.Service;
using System;
using System.Collections.Generic;
using System.Text;

namespace Gerenciador_Financeiro.Business.Services.Service
{
    public class SpendingService : ISpendingService
    {
        private ISpendingRepository _repository;
        public SpendingService(ISpendingRepository repository)
        {
            _repository = repository;
        }
        public void Delete(Spending spending)
        {
            _repository.Delete(spending);
        }

        public List<Spending> GetAllsSpending()
        {
            return _repository.GetAllsSpending();
        }

        public Spending GetSpendingById(int id)
        {
            return _repository.GetSpendingById(id);
        }

        public Spending GetSpendingByName(string name)
        {
            return _repository.GetSpendingByName(name);
        }

        public void Save(Spending spending)
        {
            _repository.Save(spending);
        }

        public void Update(Spending spending)
        {
            _repository.Update(spending);
        }
    }
}
