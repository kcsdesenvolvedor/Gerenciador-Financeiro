import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RevenueService } from 'src/app/services/revenue.service';
import { Global } from 'src/shared/Global';

@Component({
  selector: 'app-revenue',
  templateUrl: './revenue.component.html',
  styleUrls: ['./revenue.component.css']
})
export class RevenueComponent implements OnInit {

  revenues: any[] = [];

  constructor(
    private revenueService: RevenueService,
    private router: Router
  ) { }

  async ngOnInit() {
    await this.GetRevenueAlls();
  }

  async GetRevenueAlls(){
    this.revenueService.GetAlls(`${Global.BASE_URL_API}/revenue`).subscribe(value => {
      for (const revenue of value) {
        let orderRevenue = revenue['date'].split('-');
        this.revenues.push({id: revenue['id'], type: 'Entrada', name: revenue['description'], date: revenue['date'], price: revenue['revenueValue'], order: orderRevenue[0]});
      }

      this.revenues.sort(function(a, b){return b.order - a.order});
    });
  }

  OnClick(id: string){
    console.log(id);
  }

  voltar(){
    this.router.navigateByUrl('');
  }

}
