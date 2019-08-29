import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.scss']
})

export class InputFieldComponent implements OnInit {

    @Output() inputModelChange = new EventEmitter<string>();

    @Input() inputModel: any;

    @Input() min:number;
    @Input() max:number;
    
    @Input() fieldType:string = 'text';
    @Input() name:string = "";
    @Input() default:string = "";
    @Input() placeholder:string = "";
    @Input() required:boolean = false;


    constructor() { }

    ngOnInit() {
    }

}

