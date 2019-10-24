import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ProductPickerService } from './product-picker.service';

@Component({
  selector: 'app-product-picker',
  templateUrl: './product-picker.component.html',
  styleUrls: ['./product-picker.component.css']
})

export class ProductPickerComponent implements OnInit {

  private registeringMedium: boolean = true;
  private waitingForProduct: boolean = true;
  private currentProduct;

  constructor(
    private route: ActivatedRoute,
    private pickerService: ProductPickerService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      var orderID = this.route.snapshot.params.order_id;
      var mediumID = this.route.snapshot.params.medium_id;
      this.onOrderAndMediumReceived(orderID, mediumID);
  });
  }

  onOrderAndMediumReceived(orderID: string, mediumID: string) {
    this.registerMedium(orderID, mediumID);
  }

  registerMedium(orderID: string, mediumID: string) {
    // Register medium with backend.
    this.pickerService.registerMedium(orderID, mediumID).then(
      result => {
        if (result.status != 200) {
          // Implement some error here.
          console.log('here');
        } else {
          console.log('here');
          this.registeringMedium = false;
          this.nextProduct(orderID);
        }
      }, error => {}
    );
  }

  nextProduct(orderID: string) {
    // Ask for next product to backend.
    this.pickerService.nextProduct(orderID).then(
      result => {
        this.waitingForProduct = false;
        this.currentProduct = result;
      }, error => {}
    );
  }

}
