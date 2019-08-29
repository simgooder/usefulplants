import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { PlantService } from '../plant-api.service'

@Component({
    selector: 'app-edit-plant',
    templateUrl: './edit-plant.component.html',
    styleUrls: ['./edit-plant.component.scss']
})
export class EditPlantComponent implements OnInit {

    constructor(
        private plantService : PlantService,
        private router: Router, 
        private route: ActivatedRoute
    ) { }

    public plant:any;

    ngOnInit() {
        
        this.getPlant(this.route.snapshot.params['id']);

    }

    getPlant(id) {
        
        this.plantService.getById(id).subscribe((res) => {

            console.log("Get plant Success: ", res)

            if (res === null) {
                this.router.navigate(['/plants/all']);
            } else {
                this.plant = res;
            }
        
        }, (err) => {
        
            console.log("Get plant Error: ", err);
        
        });

    }

}
