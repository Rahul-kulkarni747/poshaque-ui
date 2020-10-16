import { Component, OnInit } from '@angular/core';
import { HttpRequestService } from 'src/app/common/services/httprequest.service';
import { Payload } from 'src/app/common/model/payload';
import { DomSanitizer} from '@angular/platform-browser';
import { GlobalService } from 'src/app/common/services/global.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  categories = [];

  constructor(private httpService:HttpRequestService,
    private sanitizer: DomSanitizer, 
    private globalService:GlobalService) { }

  ngOnInit() {
    this.getAllCategories();
  }

  getAllCategories(){
    this.globalService.showLoader();
    this.httpService.makeGetCall("categories").subscribe((res:Payload)=>{
      this.categories = res.body;
      this.categories.forEach(element => {
        element.bullets = JSON.parse(element.bullets);
        if(element.iconType == 'svg')
          element.icon = this.sanitizer.bypassSecurityTrustHtml(element.icon);
      });
      this.globalService.hideLoader();
    });
  }
}
