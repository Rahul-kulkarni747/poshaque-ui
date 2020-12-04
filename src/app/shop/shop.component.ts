import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { Payload } from '../common/model/payload';
import { GlobalService } from '../common/services/global.service';
import { HttpRequestService } from '../common/services/httprequest.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {

  @ViewChild('toggleButton') toggleButton: ElementRef;
  isOpen = false;

  constructor(private renderer: Renderer2, 
              public globalService: GlobalService,
              private router:Router,
              private httpService:HttpRequestService) { 
    this.renderer.listen('window', 'click',(e:Event)=>{
      this.isOpen= false;
    });
  }

  showMenu(){
    if(!this.isOpen)
      setTimeout(() => {
          this.isOpen= true;
      },100);
  }

  ngOnInit() {
    this.httpService.makeGetCall("cart").subscribe((res:Payload)=>{
      if(res.body != null){
        this.globalService.cart.fromString(res.body.cartData);
        this.globalService.cart.id = res.body.id;
      }
    })
  }

  logout(){
    localStorage.clear();
    this.globalService.userAuth.init();
    this.router.navigate(['login']);
  }

}
