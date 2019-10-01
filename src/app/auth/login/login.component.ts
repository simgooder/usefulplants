import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import {AuthService} from '../auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['../auth.component.scss']
})

export class LoginComponent implements OnInit {

    constructor(private authService: AuthService, private router: Router) { }

    ngOnInit() {}

    login(email, password): void {

        this.authService.login(email, password)
        .subscribe(data => {
            this.router.navigate(['']);
        })
    }

}
