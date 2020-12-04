import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { LoginGuard } from './common/guards/login.guard';
import { SignUpGuard } from './common/guards/signup,guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: HomepageComponent },
  { path: 'login', canActivate:[ SignUpGuard ], component: LoginComponent },
  { path: 'signup', canActivate:[ SignUpGuard ], component: SignupComponent },
  { path: 'shop', canActivate:[ LoginGuard ], loadChildren: () => import('./shop/shop.module').then(m => m.ShopModule)},
  { path: '**', redirectTo:'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled',
    anchorScrolling: 'enabled',
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
