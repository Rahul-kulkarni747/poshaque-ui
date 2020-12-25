import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Payload } from 'src/app/common/model/payload';
import { GlobalService } from 'src/app/common/services/global.service';
import { HttpRequestService } from 'src/app/common/services/httprequest.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit, OnDestroy {

  categoryId;
  productId;
  product:any = {};
  rate: number = 4;
  selectedSize='';
  price='';
  priceArray=[];
  relatedProducts = [];
  selectedGender = '';
  isReadonly = false;
  reviewObj:any = {} ;
  enteredReview:any = {};
  overStar: number | undefined;
  percent: number;
  reviewError = false;
  alreadyReviewed = false;
  pageNumber = 0;
  reviewsperpage = 5;
  sortSelect = "created_on_DESC";
  sortBy;
  sortOrder;
  reviewPageBody:any = {};
  routerSubs:Subscription;
  cartError = false;
  productInCart = false;

  constructor(private route: ActivatedRoute,
    private httpService: HttpRequestService,
    private globalService: GlobalService,
    private router: Router) { 
    }

  ngOnInit(): void {
    this.categoryId = this.route.snapshot.paramMap.get('catid');
    this.productId = this.route.snapshot.paramMap.get('prodid');
    this.getProductDetails();
    this.routerSubs = this.router.events.subscribe((val)=>{
      if(val instanceof NavigationEnd){
        this.selectedSize='';
        this.price='';
        this.priceArray=[];
        this.relatedProducts = [];
        this.selectedGender = '';
        this.categoryId = this.route.snapshot.paramMap.get('catid');
        this.productId = this.route.snapshot.paramMap.get('prodid');
        this.cartError = false;
        this.reviewError = false;
        this.alreadyReviewed = false;
        this.getProductDetails();
      }
    })
  }
  
  getProductDetails(){
    this.globalService.showLoader();
    this.httpService.makeGetCall("products?id="+this.productId).subscribe((res: Payload) => {
      this.globalService.hideLoader();
      this.product = res.body.productDetails;
      this.product.priceSizeJson = JSON.parse(this.product.priceSizeJson);
      this.product.availableSizes = JSON.parse(this.product.availableSizes);
      this.relatedProducts = res.body.relatedProducts;
      this.reviewObj = res.body.reviewInfo;
      this.alreadyReviewed = res.body.reviewDone;
      if(this.product.isPriceDifferent)
        for (let i = 0; i < this.product.priceSizeJson.length; i++) {
          this.priceArray[this.product.priceSizeJson[i].size] = this.product.priceSizeJson[i].price;
        }
      else
        this.price = this.product.price;
      this.productInCart = this.globalService.cart.hasProduct(this.product.id+"_"+this.selectedGender+"_"+this.selectedSize);
      this.getProductReviews();
    })
  }
  
  getProductReviews(){
    this.globalService.showLoader();
    let paginationStr = this.globalService.constructPageUrl(this.pageNumber, "",
                          this.reviewsperpage, this.sortBy, this.sortOrder,true);
    this.httpService.makeGetCall("reviews?id="+this.productId+paginationStr).subscribe((res: Payload) => {
      this.globalService.hideLoader();
      this.reviewPageBody = res.body;
    });
  }

  sizeChanged(){
    this.cartError = false;
    if(this.product.isPriceDifferent)
      this.price=this.priceArray[this.selectedSize];
    this.productInCart = this.globalService.cart.hasProduct(this.product.id+"_"+this.selectedGender+"_"+this.selectedSize);
  }
  
  hoveringOver(value: number): void {
    this.overStar = value;
    this.percent = (value / 5) * 100;
  }
 
  resetStar(): void {
    this.overStar = void 0;
  }

  addReview(){
    if((typeof this.enteredReview.reviewDescription !== "undefined") && (this.enteredReview.reviewDescription.length > 10)){
      this.globalService.showLoader();
      this.reviewError = false;
      this.enteredReview.productId = this.productId;
      this.httpService.makePostCall("reviews",this.enteredReview).subscribe((res:Payload)=>{
        this.globalService.hideLoader();
      })
    }else
      this.reviewError = true;
  }

  showNextReviews(){
    this.pageNumber++;
    this.getProductReviews();
  }

  showPreviousReviews(){
    this.pageNumber--;
    this.getProductReviews();
  }

  ngOnDestroy(){
    this.routerSubs.unsubscribe();
  }

  genderChanged(){
    this.cartError = false;
    this.productInCart = this.globalService.cart.hasProduct(this.product.id+"_"+this.selectedGender+"_"+this.selectedSize);
  }

  addToCart(){
    this.cartError = false;
    if((!this.product.genderSpecific || (this.product.genderSpecific && this.selectedGender != "")) && 
        (!this.product.hasSizes || (this.product.hasSizes && this.selectedSize != ""))){
          this.productInCart = true;
          
          this.globalService.cart.addProduct(this.product.id+"_"+this.selectedGender+"_"+this.selectedSize
                    ,this.product, this.price,this.selectedSize,this.selectedGender);
          
          this.globalService.saveCartDetails();
    }else{
      this.cartError = true;
    }
  }

}
