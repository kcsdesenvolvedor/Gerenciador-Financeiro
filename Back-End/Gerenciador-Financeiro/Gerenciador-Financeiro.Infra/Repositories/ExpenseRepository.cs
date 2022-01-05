
using Gerenciador_Financeiro.Domains.Domains.Expense;
using Gerenciador_Financeiro.Domains.Domains.Expense.Repository;
using Google.Cloud.Firestore;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Gerenciador_Financeiro.Infra.Repositories
{
    public class ExpenseRepository : IExpenseRepository
    {
        private FirestoreDb _dbContext = DbContext.OpenConnectionDb();
        public async void Delete(Guid id)
        {
            DocumentReference docRef = _dbContext.Collection("Expense").Document(id.ToString());
            await docRef.DeleteAsync();
        }

        public async Task<List<Expense>> GetAllsExpense()
        {
            List<Expense> expenseList = new List<Expense>();

            Query query = _dbContext.Collection("Expense");
            QuerySnapshot snap = await query.GetSnapshotAsync();

            foreach (DocumentSnapshot item in snap)
            {
                Expense expense = item.ConvertTo<Expense>();
                expenseList.Add(expense);
            }

            return expenseList;
        }

        public async Task<dynamic> GetExpenseById(Guid id)
        {
            Expense expense = new Expense();
            Query query = _dbContext.Collection("Expense");
            QuerySnapshot snap = await query.GetSnapshotAsync();

            foreach (DocumentSnapshot item in snap)
            {
                if(item.Id == id.ToString())
                    expense = item.ConvertTo<Expense>();
            }
            if (expense.Name == null)
            {
                return new { message = "Despesa não encontrada" };
            }
            return expense;
        }

        public async Task<List<Expense>> GetExpenseByName(string name)
        {
            List<Expense> expenseList = new List<Expense>();

            Query query = _dbContext.Collection("Expense");
            QuerySnapshot snap = await query.GetSnapshotAsync();

            foreach (DocumentSnapshot item in snap)
            {
                Expense expenseVerification = item.ConvertTo<Expense>();
                if(expenseVerification.Name.ToUpper().Contains(name.ToUpper()))
                    expenseList.Add(expenseVerification);
            }

            return expenseList;
        }

        public async void Save(Expense expense)
        {
            DocumentReference docRef = _dbContext.Collection("Expense").Document(expense.Id);
            Dictionary<string, object> dic = new Dictionary<string, object>()
            {
                { "Id", expense.Id},
                { "Name", expense.Name},
                { "Date", expense.Date},
                { "Price", expense.Price},
                { "Image", expense.Image},
                { "Annotation", expense.Annotation}
            };

            ArrayList tag = new ArrayList();
            foreach (var item in expense.Tag)
            {
                tag.Add(item);
            }

            dic.Add("Tag", tag);

            await docRef.SetAsync(dic);
        }

        public void Update(Expense expense)
        {
            DocumentReference docRef = _dbContext.Collection("Expense").Document(expense.Id);
            Dictionary<string, object> dic = new Dictionary<string, object>()
            {
                { "Name", expense.Name},
                { "Date", expense.Date},
                { "Price", expense.Price},
                { "Image", expense.Image},
                { "Annotation", expense.Annotation}
            };

            ArrayList tag = new ArrayList();
            foreach(var item in expense.Tag)
            {
                tag.Add(item);
            }

            dic.Add("Tag", tag);

            docRef.UpdateAsync(dic);
        }
    }
}
