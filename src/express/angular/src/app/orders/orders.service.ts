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
        return this.http.get(baseUrl + '/orders/' + userID)
            .pipe(map(response => {
                //const parsedResponse = JSON.parse(response.json()) as any[];
                const parsedResponse = response.json();
                //console.log(parsedResponse[0]['id_pedido']);
                return parsedResponse;
            })).toPromise();
    }
}
