import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/internal/Observable";
import { Revenue } from "../models/revenue";

@Injectable({
    providedIn: 'root'
})

export class RevenueService{
    constructor(private httpClient: HttpClient){}

    Create(url: string, revenue: Revenue): Observable<any>{
        return this.httpClient.post<any>(url, revenue);
    }

    Update(url: string, revenue: Revenue): Observable<any>{
        return this.httpClient.put<any>(url, revenue);
    }

    Delete(url: string, id: string): Observable<any>{
        let newUrl = `${url}/${id}`;
        return this.httpClient.delete<any>(newUrl);
    }

    GetAlls(url: string): Observable<any>{
        return this.httpClient.get<any>(url);
    }

    GetById(url: string, id: string): Observable<any>{
        let newUrl = `${url}/${id}`;
        return this.httpClient.get<any>(newUrl);
    }

}