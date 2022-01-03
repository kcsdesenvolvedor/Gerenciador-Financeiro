using FireSharp;
using FireSharp.Config;
using FireSharp.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;

namespace Gerenciador_Financeiro.Infra
{
    public class DbContext
    {
        public DbContext()
        {
        }

        public FirebaseClient TestingConnectionDb()
        {
            IFirebaseConfig config = new FirebaseConfig
            {
                AuthSecret = "gzEqoaqMK0UhVTCIHK8qL3hhfSZvMRFeQw0ATnq7",
                BasePath = "https://gerenciador-financeiro-d0bd6-default-rtdb.firebaseio.com/"
            };

            var client = new FirebaseClient(config);

            return client;
        }
    }
}
