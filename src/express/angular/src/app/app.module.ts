import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpModule } from '@angular/http';

import { ProductLoaderComponent } from './product-loader/product-loader.component';
import { ProductLoaderService } from './product-loader/product-loader.service';

@NgModule({
    declarations: [
        AppComponent,
        ProductLoaderComponent
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
