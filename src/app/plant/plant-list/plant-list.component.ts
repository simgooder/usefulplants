import { Component, OnInit, ViewChild } from '@angular/core';
import { PlantService } from '../plant-api.service'
import { PlantFilterComponent } from '../plant-filter/plant-filter.component';

@Component({
    selector: 'app-plant-list',
    templateUrl: './plant-list.component.html',
    styleUrls: ['./plant-list.component.scss']
})
export class PlantListComponent implements OnInit {

    public plants:any;
    @ViewChild(PlantFilterComponent) filter;

    constructor(private plantService : PlantService) {}

    // onFilter($event) {
        
    //     this.plantService.filterPlants($event).subscribe((res) => {

    //         console.log("Success: ", res)

    //         this.plants = res;
        
    //     }, (err) => {
        
    //             console.log("Error: ", err);
        
    //     });;

    // }

    ngOnInit() {
        this.getPlants();
    }

  
    getPlants() {
        this.plantService.getAll().subscribe((res) => {

            console.log("Success: ", res)

            this.plants = res;
        
        }, (err) => {
        
                console.log("Error: ", err);
        
        });

  }

}
