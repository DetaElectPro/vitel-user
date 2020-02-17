import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./Pages/tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'requests',
    loadChildren: () => import('./Pages/requests/requests.module').then( m => m.RequestsPageModule)
  },
  {
    path: 'history',
    loadChildren: () => import('./Pages/history/history.module').then( m => m.HistoryPageModule)
  },
  {
    path: 'request-details/:id',
    loadChildren: () => import('./Pages/request-details/request-details.module').then( m => m.RequestDetailsPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./Pages/Auth/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./Pages/Auth/register/register.module').then( m => m.RegisterPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
