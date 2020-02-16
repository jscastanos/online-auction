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
        loadChildren: () => import('./pages/list/list.module').then(m => m.ListPageModule)
      },
      {
        path: 'company-view',
        loadChildren: () => import('./pages/company-view/company-view.module').then(m => m.CompanyViewPageModule)
      },
      {
        path: 'category-view',
        loadChildren: () => import('./pages/category-view/category-view.module').then(m => m.CategoryViewPageModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('./pages/profile/profile.module').then(m => m.ProfilePageModule)
      },
      {
        path: 'item-view',
        loadChildren: () => import('./pages/item-view/item-view.module').then(m => m.ItemViewPageModule)
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
      {
        path: 'terms-and-conditions',
        loadChildren: () => import('./pages/terms-and-conditions/terms-and-conditions.module').then(m => m.TermsAndConditionsPageModule)
      },
      {
        path: 'bidder-supporting-id',
        loadChildren: () => import('./pages/bidder-supporting-id/bidder-supporting-id.module').then(m => m.BidderSupportingIdPageModule)
      },

    ]
  },
  {
    path: 'bid-view',
    loadChildren: () => import('./pages/bid-view/bid-view.module').then(m => m.BidViewPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
