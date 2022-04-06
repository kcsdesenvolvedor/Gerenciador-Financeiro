import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class DemonstrativeService{
    constructor(private httpClient: HttpClient){}

    GetAlls(url: string): Observable<any>{
        return this.httpClient.get<any>(url);
    }

    GetInterval(url: string, interval1: string, interval2: string): Observable<any>{
        let newUrl = `${url}/${interval1}/${interval2}`;
        return this.httpClient.get<any>(newUrl);
    }
}