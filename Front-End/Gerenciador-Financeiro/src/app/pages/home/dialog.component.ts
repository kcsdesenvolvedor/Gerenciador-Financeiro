import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AlertNotificationService } from 'src/app/services/alertNotification.service';
import { ExpenseService } from 'src/app/services/expense.service';
import { RevenueService } from 'src/app/services/revenue.service';
import { Global } from 'src/shared/Global';

export interface DialogData {
  id: string;
  name: string;
  date: string;
  type: string;
  price: number;
}

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./home.component.css']
})
export class DialogComponent implements OnInit {

    dialogForm: FormGroup;
    element: string = 'default';

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private expenseService: ExpenseService,
    private revenueService: RevenueService,
    private router: Router,
    private notificationService: AlertNotificationService
  ) { }

  ngOnInit(): void {
      this.dialogForm = new FormGroup({
          name: new FormControl({value: this.data.name, disabled: true}),
          date: new FormControl({value: this.data.date, disabled: true}),
          type: new FormControl({value: this.data.type, disabled: true}),
          price: new FormControl({value: this.data.price, disabled: true})
      });
      if (this.data.type == 'create') {
        this.element = 'create';
      }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  deletar(){
      if (this.data.type == 'Saida') {
        this.expenseService.Delete(`${Global.BASE_URL_API}/expense`, this.data.id).subscribe({
          next: expenseReturn => {
            this.notificationService.showMessage(expenseReturn.message, expenseReturn.status);
            this.router.navigateByUrl('load', {state: {route: ''}});
          },
          error: errorReturn => {
            this.notificationService.errorHandler(errorReturn);
          }
        });
      }else{
        this.revenueService.Delete(`${Global.BASE_URL_API}/revenue`, this.data.id).subscribe({
          next: revenueReturn => {
            this.notificationService.showMessage(revenueReturn.message, revenueReturn.status);
            this.router.navigateByUrl('load', {state: {route: ''}});
          },
          error: errorReturn => {
            this.notificationService.errorHandler(errorReturn);
          }
        });
      }

      this.onNoClick();
  }

  load() {
    const HAS_RELOAD = 'hasReload';  // Ao invés de passar a string 'hasRealod' diretamente é melhor criar uma constante para evitar erros de digitação
    const hasReload = sessionStorage.getItem(HAS_RELOAD);
    if (!hasReload) {
      sessionStorage.setItem(HAS_RELOAD, 'true');
      location.reload();
    }
  }

}