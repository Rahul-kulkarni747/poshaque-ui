import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { GlobalService } from '../common/services/global.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  selectedIndex = 1;
  @ViewChild('home') homeElement: ElementRef;
  @ViewChild('features') featuresElement: ElementRef;
  @ViewChild('aboutUs') aboutUsElement: ElementRef;
  public homeOffset: Number = null;
  public featuresOffset: Number = null;
  public aboutUsOffset: Number = null;

  constructor(public globalService:GlobalService) { }
  
  ngOnInit() {
  }
  
  ngAfterViewInit() {
    this.homeOffset = this.homeElement.nativeElement.offsetTop;
    this.featuresOffset = this.featuresElement.nativeElement.offsetTop;
    this.aboutUsOffset = this.aboutUsElement.nativeElement.offsetTop;
  }

  scrollTo(el: HTMLElement, index) {
    this.selectedIndex = index;
    el.scrollIntoView({behavior:"smooth"});
  }

  @HostListener('window:scroll', ['$event'])
  checkOffsetTop() {
    if (window.pageYOffset >= this.homeOffset && window.pageYOffset < this.featuresOffset) {
      this.selectedIndex = 1;
    } else if (window.pageYOffset >= this.featuresOffset && window.pageYOffset < this.aboutUsOffset) {
      this.selectedIndex = 2;
    } else if (window.pageYOffset >= this.aboutUsOffset) {
      this.selectedIndex = 3;
    } else {
      this.selectedIndex = 1;
    }
  }

}
