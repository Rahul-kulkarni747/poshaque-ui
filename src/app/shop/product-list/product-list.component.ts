import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpRequestService } from 'src/app/common/services/httprequest.service';
import { Payload } from 'src/app/common/model/payload';
import { GlobalService } from 'src/app/common/services/global.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  productList: any = [];
  page: any = {};
  pageNumber = 0;
  sortBy;
  sortOrder;
  productsperpage = 8;
  sortSelect = "name_ASC";
  searchTerm = "";
  searchHttp: Subscription;
  searchErrorMessage = "";

  constructor(private route: ActivatedRoute,
    private httpService: HttpRequestService,
    private globalService: GlobalService) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.globalService.showLoader();
    this.searchErrorMessage = "";
    let str = "all?";
    let hasCategory = false;
    const id = +this.route.snapshot.paramMap.get('id');

    if (id != 0) {
      str = "category_id?id=" + id;
      hasCategory = true;
    }

    if (typeof this.searchHttp !== "undefined"){
      this.searchHttp.unsubscribe();
    }

    let paginationStr = this.globalService.constructPageUrl(this.pageNumber, this.searchTerm,
      this.productsperpage, this.sortBy, this.sortOrder, hasCategory);

    this.searchHttp = this.httpService.makeGetCall("products/" + str + paginationStr).subscribe((res: Payload) => {
      this.globalService.hideLoader();
      this.page = res.body;
      this.productList = this.page.content;
    });
  }

  productsChanged() {
    this.searchTerm = "";
    this.pageNumber = 0;
    this.getProducts();
  }

  sortChange() {
    this.searchTerm = "";
    let arr = this.sortSelect.split("_");
    this.sortBy = arr[0];
    this.sortOrder = arr[1];
    this.pageNumber = 0;
    this.getProducts();
  }

  nextPage() {
    this.pageNumber++;
    this.getProducts();
  }

  prevPage() {
    this.pageNumber--;
    this.getProducts();
  }

  searchForProducts() {
    if (this.searchTerm.length > 2) {
      setTimeout(() => {
        this.getProducts();
      }, 1500);
    } else {
      setTimeout(() => {
        this.searchErrorMessage = "Enter Three or more characters to search. Showing all products.";
      },500);
      this.getProducts();
    }

  }
}
