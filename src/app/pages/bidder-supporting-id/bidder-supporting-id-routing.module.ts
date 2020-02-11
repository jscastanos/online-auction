import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BidderSupportingIdPage } from './bidder-supporting-id.page';

const routes: Routes = [
  {
    path: '',
    component: BidderSupportingIdPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BidderSupportingIdPageRoutingModule { }
