import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpRequestService } from 'src/app/common/services/httprequest.service';
import { Payload } from 'src/app/common/model/payload';
import { GlobalService } from 'src/app/common/services/global.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  productList:any = [];
  page:any = {};
  constructor(private route: ActivatedRoute,
    private httpService:HttpRequestService,
    private globalService:GlobalService) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.globalService.showLoader();
    let str = "all";
    const id = +this.route.snapshot.paramMap.get('id');
    
    if(id != 0){
      str="category_id?categoryId="+id;
    }
    
    this.httpService.makeGetCall("products/"+str).subscribe((res:Payload)=>{
      this.globalService.hideLoader();
      this.page = res.body;
      this.productList = this.page.content;
      console.log(this.productList);
    });
  }
}
