using Gerenciador_Financeiro.Domains.Domains.Demostrative;
using Gerenciador_Financeiro.Domains.Domains.Demostrative.Repository;
using Google.Cloud.Firestore;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Gerenciador_Financeiro.Infra.Repositories
{
    public class DemonstrativeRepository : IDemonstrativeRepository
    {
        private FirestoreDb _dbContext = DbContext.OpenConnectionDb();
        public void Delete(Demonstrative demonstrative)
        {
            throw new NotImplementedException();
        }

        public List<Demonstrative> GetAllsDemonstrative()
        {
            throw new NotImplementedException();
        }

        public Demonstrative GetDemonstrativeById(int Id)
        {
            throw new NotImplementedException();
        }

        public async void Save(string demonstrativeId, double operationValue, double currentValue, string typeOperation)
        {
            if (VerificationDemonstrativeId(demonstrativeId).Result != null)
            {
                Demonstrative demonstrative = VerificationDemonstrativeId(demonstrativeId).Result;
                DocumentReference docRef = _dbContext.Collection("Demonstrative").Document(demonstrativeId);
                if (typeOperation == "Credited")
                {
                    AddDemostrative(demonstrativeId, typeOperation, operationValue, currentValue, demonstrative);
                }
                else
                {
                    AddDemostrative(demonstrativeId, typeOperation, operationValue, currentValue, demonstrative);
                }
            }else
            {
                DocumentReference docRef = _dbContext.Collection("Demonstrative").Document(demonstrativeId);
                Dictionary<string, object> data = new Dictionary<string, object>();
                Dictionary<string, object> dicList = new Dictionary<string, object>()
                {
                    { $"{typeOperation} Value", operationValue},
                    { "Current Balance", currentValue}
                };

                ArrayList arrayList = new ArrayList();
                arrayList.Add(dicList);

                data.Add("Operation", arrayList);

                await docRef.SetAsync(data);
            }

        }

        public void Update(Demonstrative demonstrative)
        {
            throw new NotImplementedException();
        }

        public async void AddDemostrative(string demonstrativeId, string typeOperetion, double operationValue, double currentValue, Demonstrative demonstrative)
        {
            DocumentReference docRef = _dbContext.Collection("Demonstrative").Document(demonstrativeId);
            Dictionary<string, object> data = new Dictionary<string, object>();
            Dictionary<string, object> dicList = new Dictionary<string, object>()
            {
                { $"{typeOperetion} Value", operationValue},
                { "Current Balance", currentValue}
            };

            ArrayList arrayList = new ArrayList();
            foreach (var item in demonstrative.Operation)
            {
                arrayList.Add(item);
            }
            arrayList.Add(dicList);

            data.Add("Operation", arrayList);

            await docRef.SetAsync(data);
        }

        public async Task<dynamic> VerificationDemonstrativeId(string id)
        {
            DocumentReference docRef = _dbContext.Collection("Demonstrative").Document(id);
            DocumentSnapshot snap = await docRef.GetSnapshotAsync();

            if(snap.Exists)
            {
                Demonstrative demonstrative = snap.ConvertTo<Demonstrative>();
                return demonstrative;
            }else
            {
                return null;
            }

        }
    }
}
