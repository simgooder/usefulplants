import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, PreloadAllModules } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule }   from '@angular/forms';

import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';

import { AppComponent } from './app.component';
import { AdminModule } from './admin/admin.module';
import { AuthHeaderInterceptor } from './interceptors/header.interceptor';
import { CatchErrorInterceptor } from './interceptors/http-error.interceptor';

import { AppRoutingModule } from './app-routing/app-routing.module';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { AddPlantComponent } from './plant/add-plant/add-plant.component';
import { PlantListComponent } from './plant/plant-list/plant-list.component';
import { PlantProfileComponent } from './plant/plant-profile/plant-profile.component';
import { EditPlantComponent } from './plant/edit-plant/edit-plant.component';
import { PlantFormComponent } from './plant/plant-form/plant-form.component';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        HomeComponent,
        AddPlantComponent,
        PlantListComponent,
        PlantProfileComponent,
        EditPlantComponent,
        PlantFormComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        RouterModule,
        SharedModule,
        AuthModule,
        AdminModule,
        AppRoutingModule,
        FormsModule
    ],
    providers: [{
        provide: HTTP_INTERCEPTORS,
        useClass: AuthHeaderInterceptor,
        multi: true,
    }, {
        provide: HTTP_INTERCEPTORS,
        useClass: CatchErrorInterceptor,
        multi: true,
    }],
    
    entryComponents: [],
  
    bootstrap: [AppComponent]
})
export class AppModule { }
