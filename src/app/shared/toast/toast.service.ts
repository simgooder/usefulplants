import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class ToastService {

    private msgEvent = new Subject<any>();
    // private text = new Subject<string>();
    // private active = new Subject<string>();

    msg$ = this.msgEvent.asObservable();
    // text$ = this.text.asObservable();
    // active$ = this.active.asObservable();   

    // constructor() { }

    show(type, msg, timeout) {

        this.broadcast(
            {
                type: type,
                message: msg,
                timeout: timeout
            }
        )
    }

    broadcast(data: any) {

        this.msgEvent.next(data);

    }

}
