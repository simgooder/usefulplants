import { Component, OnInit } from '@angular/core';
import { ToastService } from './toast.service';

@Component({
    selector: 'app-toast',
    templateUrl: './toast.component.html',
    styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements OnInit {

    public active = false;
    public msg:string;
    public type:string;
    public timeout:number = 2500;

    // Types ----
    // 0 = neutral
    // 1 = success
    // 2 = warning

    constructor(
        private toastService: ToastService
    ) { }

    ngOnInit() { 

        this.toastService.msg$.subscribe( (data) => {
            this.show(data.type, data.message, data.timeout);
        })

    }


    show(type, msg, timeout) {

        this.msg = msg;
        this.timeout = timeout;

        if (type === 0) {this.type = "neutral"}
        if (type === 1) {this.type = "success"}
        if (type === 2) {this.type = "warning"}


        if (timeout === 0 || timeout === null) {
            timeout = 3500;
        } else {
            timeout = timeout;
        }

        this.active = true;

        setTimeout(() => {
            this.hide();
        }, timeout);
        
    }

    hide() {
        this.active = false;
    }
    

}
