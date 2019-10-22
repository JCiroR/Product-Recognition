import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { OrdersService } from './orders.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

    public waitingForOrders: boolean = true;

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
        //GET /api/orders id_usuario: userID
        var orders = this.ordersService.requestOrders(userID);
    }

    onOrdersReceived($event) {
        this.waitingForOrders = false;
        this.listOrders($event);
    }

    listOrders(orders) {}
}
