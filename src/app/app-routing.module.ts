import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {AuthGuard} from './guard/auth.guard';

const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./Pages/tabs/tabs.module').then(m => m.TabsPageModule), canActivate: [AuthGuard]
    },
    {
        path: 'requests',
        loadChildren: () => import('./Pages/request-specialists-pages/requests/requests.module').then(m => m.RequestsPageModule)
    },
    {
        path: 'history',
        loadChildren: () => import('./Pages/request-specialists-pages/history/history.module').then(m => m.HistoryPageModule)
    },
    {
        path: 'request-details/:id',
        loadChildren: () => import('./Pages/request-specialists-pages/request-details/request-details.module')
            .then(m => m.RequestDetailsPageModule)
    },
    {
        path: 'login',
        loadChildren: () => import('./Pages/user-pages/login/login.module').then(m => m.LoginPageModule)
    },
    {
        path: 'register',
        loadChildren: () => import('./Pages/user-pages/register/register.module').then(m => m.RegisterPageModule)
    },
    {
        path: 'ambulance',
        loadChildren: () => import('./Pages/ambulance-pages/ambulance/ambulance.module').then(m => m.AmbulancePageModule)
    },
    {
        path: 'medical-board',
        loadChildren: () => import('./Pages/user-pages/medical-board/medical-board.module').then(m => m.MedicalBoardPageModule)
    },
    {
        path: 'emergency-pages-request',
        loadChildren: () => import('./Pages/emergency-pages/request/request.module').then(m => m.RequestPageModule)
    },
    {
        path: 'emergency-pages-history',
        loadChildren: () => import('./Pages/emergency-pages/history/history.module').then(m => m.HistoryPageModule)
    },
    {
        path: 'ambulance-history',
        loadChildren: () => import('./Pages/ambulance-pages/ambulance-history/ambulance-history.module')
            .then(m => m.AmbulanceHistoryPageModule)
    },
    {
        path: 'ambulance-details/:id',
        loadChildren: () => import('./Pages/ambulance-pages/ambulance-details/ambulance-details.module')
            .then(m => m.AmbulanceDetailsPageModule)
    },
    {
        path: 'emergency-details/:id',
        loadChildren: () => import('./Pages/emergency-pages/emergency-details/emergency-details.module')
            .then(m => m.EmergencyDetailsPageModule)
    },
    {
        path: 'blog',
        loadChildren: () => import('./Pages/Blog-pages/blog/blog.module').then(m => m.BlogPageModule)
    },
    {
        path: 'blog-details/:id',
        loadChildren: () => import('./Pages/Blog-pages/blog-details/blog-details.module').then(m => m.BlogDetailsPageModule)
    },
    {
        path: 'find-pharmacy',
        loadChildren: () => import('./Pages/pharmacy-pages/find-pharmacy/find-pharmacy.module').then(m => m.FindPharmacyPageModule)
    },
    {
        path: 'pharmacy',
        loadChildren: () => import('./Pages/pharmacy-pages/pharmacy/pharmacy.module').then(m => m.PharmacyPageModule)
    },
    {
        path: 'pharmacy-details/:id',
        loadChildren: () => import('./Pages/pharmacy-pages/pharmacy-details/pharmacy-details.module')
            .then(m => m.PharmacyDetailsPageModule)
    },
    {
        path: 'pharmacy-history',
        loadChildren: () => import('./Pages/pharmacy-pages/history/history.module').then(m => m.HistoryPageModule)
    },
    {
        path: 'accept-pharmacy',
        loadChildren: () => import('./Pages/pharmacy-pages/accep-pharmacy/accep-pharmacy.module')
            .then(m => m.AccepPharmacyPageModule)
    },
    {
        path: 'password-reset',
        loadChildren: () => import('./Pages/user-pages/password-reset/password-reset.module').then(m => m.PasswordResetPageModule)
    },
    {
        path: 'account-type',
        loadChildren: () => import('./Pages/user-pages/account-type/account-type.module').then(m => m.AccountTypePageModule)
    },
    {
        path: 'image-update',
        loadChildren: () => import('./Pages/user-pages/image-update/image-update.module').then(m => m.ImageUpdatePageModule)
    },
    {
        path: 'cv-update',
        loadChildren: () => import('./Pages/user-pages/cv-update/cv-update.module').then(m => m.CvUpdatePageModule)
    },
    {
        path: 'welcome',
        loadChildren: () => import('./Pages/welcome/welcome.module').then(m => m.WelcomePageModule)
    },
    {
        path: 'profile',
        loadChildren: () => import('./Pages/user-pages/profile/profile.module').then(m => m.ProfilePageModule)
    },
    {
        path: 'about-us',
        loadChildren: () => import('./Pages/about-us/about-us.module').then(m => m.AboutUsPageModule)
    },
    {
        path: 'home-chat',
        loadChildren: () => import('./Pages/Chat/home-chat/home-chat.module').then(m => m.HomeChatPageModule)
    },


];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
