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
import { OrdersComponent } from './orders/orders.component';
import { UserIdentifierComponent } from './user-identifier/user-identifier.component';
import { ProductPickerComponent } from './product-picker/product-picker.component';
import { ProductPickerService } from './product-picker/product-picker.service';

const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'product', component: ProductComponent },
    { path: 'user', component: UserIdentifierComponent },
    { path: "orders/:user_id", component: OrdersComponent },
    { path: "picker/:user_id/:order_id/:medium_id", component: ProductPickerComponent }
  ];

@NgModule({
    declarations: [
        AppComponent,
        ProductLoaderComponent,
        HomeComponent,
        ProductVisualizerComponent,
        ProductComponent,
        OrdersComponent,
        UserIdentifierComponent,
        ProductPickerComponent
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
        ProductLoaderService,
        ProductPickerService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
