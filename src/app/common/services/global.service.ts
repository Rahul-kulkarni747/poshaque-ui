import { Injectable } from '@angular/core';
import { Payload } from '../model/payload';
import { AlertComponent } from 'ngx-bootstrap/alert/public_api';
import { Cart } from '../model/cart';
import { userAuth } from '../model/userAuth';
import { HttpRequestService } from './httprequest.service';

@Injectable({
	providedIn: 'root'
})
export class GlobalService {
	alerts: any[] = [];
    loading = false;
	cart: Cart = new Cart();
	userAuth :userAuth = new userAuth();
	paymentDone = false;

	constructor(private httpService:HttpRequestService){
		this.userAuth.init();
	}
	
    addAlert(type: string, message: string): void {
		// primary, secondary, success, danger, warning, info, light, dark
		this.alerts.push({
			type: type,
			msg: message,
			timeout: 20000
		});
    }
    
	showLoader() {
		setTimeout(() => {
			return this.loading = true;
		});
	}

	hideLoader() {
		setTimeout(() => {
			return this.loading = false;
		});
	}

	checkForErrors(res:Payload){
		if(res.hasError)
			this.addAlert("danger",res.errorMessage);
		return res.body;
	}
	
	onClosed(dismissedAlert: AlertComponent): void {
		this.alerts = this.alerts.filter(alert => alert !== dismissedAlert);
	}

	constructPageUrl(pNo,searchTerm,psize?,sortBy?,orderBy?,hasCategory?){
		let str="";
		if(hasCategory)
			str+="&";
		str +="pageNo="+pNo;
		if(typeof searchTerm !== "undefined" && searchTerm != "" && searchTerm.length>2)
			str+= "&searchTerm="+searchTerm;
		if(typeof psize !== "undefined")
			str+= "&pageSize="+psize;
		if(typeof sortBy !== "undefined")
			str+= "&sortBy="+sortBy;
		if(typeof orderBy !== "undefined")
			str +="&orderBy="+orderBy;
		return str;
	}

	saveCartDetails(){
		this.showLoader();
		this.httpService.makePostCall("cart",
		  { 
			id:this.cart.id, 
			data: JSON.stringify(this.cart)
		  }).subscribe((res:Payload)=>{
			this.hideLoader();
			this.cart.id = res.body.id;
			this.addAlert("success","Cart Updated");
		});
	}
    
}