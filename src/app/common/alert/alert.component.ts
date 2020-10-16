import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../services/global.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class CustomAlertComponent implements OnInit {

  constructor(public globalService?: GlobalService) { }

  ngOnInit() {

  }

}
