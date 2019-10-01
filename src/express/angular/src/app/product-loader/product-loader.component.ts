import { Component, OnInit } from '@angular/core';

import { ProductLoaderService } from './product-loader.service';

@Component({
    selector: 'app-product-loader',
    templateUrl: './product-loader.component.html',
    styleUrls: ['./product-loader.component.css']
})
export class ProductLoaderComponent implements OnInit {

    selectedImage: File = null;

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
        const fd: FormData = new FormData();
        fd.append('image', this.selectedImage, this.selectedImage.name);
        var product = this.productLoaderService.sendImage(fd);
        product.then(product => console.log(product))
            .catch(err => console.log(err));
    }
}
