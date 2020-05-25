import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputGroupComponent } from './input-group/input-group.component';
import { SlugifyPipe } from './pipes/slugify.pipe';
import { CamelcasePipe } from './pipes/camelcase.pipe';
import { ToastComponent } from './toast/toast.component';
import { DataElementComponent } from './data-element/data-element.component';
import { InputFieldComponent } from './input-field/input-field.component';
import { RadioFieldComponent } from './radio-field/radio-field.component';
import { SelectFieldComponent } from './select-field/select-field.component';
import { TextareaFieldComponent } from './textarea-field/textarea-field.component';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule
    ],
    exports: [
        InputGroupComponent,
        InputFieldComponent,
        RadioFieldComponent,
        SelectFieldComponent,
        TextareaFieldComponent,
        DataElementComponent,
        SlugifyPipe,
        CamelcasePipe,
        ToastComponent
    ],
    declarations: [InputGroupComponent, InputFieldComponent, RadioFieldComponent, SelectFieldComponent, TextareaFieldComponent, SlugifyPipe, CamelcasePipe, ToastComponent, DataElementComponent],
})
export class SharedModule { }
