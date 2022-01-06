using Google.Cloud.Firestore;
using System;
using System.Collections.Generic;
using System.Text;

namespace Gerenciador_Financeiro.Domains.Domains.Demostrative
{
    [FirestoreData]
    public class Demonstrative
    {
        public Demonstrative()
        {
            Id = DateTime.Now.ToString("dd-MM-yyyy");
        }
        [FirestoreProperty]
        public string Id { get; set; }
        [FirestoreProperty]
        public dynamic[] Operation { get; set; }
    }
}
