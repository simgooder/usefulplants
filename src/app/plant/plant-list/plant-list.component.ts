import { Component, OnInit } from '@angular/core';
import { PlantService } from '../plant-api.service'

@Component({
    selector: 'app-plant-list',
    templateUrl: './plant-list.component.html',
    styleUrls: ['./plant-list.component.scss']
})
export class PlantListComponent implements OnInit {

    constructor(private plantService : PlantService) { }

    public plants:any;

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
