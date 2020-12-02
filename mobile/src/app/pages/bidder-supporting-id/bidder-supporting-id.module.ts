import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BidderSupportingIdPageRoutingModule } from './bidder-supporting-id-routing.module';

import { BidderSupportingIdPage } from './bidder-supporting-id.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    BidderSupportingIdPageRoutingModule
  ],
  declarations: [BidderSupportingIdPage]
})
export class BidderSupportingIdPageModule { }
