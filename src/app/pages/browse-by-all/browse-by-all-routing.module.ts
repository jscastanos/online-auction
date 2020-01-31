import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BrowseByAllPage } from './browse-by-all.page';

const routes: Routes = [
  {
    path: '',
    component: BrowseByAllPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BrowseByAllPageRoutingModule {}
