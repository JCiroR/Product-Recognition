import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpModule } from '@angular/http';

import { ProductLoaderComponent } from './product/product-loader/product-loader.component';
import { ProductLoaderService } from './product/product-loader/product-loader.service';
import { ProductVisualizerComponent } from './product/product-visualizer/product-visualizer.component';
import { ProductComponent } from './product/product.component';

@NgModule({
    declarations: [
        AppComponent,
        ProductLoaderComponent,
        ProductVisualizerComponent,
        ProductComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpModule
    ],
    providers: [
        ProductLoaderService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
