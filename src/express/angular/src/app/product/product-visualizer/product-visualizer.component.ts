import { Component,  OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-product-visualizer',
  templateUrl: './product-visualizer.component.html',
  styleUrls: ['./product-visualizer.component.css']
})
export class ProductVisualizerComponent implements OnInit{

    private withPrediction: boolean = false;
    @Input() product;

  constructor() {
  }

  ngOnInit() {
  }
}
