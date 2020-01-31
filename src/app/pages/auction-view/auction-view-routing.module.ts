import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuctionViewPage } from './auction-view.page';

const routes: Routes = [
  {
    path: '',
    component: AuctionViewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuctionViewPageRoutingModule {}
