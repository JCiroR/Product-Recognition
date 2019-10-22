import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-user-identifier',
    templateUrl: './user-identifier.component.html',
    styleUrls: ['./user-identifier.component.css']
})
export class UserIdentifierComponent implements OnInit {

    @Output() requestOrdersEvent = new EventEmitter<any>();
    private userID: string;

    constructor() {}

    ngOnInit() {
    }

    focusoutHandler(id: string) {
        this.userID = id;
    }

    onViewOrders() {
        console.log(this.userID);
        this.requestOrdersEvent.emit(this.userID);
    }
}
