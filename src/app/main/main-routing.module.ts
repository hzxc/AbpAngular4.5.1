import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PhoneBookComponent } from 'app/main/phone-book/phone-book.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                children: [
                    { path: 'dashboard', component: DashboardComponent, data: { permission: 'Pages.Tenant.Dashboard' } }
                ]
            },
            { path: 'phonebook', component: PhoneBookComponent }
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class MainRoutingModule { }