import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'list',
    loadChildren: () => import('./list/list.module').then(m => m.ListPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./auth/register/register.module').then(m => m.RegisterPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./auth/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'search-result',
    loadChildren: () => import('./pages/search-result/search-result.module').then(m => m.SearchResultPageModule)
  },
  {
    path: 'company-view',
    loadChildren: () => import('./pages/company-view/company-view.module').then(m => m.CompanyViewPageModule)
  },
  {
    path: 'auction-view',
    loadChildren: () => import('./pages/auction-view/auction-view.module').then(m => m.AuctionViewPageModule)
  }, {
    path: 'browse-by-all',
    loadChildren: () => import('./pages/browse-by-all/browse-by-all.module').then(m => m.BrowseByAllPageModule)
  },
  {
    path: 'category-view',
    loadChildren: () => import('./pages/category-view/category-view.module').then(m => m.CategoryViewPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
