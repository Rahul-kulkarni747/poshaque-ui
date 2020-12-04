import { Component, HostListener, OnInit } from '@angular/core';
import { Payload } from './common/model/payload';
import { GlobalService } from './common/services/global.service';
import { HttpRequestService } from './common/services/httprequest.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'poshaque-ui';
  
  constructor(private httpService: HttpRequestService, 
    public globalService?: GlobalService) { }

  ngOnInit(){
  }

}
