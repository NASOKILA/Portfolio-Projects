import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HomeComponent } from './components/common/home/home.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { ComixAllComponent } from './components/comix/comix-all/comix-all.component';
import { ComixCreateComponent } from './components/comix/comix-create/comix-create.component';
import { ComixEditComponent } from './components/comix/comix-edit/comix-edit.component';
import { ComixDetailsComponent } from './components/comix/comix-details/comix-details.component';
import { OrderConfirmComponent } from './components/order/order-confirm/order-confirm.component';
import { OrderFinishComponent } from './components/order/order-finish/order-finish.component';
import { OrderMyComponent } from './components/order/order-my/order-my.component';
import { OrderAllComponent } from './components/order/order-all/order-all.component';
import { AuthGuard } from './components/auth/auth.guard';
import { AppGuard } from './app.guard';
import { AdminGuard } from './components/auth/admin.guard';
import { ProfileComponent } from './components/user/profile/profile.component';
import { UserAllComponent } from './components/user/user-all/user-all.component';
import { ComixDeleteComponent } from './components/comix/comix-delete/comix-delete.component';
import { UserDetailsComponent } from './components/user/user-details/user-details.component';
import { OrderDetailsComponent } from './components/order/order-details/order-details.component';


const routes = [
    { path: '', component: HomeComponent },
    { path: 'home', component: HomeComponent },
    {
        path: 'auth', children: [
            { path: 'login', component: LoginComponent },
            { path: 'register', component: RegisterComponent },
        ], canActivate: [AppGuard]
    },
    {
        path: 'comix', children: [
            { path: 'all', component: ComixAllComponent },
            { path: 'create', component: ComixCreateComponent, canActivate: [AdminGuard] },
            { path: 'edit/:id', component: ComixEditComponent, canActivate: [AdminGuard] },
            { path: 'delete/:id', component: ComixDeleteComponent, canActivate: [AdminGuard] },
            { path: 'details/:id', component: ComixDetailsComponent },
        ], canActivate: [AuthGuard]
    },
    {
        path: 'order', children: [
            { path: 'confirm/:id', component: OrderConfirmComponent },
            { path: 'finish/:id', component: OrderFinishComponent },
            { path: 'my', component: OrderMyComponent },
            { path: 'all', component: OrderAllComponent, canActivate: [AdminGuard] },
            { path: 'details/:id', component: OrderDetailsComponent },
        ], canActivate: [AuthGuard]
    },
    {
        path: 'user', children: [
            { path: 'profile', component: ProfileComponent },
            { path: 'all', component: UserAllComponent, canActivate: [AdminGuard] },
            { path: 'details/:id', component: UserDetailsComponent, canActivate: [AdminGuard] },
        ], canActivate: [AuthGuard]
    },
    { path: '**', redirectTo: '/' }
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { };