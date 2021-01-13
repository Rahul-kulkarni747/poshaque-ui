import { Component, OnInit } from '@angular/core';
import { Payload } from 'src/app/common/model/payload';
import { GlobalService } from 'src/app/common/services/global.service';
import { HttpRequestService } from 'src/app/common/services/httprequest.service';

@Component({
  selector: 'app-payment-successful',
  templateUrl: './payment-successful.component.html',
  styleUrls: ['./payment-successful.component.scss']
})
export class PaymentSuccessfulComponent implements OnInit {
  
  feedback:any={};
  stepper:any={};

  constructor(private globalService:GlobalService,
              private httpservice:HttpRequestService) { }

  ngOnInit(): void {
    this.feedback.id= 0;
    this.globalService.paymentDone = false;
    this.stepper = {
      type:"horizontal",
      tabs:[{
        "name":"Accepted",
        "status": "completed"
      },{
        "name":"Dispacted",
        "status": "active"
      },{
        "name":"Out for delivery",
        "status": "disabled"
      },{
        "name":"Delivered",
        "status": "disabled"
      }]
    }
  }
  
  doTextareaValueChange(ev) {
    try {
      this.feedback.feedback = ev.target.value;
    } catch(e) {
      console.info('could not set textarea-value');
    }
  }

  saveFeedback(){
    this.globalService.showLoader();
    this.httpservice.makePostCall("feedback",this.feedback).subscribe((res:Payload) => {
      this.feedback = res.body;
      this.globalService.hideLoader();
    })
  }
}
