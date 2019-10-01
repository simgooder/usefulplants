import { Component, OnInit, Input } from '@angular/core';
import { PlantService } from '../plant-api.service';
import { Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-plant-profile',
  templateUrl: './plant-profile.component.html',
  styleUrls: ['./plant-profile.component.scss']
})
export class PlantProfileComponent implements OnInit {


    constructor(
        private plantService : PlantService, 
        private route: ActivatedRoute,
        private router: Router
    ) { }

    public plant:any;

    ngOnInit() {

        this.route.params.subscribe(params => {

            this.getPlant(params['id']);

        });

    }

  
    getPlant(id) {

        this.plantService.getById(id).subscribe((res) => {

            this.plant = res;
        
        }, (err) => {
        
            console.warn("Error: ", err);
        
        });

    }

    delete(id) {
        this.plantService.delete(id).subscribe((res) => {

            this.router.navigate(['/plants/all']);

        }, (err) => {
            console.warn("Error: ", err);
        })
    }

}
