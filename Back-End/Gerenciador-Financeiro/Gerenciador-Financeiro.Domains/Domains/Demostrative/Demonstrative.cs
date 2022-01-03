using System;
using System.Collections.Generic;
using System.Text;

namespace Gerenciador_Financeiro.Domains.Domains.Demostrative
{
    public class Demonstrative
    {
        public string BalanceStatement { get; set; }
        public DateTime Date { get; set; }
        public int SpendingId { get; set; }
        public int RevenueId { get; set; }
    }
}
