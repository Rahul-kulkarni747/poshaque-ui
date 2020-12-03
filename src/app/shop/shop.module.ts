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

@NgModule({
  declarations: [ShopComponent, HomeComponent, ProductListComponent, ProductDetailsComponent],
  imports: [
    CommonModule,
    ShopRoutingModule,
    FormsModule,
    CarouselModule.forRoot(),
    RatingModule.forRoot()
  ]
})
export class ShopModule { }
