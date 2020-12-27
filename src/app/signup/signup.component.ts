import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { HttpRequestService } from '../common/services/httprequest.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
import { Payload } from '../common/model/payload';
import { GlobalService } from '../common/services/global.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  constructor(private httpReq:HttpRequestService,private modalService: BsModalService,
    private router:Router,private globalService:GlobalService) { }

  showAddressForm:boolean = false;
  listOfAddress = [];
  address:any = {};
  indexEdit = -1;
  user:any = {};
  showPasswordError:any = false;
  showAddressError:any = false;
  modalRef: BsModalRef;
  @ViewChild('confirmPin') confirmPinModal: TemplateRef<any>;

  ngOnInit() {
    this.listOfAddress = [];
  }

  addAddress(){
    this.showAddressError = false;
    if(this.indexEdit >= 0){
      this.listOfAddress.splice(this.indexEdit,1,JSON.parse(JSON.stringify(this.address)));
      this.indexEdit = -1;
    }else{
      this.listOfAddress.push(JSON.parse(JSON.stringify(this.address)));
    }
    this.address={};
    this.showAddressForm = false;
  }

  editAddress(index){
    this.indexEdit = index;
    this.address = (JSON.parse(JSON.stringify(this.listOfAddress[index])));
    this.showAddressForm = true;
  }

  cancelClicked(){
    this.address = {};
    this.showAddressForm = false;
    this.indexEdit = -1;
  }

  deleteAddress(index){
    this.listOfAddress.splice(index,1);
  }

  signup(){
    this.showPasswordError = false;
    this.showAddressError = false;

    if(this.user.password !=  this.user.confirmPassword)
      this.showPasswordError = true;

    if(this.listOfAddress.length == 0)
      this.showAddressError = true;
    
    if(!this.showAddressError && !this.showPasswordError){
      this.user.address = this.listOfAddress;
      this.globalService.showLoader();
      this.httpReq.makePostCall("user/signup",this.user).subscribe((res:Payload)=>{
        this.globalService.hideLoader();
        this.globalService.checkForErrors(res);
        if(!res.hasError)
          this.modalRef = this.modalService.show(this.confirmPinModal, { class: 'modal-dialog-centered', backdrop: 'static', keyboard: false });
      });
    }
  }

  verifyOTP(){
    this.globalService.showLoader();
    this.httpReq.makePostCall("user/check_pin",this.user).subscribe((res:Payload)=>{
      this.globalService.hideLoader();
      this.globalService.checkForErrors(res);
      if(!res.hasError){
        this.modalRef.hide();
        this.globalService.addAlert("success","Sign up successful! Sign in to continue.");
        this.router.navigate(["../home"]);
      }
    });
  }


}
