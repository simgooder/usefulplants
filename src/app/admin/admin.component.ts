import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
})
export class AdminComponent implements OnInit {

    constructor(private http : HttpClient, private authService: AuthService) {}

    private URI = '/user/'

    public users:any;

    public ngOnInit() {

        this.getAll();

    }

    getAll() {

        this.authService.getUsers().subscribe((res) => {

            console.log("Success: ", res)

            this.users = res;
        
        }, (err) => {
        
                console.log("Error: ", err);
        
        });
        
    }


}


