import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ProductPickerService } from './product-picker.service';

@Component({
  selector: 'app-product-picker',
  templateUrl: './product-picker.component.html',
  styleUrls: ['./product-picker.component.css']
})

export class ProductPickerComponent implements OnInit {

  // Used to show/not show the loading animation.
  private registeringMedium: boolean = true;
  private waitingForProduct: boolean = true;
  private waitingForPrediction: boolean = false;

  private showStatus: boolean = false; // Show/not show the picked product prediction status.
  private testingPickedProduct: boolean = false;
  private selectingNextProduct: boolean = false;

  private currentProduct; // Holds the product sent by the backend.
  private currentMediumID: string; // ID of the medium currently in use.
  private orderID: string; // ID of the order currently being picked.
  private imageToTest: File = null; // Image that will be sent to the backend.

  // Show product correctly/not correcly chosen.
  private correctlyChosen: boolean = false;
  private notCorrectlyChosen: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private pickerService: ProductPickerService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.orderID = this.route.snapshot.params.order_id;
      this.currentMediumID = this.route.snapshot.params.medium_id;
      this.onOrderAndMediumReceived(this.orderID, this.currentMediumID);
    });
  }

  onOrderAndMediumReceived(orderID: string, mediumID: string) {
    this.registerMedium(orderID, mediumID);
  }

  registerMedium(orderID: string, mediumID: string) {
    if (mediumID == '' || mediumID == undefined || mediumID == null) {
      console.log('Inserte un ID de medio valido.');
    } else {
      // Register medium with backend.
      this.pickerService.registerMedium(orderID, mediumID).then(
        result => {
          if (result.status != 200) {
            // Implement some error here.
          } else {
            // Update mediumID.
            this.currentMediumID = mediumID;
            this.registeringMedium = false;

            // Stop showing image tester <div>s.
            this.testingPickedProduct = false;
            // Show next product <div>s.
            this.selectingNextProduct = true;
            this.nextProduct(orderID);
          }
        }, error => {
          console.log('Error registering medium: ' + error);
        }
      );
    }
  }

  nextProduct(orderID: string) {
    // Ask for next product to backend.
    this.pickerService.nextProduct(orderID).then(
      result => {
        // Stop showing loading symbol.
        this.waitingForProduct = false;
        // Stop showing next product <div>s.
        this.selectingNextProduct = false;
        // Show image tester <div>s.
        this.testingPickedProduct = true;

        // Update current product.
        this.currentProduct = result;
      }, error => {}
    );
  }

  // Activated when the user selects an image.
  onImageSelected(event) {
    this.imageToTest = <File>event.target.files[0];
  }

  // Activated when the user wants to send the image to the server.
  // That is, the user presses the button 'Upload'.
  onUpload() {

    // Reset product picked status.
    this.correctlyChosen = false;
    this.notCorrectlyChosen = false;

    if (this.imageToTest == null) {
      console.log('No image selected');
    } else {
      this.waitingForPrediction = true;

      // Send prediction request.
      const fd: FormData = new FormData();
      fd.append('image', this.imageToTest, this.imageToTest.name);
      
      this.pickerService.sendImage(fd).then(
        result => {
          this.waitingForPrediction = false;
          this.showStatus = true;
          if (result.status == 'MATCH') {
            this.correctlyChosen = true;
            this.selectingNextProduct = true;
          } else {
            this.notCorrectlyChosen = true;
          }
        }, error => {}
      );
    }
  }
}