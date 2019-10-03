import { Component,  OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-product-visualizer',
  templateUrl: './product-visualizer.component.html',
  styleUrls: ['./product-visualizer.component.css']
})
export class ProductVisualizerComponent implements OnInit{

  @Input() productImport;
  checker: boolean;

  constructor() { 
  }

  ngOnInit() {
    this.checker = false;
    this.productImport = {};
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
