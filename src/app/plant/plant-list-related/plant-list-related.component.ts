import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { PlantService } from '../plant-api.service';

@Component({
    selector: 'app-plant-list-related',
    templateUrl: './plant-list-related.component.html',
    styleUrls: ['./plant-list-related.component.scss']
})
export class PlantListRelatedComponent implements OnInit, OnChanges {

    @Input() private reference; 
    @Input() private categories;
    @Input() private limit = 3;

    public plants = [];

    constructor(
        private service : PlantService
    ) { }


    ngOnInit() {

        this.fetchRelatedPlants();

    }

    ngOnChanges(changes) {
        this.fetchRelatedPlants();
    }

    fetchRelatedPlants() {
        this.service.getById(this.reference).subscribe( (referencePlant) => {

            let property = this.getValueByPath(referencePlant, this.categories);

            console.log("PROPERTY: ", property)
            
            if (typeof(property) == "object" && property.length > 1) {
                property = property[0];
            }
            
            this.service.getRelated(this.categories,
                                    property,
                                    this.limit,
                                    this.reference
                                    )
                                    .subscribe( (relatedPlants) => {

                this.plants = relatedPlants;

            })

        }, (err) => {
            console.log("Get plant error: ", err)
        })
    }


    // Util to pass variables as nested object notation
    // example: var1.var2nested
    // https://stackoverflow.com/questions/54526127/access-nested-property-by-path
    getValueByPath = (obj, path) =>
    path.split('.').reduce((acc, part) => acc ? acc[part] : undefined, obj);

}
