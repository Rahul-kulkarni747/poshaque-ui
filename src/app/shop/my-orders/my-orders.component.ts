import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Payload } from 'src/app/common/model/payload';
import { GlobalService } from 'src/app/common/services/global.service';
import { HttpRequestService } from 'src/app/common/services/httprequest.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss']
})
export class MyOrdersComponent implements OnInit {

  currentPageDetails:any ={};
  oldPageDetails:any ={};
  oldPageNo = 0;
  currentPageNo = 0;
  currentOrders = [];
  oldOrders = [];
  @ViewChild('cancelorder') cancelOrderModal: TemplateRef<any>;
  @ViewChild('orderdetails') orderdetailsModal: TemplateRef<any>;
  modelRef:BsModalRef;
  selectedOrder:any;
  orderInfo:any = {};
  stepperJson:any ={};

  constructor(private globalService:GlobalService,
    private httpService:HttpRequestService,
    private modalService: BsModalService) { }

  ngOnInit(): void {
    this.getCurrentOrders();
    this.getOldOrders();
  }

  getCurrentOrders(){
    this.globalService.showLoader();
    this.httpService.makeGetCall("order/current?pageNo="+this.currentPageNo).subscribe((res:Payload)=>{
      this.globalService.hideLoader();
      this.currentOrders = res.body.content;
      this.currentPageDetails = this.getPaginationObj(res.body);
    });
  }

  getOldOrders(){
    this.globalService.showLoader();
    this.httpService.makeGetCall("order/old?pageNo="+this.oldPageNo).subscribe((res:Payload)=>{
      this.globalService.hideLoader();
      this.oldOrders = res.body.content;
      this.oldPageDetails = this.getPaginationObj(res.body);
    });
  }

  selectOrderForCancel(order){
    this.modelRef = this.modalService.show(this.cancelOrderModal,{ backdrop: 'static', keyboard: false, class:'modal-dialog-centered' })
    this.selectedOrder = JSON.parse(JSON.stringify(order));
  }

  cancelOrder(){
    this.globalService.showLoader();
    this.httpService.makeDeleteCall("order/cancel?orderId="+this.selectedOrder.id).subscribe((res:Payload)=>{
      this.globalService.hideLoader();
      this.modelRef.hide();
      this.getCurrentOrders();
      this.getOldOrders();
    });
  }

  getPaginationObj(obj){
      return {
        first: obj.first,
        last: obj.last,
        numberOfElements: obj.numberOfElements,
        totalPages: obj.totalPages,
        totalElements: obj.totalElements
      };
  }

  prevPageCurrentOrders(){
    this.currentPageNo++;
    this.getCurrentOrders();
  }

  nextPageCurrentOrders(){
    this.currentPageNo--;
    this.getCurrentOrders();
  }

  prevPageOldOrders(){
    this.oldPageNo++;
    this.getOldOrders();
  }

  nextPageOldOrders(){
    this.oldPageNo--;
    this.getOldOrders();
  }

  getOrderDetails(id){
    this.globalService.showLoader();
    this.httpService.makeGetCall("order/order-details?orderId="+id).subscribe((res:Payload)=>{
      this.globalService.hideLoader();
      this.orderInfo = res.body.order;
      this.orderInfo.orderDetails = JSON.parse(this.orderInfo.orderDetails);
      this.orderInfo.productImages = res.body.productThumbnails;
      this.modelRef = this.modalService.show(this.orderdetailsModal,{ backdrop: 'static', keyboard: false, class:'modal-dialog-centered' })
      this.constructOrderJson(this.orderInfo.status);
    });
  }

  getImage(id){
    for (let i = 0; i < this.orderInfo.productImages.length; i++) {
      if(id == this.orderInfo.productImages[i].id){
        return this.orderInfo.productImages[i].productThumbnail;
      }
      
    }
  }

  constructOrderJson(status){
    if(status == 'ACCEPTED'){
      this.stepperJson = {
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
      };
    }else if(status == 'DISPATCHED'){
      this.stepperJson = {
        type:"horizontal",
        tabs:[{
          "name":"Accepted",
          "status": "completed"
        },{
          "name":"Dispacted",
          "status": "completed"
        },{
          "name":"Out for delivery",
          "status": "active"
        },{
          "name":"Delivered",
          "status": "disabled"
        }]
      };
    }else if(status == 'OUT_FOR_DELIVERY'){
      this.stepperJson = {
        type:"horizontal",
        tabs:[{
          "name":"Accepted",
          "status": "completed"
        },{
          "name":"Dispacted",
          "status": "completed"
        },{
          "name":"Out for delivery",
          "status": "completed"
        },{
          "name":"Delivered",
          "status": "active"
        }]
      };
    }else if(status == 'DELIVERED'){
      this.stepperJson = {
        type:"horizontal",
        tabs:[{
          "name":"Accepted",
          "status": "completed"
        },{
          "name":"Dispacted",
          "status": "completed"
        },{
          "name":"Out for delivery",
          "status": "completed"
        },{
          "name":"Delivered",
          "status": "completed"
        }]
      };
    }
  }
}
