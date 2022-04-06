import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { map, startWith } from 'rxjs/operators';
import { Expense } from 'src/app/models/expense';
import { AlertNotificationService } from 'src/app/services/alertNotification.service';
import { ExpenseService } from 'src/app/services/expense.service';
import { Global } from 'src/shared/Global';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-expense-page',
  templateUrl: './expense-page.component.html',
  styleUrls: ['./expense-page.component.css']
})
export class ExpensePageComponent implements OnInit {

  data: any;
  expense: Expense;
  expenseForm: FormGroup;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  fruitCtrl = new FormControl();
  filteredFruits: Observable<string[]>;
  tags: string[]=[];
  allTags: string[] = ['Kellton', 'Bruna', 'Cíntia', 'Robson', 'Isaque', 'Jonathan'];

  @ViewChild('fruitInput') fruitInput: ElementRef<HTMLInputElement>;

  constructor(
    private router: Router,
    private expenseService: ExpenseService,
    private notificationService: AlertNotificationService
  ) {
    const nav = this.router.getCurrentNavigation();
    this.data = nav.extras.state;
    this.filteredFruits = this.fruitCtrl.valueChanges.pipe(
      startWith(null),
      map((tag: string | null) => (tag ? this._filter(tag) : this.allTags.slice())),
    );
   }

  ngOnInit(): void {
    this.createForm();
    this.expense = this.data.expense;
    this.tags = this.data.expense.tag;
    this.expenseForm.setValue(this.data.expense);
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
      id: new FormControl(),
      name: new FormControl(),
      date: new FormControl({value: '', disabled: true}, Validators.required),
      price: new FormControl(),
      image: new FormControl(),
      tag: new FormControl(),
      annotation: new FormControl()
    })
  }

  updateExpense(){
    if (this.expenseForm.valid) {
      this.expense = Object.assign({}, this.expenseForm.value);
      this.expense.image = 'null';
      this.expense.tag = this.tags;
      this.expenseService.Update(`${Global.BASE_URL_API}/expense`, this.expense).subscribe({
        next: expenseReturn => {
          this.notificationService.showMessage(expenseReturn.message, expenseReturn.status);
          this.router.navigate(['']);
        },
        error: errorReturn => {
          this.notificationService.errorHandler(errorReturn);
        }
      });
    }
  }

  voltar(){
    this.router.navigateByUrl('');
  }

}
