import { Component, HostListener } from '@angular/core';
import { GlobalService } from './common/services/global.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'poshaque-ui';
  
  constructor(public globalService?: GlobalService) { }
}
