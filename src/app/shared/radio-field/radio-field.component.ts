import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-radio-field',
    templateUrl: './radio-field.component.html',
    styleUrls: ['./radio-field.component.scss']
})
export class RadioFieldComponent implements OnInit {
    
    @Output() inputModelChange = new EventEmitter<string>();

    @Input() inputModel: any;

    @Input() name: string = "";
    @Input() valueTrue: Boolean = true;
    @Input() valueFalse: Boolean = false;

    @Input() default: Boolean = false;
    @Input() labelTrue: string = "Yes";
    @Input() labelFalse: string = "No";


    constructor() { }

    ngOnInit() {
    }

}
