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
    private orders: Array<Object>; // Orders IDs.
    private notShowMediumInputs: Array<boolean>; // Show or not show medium input.
    private mediumIDs: Array<String>; // Medium IDs.
    private userID = null;

    constructor(
        private route: ActivatedRoute,
        private ordersService : OrdersService
    ) {}

    ngOnInit() {
        this.route.paramMap.subscribe(params => {
            this.userID = this.route.snapshot.params.user_id;
            this.onOrdersRequestReceived(this.userID);
        });
    }

    onOrdersRequestReceived(userID: string) {
        //GET /api/orders/id_usuario
        this.ordersService.requestOrders(userID).then(
            result => {
                this.waitingForOrders = false;
                this.orders = result;

                // Initialize mediums arrays.
                this.mediumIDs = new Array(this.orders.length);
                this.notShowMediumInputs = new Array(this.orders.length);

                // Initialize array of booleans.
                for (var i = 0; i < this.orders.length; i++) {
                    this.notShowMediumInputs[i] = true;
                }
            }
        );
    }

    onShowMediumInput(index) {
        // Hide or unhide.
        this.notShowMediumInputs[index] = !this.notShowMediumInputs[index];
        this.setFocusOnInput(index);
    }

    setFocusOnInput(inputIdx) {
        var input = document.getElementById('medium-input-' + inputIdx);
        input.focus();
    }

    obtainMediumID(mediumIndex, mediumID: string) {
        this.mediumIDs[mediumIndex] = mediumID;
    }
}
