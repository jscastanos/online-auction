import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { BidViewPageRoutingModule } from "./bid-view-routing.module";

import { BidViewPage } from "./bid-view.page";
@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, BidViewPageRoutingModule],
  declarations: [BidViewPage]
})
export class BidViewPageModule {}
