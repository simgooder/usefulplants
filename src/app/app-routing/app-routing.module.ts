import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth-guard.service';
import { HomeComponent } from '../home/home.component';
import { AddPlantComponent } from '../plant/add-plant/add-plant.component'
import { PlantListComponent } from '../plant/plant-list/plant-list.component';
import { PlantProfileComponent } from '../plant/plant-profile/plant-profile.component';
import { EditPlantComponent } from '../plant/edit-plant/edit-plant.component';


const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    }, 
    {
        path: 'auth',
        loadChildren: 'app/auth/auth.module#AuthModule'
    }, 
    {
        path: 'admin',
        loadChildren: 'app/admin/admin.module#AdminModule'
    },

    {
        path: 'plants/add',
        component: AddPlantComponent
    },
    {
        path: 'plants/all',
        component: PlantListComponent
    },
    {
        path: 'plants/:id',
        component: PlantProfileComponent
    },
    {
        path: 'plants/edit/:id',
        component: EditPlantComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: [AuthGuard],
    declarations: []
})

export class AppRoutingModule {}
