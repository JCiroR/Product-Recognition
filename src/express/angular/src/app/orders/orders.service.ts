import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators';

import { baseUrl } from '../base-url';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

    constructor(
        private http: Http
    ) {}

    requestOrders(userID: string) {
        var res = this.http.get(baseUrl + '/orders/' + userID)
            .pipe(map(data => data.json())).toPromise();
    }
}
