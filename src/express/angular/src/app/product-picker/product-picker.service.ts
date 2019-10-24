import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators';

import { baseUrl } from '../base-url';

@Injectable({
  providedIn: 'root'
})
export class ProductPickerService {

  constructor(
    private http: Http
  ) { }

  registerMedium(orderID: string, mediumID: string) {
    return this.http.post(baseUrl + '/new_medium', { 'id_pedido': orderID, 'nuevo_medio': mediumID})
        .pipe(map(response => {
          console.log('here');
          return response.json();
        })).toPromise();
  }

  nextProduct(orderID: string) {
    return this.http.get(baseUrl + '/next_product/' + orderID)
      .pipe(map(response => {
        return response.json();
      })).toPromise();
  }
}
