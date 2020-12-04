import { Injectable } from '@angular/core';
import { Payload } from '../model/payload';
import { AlertComponent } from 'ngx-bootstrap/alert/public_api';
import { Cart } from '../model/cart';
import { userAuth } from '../model/userAuth';

@Injectable({
	providedIn: 'root'
})
export class GlobalService {
	alerts: any[] = [];
    loading = false;
	cart: Cart = new Cart();
	userAuth :userAuth = new userAuth();

	constructor(){
		this.userAuth.init();
	}
	
    addAlert(type: string, message: string): void {
		// primary, secondary, success, danger, warning, info, light, dark
		this.alerts.push({
			type: type,
			msg: message,
			timeout: 2000
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
    
}