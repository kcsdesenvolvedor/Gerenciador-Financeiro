import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { ExpenseComponent } from './components/expense/expense.component';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppRoutingModule } from './app-routing.module';
import { RevenueComponent } from './components/revenue/revenue.component';
import { FeatherModule } from 'angular-feather';
import { Camera, Heart, Github, Trash, ArrowLeftCircle, Plus, X } from 'angular-feather/icons';
import { NgbDropdownModule, NgbDatepickerModule  } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MatCommonModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ExpensePageComponent } from './pages/expense-page/expense-page.component';
import { RevenuePageComponent } from './pages/revenue-page/revenue-page.component';
import { DialogComponent } from './pages/home/dialog.component';
import { ExpenseCreateComponent } from './pages/expense-create/expense-create.component';
import { CurrencyMaskConfig, CurrencyMaskModule, CURRENCY_MASK_CONFIG } from "ng2-currency-mask";
import { RevenueCreateComponent } from './pages/revenue-create/revenue-create.component';
import { LoadComponent } from './pages/load/load.component';

const icons = {
  Camera,
  Heart,
  Github,
  Trash,
  ArrowLeftCircle,
  Plus,
  X
};

export const CustomCurrencyMaskConfig: CurrencyMaskConfig = {
  align: "right",
  allowNegative: true,
  decimal: ",",
  precision: 2,
  prefix: "R$ ",
  suffix: "",
  thousands: "."
};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ExpenseComponent,
    RevenueComponent,
    ExpensePageComponent,
    RevenuePageComponent,
    DialogComponent,
    ExpenseCreateComponent,
    RevenueCreateComponent,
    LoadComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FontAwesomeModule,
    AppRoutingModule,
    FeatherModule.pick(icons),
    NgbDropdownModule,
    NgbDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
    DropDownListModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCommonModule,
    MatInputModule,
    MatCardModule,
    MatDialogModule,
    MatIconModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatSnackBarModule,
    CurrencyMaskModule,
    MatProgressSpinnerModule
  ],
  exports:[FeatherModule],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'pt-Br' },
    { provide: CURRENCY_MASK_CONFIG, useValue: CustomCurrencyMaskConfig }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(/* library: FaIconLibrary */) {
    library.add();
    /* library.addIcons(
      faSquare,
      faCheckSquare,
      farSquare,
      farCheckSquare,
      faStackOverflow,
      faGithub,
      faMedium,
      faCoffee,
      faTrash,
      faArrowLeft
    ); */
  }
}
