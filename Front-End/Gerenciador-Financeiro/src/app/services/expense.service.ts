import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Expense } from '../models/expense';


@Injectable({
    providedIn: 'root'
})

export class ExpenseService{
    
    constructor(private httpClient: HttpClient) {
        
    }

    Create(url: string, expense: Expense): Observable<any>{
        return this.httpClient.post<any>(url, expense);
    }

    Update(url: string, expense: Expense): Observable<any>{
        return this.httpClient.put<any>(url, expense);
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