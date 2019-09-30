import { Injectable } from '@angular/core';

import { Http } from '@angular/http';

import { baseUrl } from '../base-url';

@Injectable({
  providedIn: 'root'
})
export class ProductLoaderService {

    constructor(
        private http: Http
    ) {}

    sendImage(image) {
        console.log(image.get('image'));
        return this.http.post(baseUrl + '/image', image)
            .subscribe(res => {
                console.log(res);
            });
    }
}
