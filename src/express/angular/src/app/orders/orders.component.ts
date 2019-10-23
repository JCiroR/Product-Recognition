import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { OrdersService } from './orders.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

    private waitingForOrders: boolean = true;
    private orders: Array<Object>;

    constructor(
        private route: ActivatedRoute,
        private ordersService : OrdersService
    ) {}

    ngOnInit() {
        this.route.paramMap.subscribe(params => {
            var userID = this.route.snapshot.params.user_id;
            this.onOrdersRequestReceived(userID);
        });
    }

    onOrdersRequestReceived(userID: string) {
        //GET /api/orders/id_usuario
        var orders = this.ordersService.requestOrders(userID).then(
            result => {
                this.visualizeOrders(result);
            }
        );
    }

    visualizeOrders(orders) {
        this.waitingForOrders = false;
        this.orders = orders;
        console.log(this.orders);
    }
}
