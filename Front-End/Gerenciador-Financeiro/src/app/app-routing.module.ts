import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; // CLI imports router
import { ExpenseComponent } from './components/expense/expense.component';
import { RevenueComponent } from './components/revenue/revenue.component';
import { ExpenseCreateComponent } from './pages/expense-create/expense-create.component';
import { ExpensePageComponent } from './pages/expense-page/expense-page.component';
import { HomeComponent } from './pages/home/home.component';
import { LoadComponent } from './pages/load/load.component';
import { RevenueCreateComponent } from './pages/revenue-create/revenue-create.component';
import { RevenuePageComponent } from './pages/revenue-page/revenue-page.component';

const routes: Routes = [
    
    {path: '', component: HomeComponent},
    {path: 'expense', component: ExpenseComponent},
    {path: 'revenue', component: RevenueComponent},
    {path: 'expensePage', component: ExpensePageComponent},
    {path: 'revenuePage', component: RevenuePageComponent},
    {path: 'expenseCreate', component: ExpenseCreateComponent},
    {path: 'revenueCreate', component: RevenueCreateComponent},
    {path: 'load', component: LoadComponent}
    
]; // sets up routes constant where you define your routes

// configures NgModule imports and exports
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }