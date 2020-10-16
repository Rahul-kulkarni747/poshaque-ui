import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {

  @ViewChild('toggleButton') toggleButton: ElementRef;
  isOpen = false;

  constructor(private renderer: Renderer2) { 
    this.renderer.listen('window', 'click',(e:Event)=>{
      this.isOpen= false;
    });
  }

  showMenu(){
    if(!this.isOpen)
      setTimeout(() => {
          this.isOpen= true;
      },100);
  }

  ngOnInit() {
  }

}
