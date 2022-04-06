import { state } from '@angular/animations';
import { Component, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';
import { async } from 'rxjs/internal/scheduler/async';
import { DemonstrativeComponent } from 'src/app/models/demonstrativeComponent';
import { Expense } from 'src/app/models/expense';
import { Revenue } from 'src/app/models/revenue';
import { BalanceService } from 'src/app/services/balance.service';
import { DemonstrativeService } from 'src/app/services/demonstrative.service';
import { ExpenseService } from 'src/app/services/expense.service';
import { RevenueService } from 'src/app/services/revenue.service';
import { Global } from 'src/shared/Global';
import { DialogComponent } from './dialog.component';

interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  saldo: number;
  expenses: [];
  expense: Expense;
  isExpense: boolean = false;
  expenseName: string;
  revenues: [];
  revenue: Revenue;
  isRevenue: boolean = false;
  demonstratives: any[];
  demonstrativeList: DemonstrativeComponent[]=[];
  demonstrativeListPesquisa: any = [];
  tipo: string;
  title: string;
  date: string;
  valor: number;
  dateForm: FormGroup;
  valuePesquisa: string = '';

  constructor(
    private balanceService: BalanceService,
    private expenseService: ExpenseService,
    private revenueService: RevenueService,
    private demonstrativeService: DemonstrativeService,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog) {
     }

  async ngOnInit() {
    await this.GetBalance();
    this.createFormDate();
    this.load();
    /* await this.GetExpenseAlls();
    await this.GetRevenueAlls();
    await this.GetDemonstrativeAlls(); */
  }

  createFormDate(){
    this.dateForm = new FormGroup({
      data: new FormControl()
    });
  }

  load() {
    const HAS_RELOAD = 'hasReload';  // Ao invés de passar a string 'hasRealod' diretamente é melhor criar uma constante para evitar erros de digitação
    const hasReload = sessionStorage.getItem(HAS_RELOAD);
    if (!hasReload) {
      sessionStorage.setItem(HAS_RELOAD, 'true');
      location.reload();
    }
  }

  async GetBalance(){
    this.balanceService.GetCurrentBalance(`${Global.BASE_URL_API}/balance`).subscribe(value => {
      this.saldo = value['balanceValue'];
      this.GetExpenseAlls();
    })
  }

  async GetExpenseAlls(){
    this.expenseService.GetAlls(`${Global.BASE_URL_API}/expense`).subscribe(value => {
      this.expenses = value;
      this.GetRevenueAlls();
    })

  }

  async GetRevenueAlls(){
    this.revenueService.GetAlls(`${Global.BASE_URL_API}/revenue`).subscribe(value => {
      this.revenues = value;
      this.GetDemonstrativeAlls();
    })
  }

  async GetDemonstrativeAlls(){
    this.demonstrativeService.GetAlls(`${Global.BASE_URL_API}/demonstrative`).subscribe(value => {
      this.demonstratives = value;
      this.GetComponent(this.demonstratives);
      this.balanceValue();
    })

  }

  async GetComponent(demonstrativeElements: any){
    this.demonstrativeList = [];
    for(let item of demonstrativeElements){
      for (let index = 0; index < item['operation'].length; index++) {
        let operacao = item['operation'][index]['Operação']
        if(operacao == 'Debito'){

          const expense = this.expenses.find(x => x['id'] == item['operation'][index]['Id da operação']);
          var teste = this.demonstrativeList.push({id: expense['id'], type: 'Saida', name: expense['name'], date: expense['date'], price: expense['price']});
          this.demonstrativeList.sort()
        }else{

          const revenue = this.revenues.find(r => r['id'] == item['operation'][index]['Id da operação']);
          var teste = this.demonstrativeList.push({id: revenue['id'], type: 'Entrada', name: revenue['description'], date: revenue['date'], price: revenue['revenueValue']});
        }
      }
    }
  }

  async balanceValue(){
    this.balanceService.GetCurrentBalance(`${Global.BASE_URL_API}/balance`).subscribe(result => {
      this.saldo = result['balanceValue'];
      this.demonstrativeListPesquisa = this.demonstrativeList;
    });
  }


  OnClickInfo(id: string, type: string){
    if (type == 'Saida') {
      let expense = this.expenses.find(x => x['id'] == id);
      this.router.navigateByUrl('expensePage', {state: {expense: expense}})
    }else{
      let revenue = this.revenues.find(r => r['id'] == id);
      this.router.navigateByUrl('revenuePage', {state: {revenue: revenue}})
    }
  }

  //menu de navegação
  menuClick(value: string){
    switch (value) {
      case 'saida':
        this.router.navigateByUrl("expense");
        break;
      case 'entrada':
        this.router.navigateByUrl('revenue');
        break;
      case '':
        this.router.navigateByUrl('');
        break;
      default:
        break;
    }
  }

  //retorna somente as movimentações com o nome informado
  dropDownSelectedNome(value: any){
    this.GetComponent(this.demonstratives);
    this.demonstrativeListPesquisa = this.demonstrativeList;
    var elements = this.demonstrativeListPesquisa.filter(r => r.name.toLowerCase().includes(value.target.value.toLowerCase()));
    this.demonstrativeListPesquisa = elements;
  }

  //dropDown que mostra qual o metodo de pesquisa
  onClickSelect(value: string){
    if (value == 'Nenhum') {
      this.clearSearch();
      this.valuePesquisa = value;
    }else{
      this.valuePesquisa = value;
    }
  }

  //metodo para limpar as pesquisas feita e retornar todas as movimentações
  clearSearch(){
    this.GetComponent(this.demonstratives);
    this.demonstrativeListPesquisa = this.demonstrativeList;
  }

  //metodo que retorna as movimentações feitas no intervalo de tempo informado
  verificaDate(dateDe: any, dateAte: any){
    let dateDeFormate = dateDe.value.replaceAll('/', '-');
    let dateAteFormate = dateAte.value.replaceAll('/', '-');

    this.demonstrativeService.GetInterval(`${Global.BASE_URL_API}/demonstrative`, dateDeFormate, dateAteFormate).subscribe(result => {
      let demonstrativeInterval = result;
      this.GetComponent(demonstrativeInterval);
      this.demonstrativeListPesquisa = this.demonstrativeList;
    })

  }

  foods: Food[] = [
    {value: '1', viewValue: 'Data'},
    {value: '2', viewValue: 'Nome'},
    {value: '3', viewValue: 'Nenhum'},
  ];

  openDialogDelete(id: string): void {
    var element = this.demonstrativeList.find(x => x['id'] == id);
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '300px',
      data: {id: element['id'], type: element['type'], name: element['name'], date: element['date'], price: element['price']}
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  openDialogCreate(){
    var element = {
      type: 'create',
      name: 'createMovimentacao',
      date: '00-00-00',
      price: '00'
    }
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '300px',
      data: {type: element.type, name: element.name, date: element.date, price: element.price}
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }
}


