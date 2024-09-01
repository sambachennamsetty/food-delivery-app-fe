import { Injectable } from "@angular/core";
import { API_URL_ORDER } from "../../constants/url";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class OrderService {

    private apiUrl = API_URL_ORDER + "/order/saveOrder";


    constructor(private http: HttpClient){}

    httpOptions = {
        headers: new HttpHeaders({
            'Content-type':'text/plain',
            'Access-Control-Allow-Origin': 'http://localhost:4200'
        })
    };

    saveOrder(data: any):Observable<any> {
        return this.http.post<any>(this.apiUrl, data);
    }
}