using Google.Cloud.Firestore;
using System;
using System.Collections.Generic;
using System.Text;

namespace Gerenciador_Financeiro.Domains.Domains.Revenue
{
    [FirestoreData]
    public class Revenue
    {
        public Revenue()
        {
            Id = DateTime.Now.Date.ToString("dd-MM-yyyy");
        }
        [FirestoreProperty]
        public string Id { get; set; }
        [FirestoreProperty]
        public double CurrentValue { get; set; }
        [FirestoreProperty]
        public double OldValue { get; set; }

    }
}
