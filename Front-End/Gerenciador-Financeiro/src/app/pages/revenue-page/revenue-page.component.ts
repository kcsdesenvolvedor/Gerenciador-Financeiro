import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Revenue } from 'src/app/models/revenue';
import { AlertNotificationService } from 'src/app/services/alertNotification.service';
import { RevenueService } from 'src/app/services/revenue.service';
import { Global } from 'src/shared/Global';

@Component({
  selector: 'app-revenue-page',
  templateUrl: './revenue-page.component.html',
  styleUrls: ['./revenue-page.component.css']
})
export class RevenuePageComponent implements OnInit {

  revenue: Revenue;
  data: any;
  revenueForm: FormGroup;

  constructor(
    private router: Router,
    private revenueService: RevenueService,
    private notificationService: AlertNotificationService
  ) {
    const nav = this.router.getCurrentNavigation();
    this.data = nav.extras.state;
   }

  ngOnInit(): void {
    this.createForm();
    this.revenueForm.setValue(this.data.revenue);
    this.revenue = this.data.revenue;
  }

  createForm(){
    this.revenueForm = new FormGroup({
      id: new FormControl(),
      description: new FormControl(),
      date: new FormControl({value: '', disabled: true}),
      revenueValue: new FormControl()
    })
  }

  updateRevenue(){
    if (this.revenueForm.valid) {
      this.revenue = Object.assign({}, this.revenueForm.value);
      this.revenueService.Update(`${Global.BASE_URL_API}/revenue`, this.revenue).subscribe({
        next: revenueReturn => {
          this.notificationService.showMessage(revenueReturn.message, revenueReturn.status);
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
