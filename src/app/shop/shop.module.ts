import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShopRoutingModule } from './shop-routing.module';
import { ShopComponent } from './shop.component';
import { HomeComponent } from './home/home.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { ProductListComponent } from './product-list/product-list.component';

@NgModule({
  declarations: [ShopComponent, HomeComponent, ProductListComponent],
  imports: [
    CommonModule,
    ShopRoutingModule,
    CarouselModule.forRoot()
  ]
})
export class ShopModule { }
