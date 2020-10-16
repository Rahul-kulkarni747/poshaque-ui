import { Injectable } from '@angular/core';
import { Payload } from '../model/payload';
import { AlertComponent } from 'ngx-bootstrap/alert/public_api';

@Injectable({
	providedIn: 'root'
})
export class GlobalService {
	alerts: any[] = [];
    loading = false;
    
    addAlert(type: string, message: string): void {
		// primary, secondary, success, danger, warning, info, light, dark
		this.alerts.push({
			type: type,
			msg: message,
			timeout: 2000
		});
    }
    
	showLoader() {
		return this.loading = true;
	}

	hideLoader() {
		return this.loading = false;
	}

	checkForErrors(res:Payload){
		if(res.hasError)
			this.addAlert("danger",res.errorMessage);
		return res.body;
	}
	
	onClosed(dismissedAlert: AlertComponent): void {
		this.alerts = this.alerts.filter(alert => alert !== dismissedAlert);
	}
    
}