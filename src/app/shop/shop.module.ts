import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShopRoutingModule } from './shop-routing.module';
import { ShopComponent } from './shop.component';
import { HomeComponent } from './home/home.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { ProductListComponent } from './product-list/product-list.component';
import { FormsModule } from '@angular/forms';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { RatingModule } from 'ngx-bootstrap/rating';
import { CartComponent } from './cart/cart.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { PaymentSuccessfulComponent } from './payment-successful/payment-successful.component';
import { StepperComponent } from '../common/stepper/stepper.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';

@NgModule({
  declarations: [
    ShopComponent, 
    HomeComponent, 
    ProductListComponent, 
    ProductDetailsComponent, 
    CartComponent, PaymentSuccessfulComponent,
    StepperComponent,
    MyOrdersComponent
  ],
  imports: [
    CommonModule,
    ShopRoutingModule,
    FormsModule,
    CarouselModule.forRoot(),
    RatingModule.forRoot(),
    ModalModule.forRoot(),
    TooltipModule.forRoot()
  ]
})
export class ShopModule { }
