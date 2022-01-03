using System;
using System.Collections.Generic;
using System.Text;

namespace Gerenciador_Financeiro.Domains.Domains.Demostrative.Service
{
    public interface IDemonstrativeService
    {
        void Save(Demonstrative demonstrative);
        void Update(Demonstrative demonstrative);
        void Delete(Demonstrative demonstrative);
        List<Demonstrative> GetAllsDemonstrative();
        Demonstrative GetDemonstrativeById(int Id);
    }
}
