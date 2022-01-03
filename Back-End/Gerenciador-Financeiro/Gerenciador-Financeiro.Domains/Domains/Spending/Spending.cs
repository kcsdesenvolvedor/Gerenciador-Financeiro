using System;
using System.Collections.Generic;
using System.Text;

namespace Gerenciador_Financeiro.Domains.Domains.Spending
{
    public class Spending // gastos
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime Date { get; set; }
        public double Price { get; set; }
        public string Tag { get; set; }
        public string Annotation { get; set; }

    }
}
