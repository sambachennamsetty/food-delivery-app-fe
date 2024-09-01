import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { throwError, Observable } from "rxjs";
import { catchError } from "rxjs/operators";
import { API_URL_RESTAURANT_LISTING } from "../../constants/url";


@Injectable({
    providedIn: 'root'
})
export class RestaurantService {

    private apiUrl = API_URL_RESTAURANT_LISTING + '/restaurant/fetchAllRestaurants';

    constructor(private http: HttpClient) {

    }

    getAllRestaurants(): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}`)
        .pipe(
            catchError(this.handleError)
        );
    }

    private handleError(error: any){
        console.error('An error occured:', error);
        return throwError(error.message || error);
    }
    
}