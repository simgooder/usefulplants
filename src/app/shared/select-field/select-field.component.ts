
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-select-field',
    templateUrl: './select-field.component.html',
    styleUrls: ['./select-field.component.scss']
})
export class SelectFieldComponent implements OnInit {

    @Output() inputModelChange = new EventEmitter<string>();

    @Input() inputModel: any;

    @Input() name: string = "";
    @Input() default: string; 
    @Input() required: boolean = false;
    @Input() options: any = ""; // comma-separated values, plz


    constructor() { }

    ngOnInit() {
        // strip out spaces and separate by commas...
        this.options = this.options.replace(/\s/g, '').split(",");
    }

}
