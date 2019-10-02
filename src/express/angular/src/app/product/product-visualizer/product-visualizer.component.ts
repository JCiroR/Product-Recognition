import { Component,  OnInit } from '@angular/core';

@Component({
  selector: 'app-product-visualizer',
  templateUrl: './product-visualizer.component.html',
  styleUrls: ['./product-visualizer.component.css']
})
export class ProductVisualizerComponent implements OnInit{


  productImport = null;
  checker: boolean;

  constructor() { 
  }

  ngOnInit() {
    this.checker = false;
    console.log("maldita sea");
  }

  setJson(product){
    this.productImport = product;
    this.checker = true;
    return true;
  }

  getJson(){
    console.log(this.checker);
    return this.productImport;
  }

  

}
