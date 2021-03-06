import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShopComponent } from './shop.component';
import { HomeComponent } from './home/home.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CartComponent } from './cart/cart.component';
import { PaymentSuccessfulComponent } from './payment-successful/payment-successful.component';
import { FeedbackGuard } from '../common/guards/feedback.guard';
import { MyOrdersComponent } from './my-orders/my-orders.component';

const routes: Routes = [
  {path: '', 
  component: ShopComponent, 
  children: [
    {path: '', redirectTo:'home', pathMatch:'full'},
    {path: 'home', component: HomeComponent},
    {path: 'products/:id', component: ProductListComponent},
    {path: 'products/:catid/product-details/:prodid', component: ProductDetailsComponent},
    {path: 'cart', component: CartComponent},
    {path: 'thank-you', canActivate: [FeedbackGuard], component: PaymentSuccessfulComponent},
    {path: 'my-orders', component: MyOrdersComponent},
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShopRoutingModule { }
