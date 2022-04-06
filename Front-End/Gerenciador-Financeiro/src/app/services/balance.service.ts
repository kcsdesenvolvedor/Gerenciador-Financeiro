import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class BalanceService{
    constructor(private httpClient: HttpClient){}

    GetCurrentBalance(url: string): Observable<any>{
        return this.httpClient.get<any>(url);
    }
}