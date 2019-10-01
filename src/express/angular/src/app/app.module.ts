import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpModule } from '@angular/http';

import { ProductLoaderComponent } from './product-loader/product-loader.component';
import { ProductLoaderService } from './product-loader/product-loader.service';

import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

const appRoutes: Routes = [
    { path: 'product-loader', component: ProductLoaderComponent },
    { path: '', component: HomeComponent}
  ];

@NgModule({
    declarations: [
        AppComponent,
        ProductLoaderComponent,
        HomeComponent
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
