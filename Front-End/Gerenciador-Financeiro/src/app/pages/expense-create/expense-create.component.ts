import { Component, createPlatform, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Expense } from 'src/app/models/expense';
import { AlertNotificationService } from 'src/app/services/alertNotification.service';
import { ExpenseService } from 'src/app/services/expense.service';
import { Global } from 'src/shared/Global';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';

@Component({
  selector: 'app-expense-create',
  templateUrl: './expense-create.component.html',
  styleUrls: ['./expense-create.component.css']
})
export class ExpenseCreateComponent implements OnInit {

  expenseForm: FormGroup;
  expense: Expense;
  expenseDate: string;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  fruitCtrl = new FormControl();
  filteredFruits: Observable<string[]>;
  tags: string[]=[];
  allTags: string[] = ['Kellton', 'Bruna', 'Cíntia', 'Robson', 'Isaque', 'Jonathan'];

  @ViewChild('fruitInput') fruitInput: ElementRef<HTMLInputElement>;

  constructor(
    private expenseService: ExpenseService,
    private notificationService: AlertNotificationService,
    private router: Router) {
      this.filteredFruits = this.fruitCtrl.valueChanges.pipe(
        startWith(null),
        map((tag: string | null) => (tag ? this._filter(tag) : this.allTags.slice())),
      );
     }

  ngOnInit(): void {
    this.createForm();
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.tags.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.fruitCtrl.setValue(null);
  }

  remove(tag: string): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.tags.push(event.option.viewValue);
    this.fruitInput.nativeElement.value = '';
    this.fruitCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allTags.filter(tag => tag.toLowerCase().includes(filterValue));
  }

  createForm(){
    this.expenseForm = new FormGroup({
      name: new FormControl(),
      date: new FormControl(),
      price: new FormControl(),
      tag: new FormControl(),
      image: new FormControl(),
      annotation: new FormControl(),
    })
  }

  createExpense(){
    
    if (this.expenseForm.valid) {
      this.expense = Object.assign({}, this.expenseForm.value);
      this.expense.image = 'null';
      this.expense.tag = this.tags;
      this.expense.date = this.expenseDate;
      this.expenseService.Create(`${Global.BASE_URL_API}/expense`, this.expense).subscribe({
        next: expenseReturn => {
          this.notificationService.showMessage(expenseReturn.message, expenseReturn.status);
          this.router.navigate(['']);
        },
        error: errorReturn => {
          this.notificationService.showMessage(errorReturn.message, errorReturn.status);
          this.router.navigate(['']);
        }
      })
    }
  }

  cancel(){
    this.router.navigateByUrl('');
  }

  formatDate(date: any){
    let newDate = date.value.replaceAll('/', '-');
    this.expenseDate = newDate;
  }

}



