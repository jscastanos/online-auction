import { NgModule } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { CommonModule } from "@angular/common";
import { SliderComponent } from "./slider/slider.component";

@NgModule({
  declarations: [SliderComponent],
  exports: [SliderComponent],
  imports: [IonicModule, CommonModule]
})
export class ComponentsModule {}
