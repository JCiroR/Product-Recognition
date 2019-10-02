import { Component } from '@angular/core';
import { ProductVisualizerComponent } from  "../product-visualizer/product-visualizer.component";

import { ProductLoaderService } from './product-loader.service';

@Component({
    selector: 'app-product-loader',
    templateUrl: './product-loader.component.html',
    styleUrls: ['./product-loader.component.css']
})
export class ProductLoaderComponent{
    
    private pvc:ProductVisualizerComponent = null;

    private selectedImage: File = null;
    

    constructor(private productLoaderService : ProductLoaderService) {
        this.pvc = new ProductVisualizerComponent;
    }

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
        product.then(product=>this.showProduct(product)).catch(err=>console.log(err));
    }

    showProduct(product) {
        if (this.pvc.setJson(product)){ 
                console.log(this.pvc.getJson());
        }
    }
}
