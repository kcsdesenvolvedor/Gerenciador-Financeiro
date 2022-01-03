using System;
using System.Collections.Generic;
using System.Text;

namespace Gerenciador_Financeiro.Domains.Domains.Revenue
{
    public class Revenue
    {
        public int Id { get; set; }
        public double CurrentValue { get; set; }
        public double OldValue { get; set; }

    }
}
