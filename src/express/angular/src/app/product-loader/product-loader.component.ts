import { Component, OnInit } from '@angular/core';

import { ProductLoaderService } from './product-loader.service';

@Component({
    selector: 'app-product-loader',
    templateUrl: './product-loader.component.html',
    styleUrls: ['./product-loader.component.css']
})
export class ProductLoaderComponent implements OnInit {

    private selectedImage: File = null;
    private waitingForPrediction: boolean = false;

    constructor(
        private productLoaderService : ProductLoaderService
    ) {}

    ngOnInit() {
    }

    // Activated when the user selects an image.
    onImageSelected(event) {
        this.selectedImage = <File>event.target.files[0];
    }

    // Activated when the user wants to send the image to the server.
    // That is, the user presses the button 'Upload'.
    onUpload() {
        if (this.selectedImage == null) {
            console.log('No image selected');
        } else {
            this.waitingForPrediction = true;

            // Send prediction request.
            const fd: FormData = new FormData();
            fd.append('image', this.selectedImage, this.selectedImage.name);
            var product = this.productLoaderService.sendImage(fd);
            product.then(product => this.showProduct(product))
                .catch(err => console.log(err));
        }
    }

    showProduct(product) {
        this.waitingForPrediction = false;
        // Show image and information.
        // here...
    }
}
