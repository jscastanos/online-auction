import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { AuctionViewPageRoutingModule } from "./auction-view-routing.module";

import { AuctionViewPage } from "./auction-view.page";
import { BidViewPageModule } from "../bid-view/bid-view.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AuctionViewPageRoutingModule,
    BidViewPageModule
  ],
  declarations: [AuctionViewPage]
})
export class AuctionViewPageModule {}
