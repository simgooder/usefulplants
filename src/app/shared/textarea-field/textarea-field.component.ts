import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-textarea-field',
  templateUrl: './textarea-field.component.html',
  styleUrls: ['./textarea-field.component.scss']
})
export class TextareaFieldComponent implements OnInit {

    @Output() inputModelChange = new EventEmitter<string>();

    @Input() inputModel: any;
    @Input() name:string = "";
    @Input() default:string = "";
    @Input() required:boolean = false;


    constructor() { }

    ngOnInit() {
    }

}
