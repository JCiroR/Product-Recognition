import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { ProductLoaderService } from './product-loader.service';
import { ProductVisualizerComponent } from  "../product-visualizer/product-visualizer.component";

@Component({
    selector: 'app-product-loader',
    templateUrl: './product-loader.component.html',
    styleUrls: ['./product-loader.component.css']
})
export class ProductLoaderComponent implements OnInit {

    @Output() predictionReceivedEvent = new EventEmitter<any>();
    private selectedImage: File = null;
    public waitingForPrediction: boolean = false;

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
            this.predictionReceivedEvent.emit(null);

            // Send prediction request.
            const fd: FormData = new FormData();
            fd.append('image', this.selectedImage, this.selectedImage.name);
            var product = this.productLoaderService.sendImage(fd);
            product.then(product => {
                this.showProduct(product);
            })
            .catch(err => console.log(err));
        }
    }

    showProduct(product) {
        // Hide loading spinner.
        this.waitingForPrediction = false;
        this.predictionReceivedEvent.emit(product);
    }
}
