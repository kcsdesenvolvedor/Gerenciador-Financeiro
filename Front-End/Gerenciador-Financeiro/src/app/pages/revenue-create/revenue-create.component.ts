import { formatDate } from '@angular/common';
import { Component, createPlatform, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Revenue } from 'src/app/models/revenue';
import { AlertNotificationService } from 'src/app/services/alertNotification.service';
import { RevenueService } from 'src/app/services/revenue.service';
import { Global } from 'src/shared/Global';

@Component({
  selector: 'app-revenue-create',
  templateUrl: './revenue-create.component.html',
  styleUrls: ['./revenue-create.component.css']
})
export class RevenueCreateComponent implements OnInit {

  revenueForm: FormGroup;
  revenue: Revenue;
  dateRevenue: string;

  constructor(
    private revenueService: RevenueService,
    private router: Router,
    private notificationService: AlertNotificationService
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(){
    this.revenueForm = new FormGroup({
      description: new FormControl(),
      date: new FormControl(),
      revenueValue: new FormControl()
    })
  }

  createRevenue(){
    if (this.revenueForm.valid) {
      this.revenue = Object.assign({}, this.revenueForm.value);
      this.revenue.date = this.dateRevenue;
      this.revenueService.Create(`${Global.BASE_URL_API}/revenue`, this.revenue).subscribe({
        next: revenueReturn => {
          this.notificationService.showMessage(revenueReturn.message, revenueReturn.status);
          this.router.navigate(['']);
        },
        error: errorReturn => {
          this.notificationService.errorHandler(errorReturn);
          this.router.navigate(['']);
        }
      });
    }

  }

  formatDate(date: any){
    let newDate = date.value.replaceAll('/', '-');
    this.dateRevenue = newDate;
  }

  cancel(){
    this.router.navigateByUrl('');
  }

}
