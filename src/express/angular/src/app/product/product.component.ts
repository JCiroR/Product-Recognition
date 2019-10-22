import { Component, OnInit } from '@angular/core';

import { ProductLoaderComponent } from './product-loader/product-loader.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})

export class ProductComponent implements OnInit {

    public visualizePrediction: boolean = false;
    public product;

    constructor() { }

    ngOnInit() {
    }

    onPredictionReceived($event) {
        if ($event === null)
            this.visualizePrediction = false;
        else {
            this.visualizePrediction = true;
            this.product = $event;
        }
    }

}
