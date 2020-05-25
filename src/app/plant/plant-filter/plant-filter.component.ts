import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-plant-filter',
  templateUrl: './plant-filter.component.html',
  styleUrls: ['./plant-filter.component.scss']
})
export class PlantFilterComponent implements OnInit {

    @Output() sendFilters = new EventEmitter<any>();

    public data = [];

    constructor() { }

    ngOnInit() {
    }

    submitFilters(form: NgForm) {

        this.sendFilters.emit(form.value);
        
    }

}
