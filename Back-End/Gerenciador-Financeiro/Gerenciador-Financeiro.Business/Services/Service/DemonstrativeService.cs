using Gerenciador_Financeiro.Domains.Domains.Demostrative;
using Gerenciador_Financeiro.Domains.Domains.Demostrative.Repository;
using Gerenciador_Financeiro.Domains.Domains.Demostrative.Service;
using System;
using System.Collections.Generic;
using System.Text;

namespace Gerenciador_Financeiro.Business.Services.Service
{
    public class DemonstrativeService : IDemonstrativeService
    {
        private IDemonstrativeRepository _demonstrativeRepository;

        public DemonstrativeService(IDemonstrativeRepository demonstrativeRepository)
        {
            _demonstrativeRepository = demonstrativeRepository;
        }
        public void Delete(Demonstrative demonstrative)
        {
            _demonstrativeRepository.Delete(demonstrative);
        }

        public List<Demonstrative> GetAllsDemonstrative()
        {
            return _demonstrativeRepository.GetAllsDemonstrative();
        }

        public Demonstrative GetDemonstrativeById(int id)
        {
            return _demonstrativeRepository.GetDemonstrativeById(id);
        }

        public void Save(string demonstrativeId, double operationValue, double currentValue, string typeOperation)
        {
            _demonstrativeRepository.Save(demonstrativeId, operationValue, currentValue, typeOperation);
        }

        public void Update(Demonstrative demonstrative)
        {
            _demonstrativeRepository.Update(demonstrative);
        }
    }
}
