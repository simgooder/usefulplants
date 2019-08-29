import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputGroupComponent } from './input-group/input-group.component';
import { SlugifyPipe } from './pipes/slugify.pipe';
import { CamelcasePipe } from './pipes/camelcase.pipe';
import { ToastComponent } from './toast/toast.component';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule
    ],
    exports: [
        InputGroupComponent,
        SlugifyPipe,
        CamelcasePipe,
        ToastComponent
    ],
    declarations: [InputGroupComponent, SlugifyPipe, CamelcasePipe, ToastComponent],
})
export class SharedModule { }
