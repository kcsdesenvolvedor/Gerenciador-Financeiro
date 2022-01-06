using System;
using System.Collections.Generic;
using System.Text;

namespace Gerenciador_Financeiro.Domains.Domains.Demostrative.Repository
{
    public interface IDemonstrativeRepository
    {
        void Save(string demonstrativeId, double operationValue, double currentValue, string typeOperation);
        void Update(Demonstrative demonstrative);
        void Delete(Demonstrative demonstrative);
        List<Demonstrative> GetAllsDemonstrative();
        Demonstrative GetDemonstrativeById(int Id);
    }
}
