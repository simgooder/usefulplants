import { Component, OnInit } from '@angular/core';
import { PlantService } from '../plant-api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-plant-profile',
  templateUrl: './plant-profile.component.html',
  styleUrls: ['./plant-profile.component.scss']
})
export class PlantProfileComponent implements OnInit {

    constructor(
        private plantService : PlantService, 
        private authService : AuthService,
        private route : ActivatedRoute,
        private router : Router
    ) { }

    public plant:any;
    public slug:String = "";
    private user:any;
    public isAdmin = false;

    ngOnInit() {        

        // init this.user on startup
        this.authService.me().subscribe(data => {
            this.user = data.user;
            this.isAdmin = (this.user.roles.indexOf('admin') > -1);
            // console.log(this.user); 
        });

        this.route.params.subscribe(params => {

            this.getPlant(params['id']);

        });

    }

  
    getPlant(id) {

        this.plantService.getById(id).subscribe((res) => {

            this.plant = res;

            this.slug = this.plant.scientificName.replace(" ", "_");
        
        }, (err) => {
        
            console.warn("Error: ", err);
        
        });

    }

    delete(id) {
        this.plantService.delete(id).subscribe((res) => {

            this.router.navigate(['/']);

        }, (err) => {
            console.warn("Error: ", err);
        })
    }

}
