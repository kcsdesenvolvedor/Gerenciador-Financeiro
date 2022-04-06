import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExpenseService } from 'src/app/services/expense.service';
import { Global } from 'src/shared/Global';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.css']
})
export class ExpenseComponent implements OnInit {

  expenses: any[]=[];

  constructor(
    private expenseService: ExpenseService,
    private router: Router
  ) { }

  async ngOnInit() {
    await this.GetExpenseAlls();
  }

  async GetExpenseAlls(){
    this.expenseService.GetAlls(`${Global.BASE_URL_API}/expense`).subscribe(value => {
      for (const expense of value) {
        let expenseOrder = expense['date'].split('-');
        var teste = this.expenses.push({id: expense['id'], type: 'Saida', name: expense['name'], date: expense['date'], price: expense['price'], order: expenseOrder[0]});
      }
      this.expenses.sort(function(a, b){return b.order - a.order});
    })
  }

  OnClick(id: string){
    console.log(id);
  }

  voltar(){
    this.router.navigateByUrl('');
  }

  Pull(){
    this.router.navigateByUrl('');
  }

}
