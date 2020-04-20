import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TabsPage} from './tabs.page';

const routes: Routes = [
    {
        path: 'tabs',
        component: TabsPage,
        children: [
            {
                path: 'home',
                children: [
                    {
                        path: '',
                        loadChildren: () =>
                            import('../Dashboard/home/home.module').then(m => m.HomePageModule)
                    }
                ]
            },
            {
                path: 'setting',
                children: [
                    {
                        path: '',
                        loadChildren: () =>
                            import('../Dashboard/setting/setting.module').then(m => m.SettingPageModule)
                    }
                ]
            }, {
                path: 'wallet',
                children: [
                    {
                        path: '',
                        loadChildren: () =>
                            import('../user-pages/wallet/wallet.module').then(m => m.WalletPageModule)
                    }
                ]
            },
            {
                path: '',
                redirectTo: '/tabs/home',
                pathMatch: 'full'
            }
        ]
    },
    {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TabsPageRoutingModule {
}
