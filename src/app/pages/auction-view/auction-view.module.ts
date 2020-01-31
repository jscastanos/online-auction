import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AuctionViewPageRoutingModule } from './auction-view-routing.module';

import { AuctionViewPage } from './auction-view.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AuctionViewPageRoutingModule
  ],
  declarations: [AuctionViewPage]
})
export class AuctionViewPageModule {}
