import { Injectable } from '@angular/core';

import { Http } from '@angular/http';
import { map } from 'rxjs/operators';

import { baseUrl } from '../../base-url';

@Injectable({
  providedIn: 'root'
})
export class ProductLoaderService {

    constructor(
        private http: Http
    ) {}

    sendImage(image) {
        var res = this.http.post(baseUrl + '/validate_photo', image)
            .pipe(map(data => data.json())).toPromise();
        return res;
    }
}
