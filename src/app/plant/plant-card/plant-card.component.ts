import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-plant-card',
    templateUrl: './plant-card.component.html',
    styleUrls: ['./plant-card.component.scss']
})
export class PlantCardComponent implements OnInit {

    @Input() private plant;

    public slug:String = "";

    constructor() { }

    ngOnInit() {
        // this.slug = encodeURI(this.plant.scientificName);
        this.slug = this.plant.scientificName.replace(" ", "_");
    }

}
