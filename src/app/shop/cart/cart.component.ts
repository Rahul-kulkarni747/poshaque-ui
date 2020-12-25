import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Payload } from 'src/app/common/model/payload';
import { GlobalService } from 'src/app/common/services/global.service';
import { HttpRequestService } from 'src/app/common/services/httprequest.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  @ViewChild('deletefromcart') deleteFromCart: TemplateRef<any>;
  @ViewChild('deleteAddr') deleteAddr: TemplateRef<any>;
  modelRef:BsModalRef;
  deleteIndex = -1;
  addresses = [];
  address:any = {};
  showAddressForm = false;
  editIndex = -1;
  removeAddrIndex = -1;
  selectedAddressId = -1;
  productImages = [];

  constructor(private modalService: BsModalService,
              public globalService:GlobalService, private httpService:HttpRequestService) { }

  ngOnInit(): void {
    this.getUserAddress();
    this.getCartThumbnails();
  }

  deleteProductFromCart(selectedIndex){
    this.deleteIndex = selectedIndex;
    this.modelRef = this.modalService.show(this.deleteFromCart,{ backdrop: 'static', keyboard: false, class:'modal-dialog-centered' })
  }

  getUserAddress(){
    this.httpService.makeGetCall("address").subscribe((res:Payload)=>{
      this.addresses = res.body;
    })
  }

  getCartThumbnails(){
    this.httpService.makeGetCall("products/cart_thumbnails").subscribe((res:Payload)=>{
      this.productImages = res.body;
      console.log(res);
    })
  }

  getImage(id){
    for (let i = 0; i < this.productImages.length; i++) {
      if(id == this.productImages[i].id){
        return this.productImages[i].productThumbnail;
      }
      
    }
  }

  deleteProduct(){
    if(this.deleteIndex != -1){
      this.globalService.cart.removeProductFromIndex(this.deleteIndex);
      this.globalService.saveCartDetails();
      this.modelRef.hide();
    }
  }

  increaseQuantity(prod){
    prod.quantity++;
    this.globalService.cart.totalAmount += prod.price;
    this.globalService.saveCartDetails();
  }

  decreaseQuantity(prod){
    if(prod.quantity > 1){
      prod.quantity--;
      this.globalService.cart.totalAmount -= prod.price;
      this.globalService.saveCartDetails();
    }
  }

  showAddress(){
    this.address = {};
    this.showAddressForm = true;
  }

  cancelClicked(){
    this.showAddressForm = false;
  }

  addAddress(){
    this.globalService.showLoader();
    this.httpService.makePostCall("address",this.address).subscribe((res:Payload)=>{
      this.globalService.hideLoader();
      this.showAddressForm = false;
      if(typeof this.address.id === "undefined"){
        this.addresses.push(res.body);
      }
      else if(this.editIndex != -1){
        this.addresses[this.editIndex] = res.body;
        this.editIndex = -1;
      }
    })
  }

  editAddress(addr,i){
    this.address = {};
    this.address = JSON.parse(JSON.stringify(addr));
    this.showAddressForm = true;
    this.editIndex = i;
  }

  removeAddress(addr,i){
    this.removeAddrIndex = i;
    this.selectedAddressId = addr.id;
    this.modelRef = this.modalService.show(this.deleteAddr,{ backdrop: 'static', keyboard: false, class:'modal-dialog-centered' })
  }

  deleteAddress(){
    this.globalService.showLoader();
    this.httpService.makeDeleteCall("address?id="+this.selectedAddressId).subscribe((res:Payload)=>{
      this.addresses.splice(this.removeAddrIndex,1);
      this.removeAddrIndex = -1;
      this.modelRef.hide();
      this.globalService.hideLoader();
    })
  }
}
