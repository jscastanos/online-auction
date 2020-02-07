import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AppLayoutComponent } from './layout/app-layout/app-layout.component';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';

const routes: Routes = [

  //APP
  {
    path: '',
    component: AppLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
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
    ]
  },

  //AUTH
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'register',
        loadChildren: () => import('./auth/register/register.module').then(m => m.RegisterPageModule)
      },
      {
        path: 'login',
        loadChildren: () => import('./auth/login/login.module').then(m => m.LoginPageModule)
      },
      {
        path: 'getting-started',
        loadChildren: () => import('./auth/getting-started/getting-started.module').then(m => m.GettingStartedPageModule)
      },
    ]
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
