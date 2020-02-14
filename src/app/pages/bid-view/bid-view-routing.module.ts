import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BidViewPage } from './bid-view.page';

const routes: Routes = [
  {
    path: '',
    component: BidViewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BidViewPageRoutingModule {}
