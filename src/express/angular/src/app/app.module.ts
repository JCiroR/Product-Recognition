import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpModule } from '@angular/http';

import { ProductLoaderComponent } from './product/product-loader/product-loader.component';
import { ProductLoaderService } from './product/product-loader/product-loader.service';
import { ProductVisualizerComponent } from './product/product-visualizer/product-visualizer.component';
import { ProductComponent } from './product/product.component';

import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

const appRoutes: Routes = [
    { path: 'product', component: ProductComponent },
    { path: '', component: HomeComponent}
  ];

@NgModule({
    declarations: [
        AppComponent,
        ProductLoaderComponent,
        HomeComponent,
        ProductVisualizerComponent,
        ProductComponent
    ],
    imports: [
        RouterModule.forRoot(
            appRoutes
        ),
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
