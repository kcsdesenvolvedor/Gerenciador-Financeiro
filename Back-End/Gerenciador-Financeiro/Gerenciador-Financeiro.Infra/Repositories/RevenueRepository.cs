using Gerenciador_Financeiro.Domains.Domains.Demostrative;
using Gerenciador_Financeiro.Domains.Domains.Demostrative.Service;
using Gerenciador_Financeiro.Domains.Domains.Revenue;
using Gerenciador_Financeiro.Domains.Domains.Revenue.Repository;
using Google.Cloud.Firestore;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Gerenciador_Financeiro.Infra.Repositories
{
    public class RevenueRepository : IRevenueRepository
    {
        private FirestoreDb _dbContext = DbContext.OpenConnectionDb();
        private IDemonstrativeService _demonstrativeService;

        public RevenueRepository(IDemonstrativeService demonstrativeService)
        {
            _demonstrativeService = demonstrativeService;
        }
        public void Delete(Revenue revenue)
        {
            throw new NotImplementedException();
        }

        public List<Revenue> GetAllsRevenue()
        {
            throw new NotImplementedException();
        }

        public Revenue GetRevenueById(int id)
        {
            throw new NotImplementedException();
        }

        public async void Save(Revenue revenue)
        {
            //dynamic oldRevenue = VerificationRevenueId(revenue.Id);
            if(VerificationRevenueId(revenue.Id).Result != null)
            {
                Revenue oldRevenue = VerificationRevenueId(revenue.Id).Result;
                double valueOperation = revenue.CurrentValue;
                revenue.OldValue = oldRevenue.CurrentValue;
                revenue.CurrentValue = revenue.CurrentValue + oldRevenue.CurrentValue;
                DocumentReference docRef = _dbContext.Collection("Revenue").Document(revenue.Id);
                Dictionary<string, object> dic = new Dictionary<string, object>()
                {
                    { "Id", revenue.Id},
                    { "CurrentValue", revenue.CurrentValue},
                    { "OldValue", revenue.OldValue}
                };

                Demonstrative demonstrative = new Demonstrative();

                await docRef.SetAsync(dic);
                _demonstrativeService.Save(demonstrative.Id, valueOperation, revenue.CurrentValue, "Credited");
            }else
            {
                //adicionando saldo pela primeira vez no dia
                DocumentReference docRef = _dbContext.Collection("Revenue").Document(revenue.Id);
                Dictionary<string, object> dic = new Dictionary<string, object>()
                    {
                        { "Id", revenue.Id},
                        { "CurrentValue", revenue.CurrentValue},
                        { "OldValue", revenue.OldValue}
                    };

                Demonstrative demonstrative = new Demonstrative();

                await docRef.SetAsync(dic);
                _demonstrativeService.Save(demonstrative.Id, revenue.CurrentValue, revenue.CurrentValue, "Credited");
            }

        }

        public void Update(Revenue revenue)
        {
            throw new NotImplementedException();
        }

        public async Task<dynamic> VerificationRevenueId(string id)
        {
            DocumentReference docRef = _dbContext.Collection("Revenue").Document(id);
            DocumentSnapshot snap = await docRef.GetSnapshotAsync();

            if(snap.Exists)
            {
                Revenue revenue = snap.ConvertTo<Revenue>();
                return revenue;
            }else
            {
                return null;
            }
        }
    }
}
