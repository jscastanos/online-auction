import { NgModule } from "@angular/core";
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { SliderComponent } from './slider/slider.component';
import { CameraComponent } from './camera/camera.component';

@NgModule({
    declarations: [SliderComponent, CameraComponent],
    exports: [SliderComponent, CameraComponent],
    imports: [IonicModule, CommonModule]
})

export class ComponentsModule { }