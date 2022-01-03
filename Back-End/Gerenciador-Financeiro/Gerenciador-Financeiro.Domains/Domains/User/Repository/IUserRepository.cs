using System;
using System.Collections.Generic;
using System.Text;

namespace Gerenciador_Financeiro.Domains.Domains.User.Repository
{
    public interface IUserRepository
    {
        void Save(User user);
        void Update(User user);
        void Delete(User user);
        List<User> GetUsers();
        User GetById(int id);
        User GetByName(string name);
    }
}
