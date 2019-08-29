import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-input-group',
    templateUrl: './input-group.component.html',
    styleUrls: ['./input-group.component.scss']
})

export class InputGroupComponent implements OnInit {

    @Input() label:string;
    @Input() description:string;
    @Input() required:boolean = false;
    @Input() class:string;

    constructor() { }

    ngOnInit() {
    }

}

