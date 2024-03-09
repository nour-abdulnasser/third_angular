import { Component } from '@angular/core';

@Component({
  selector: 'app-scroll-to-top',
  templateUrl: './scroll-to-top.component.html',
  styleUrls: ['./scroll-to-top.component.css']
})
export class ScrollToTopComponent {
  goToTop():void {
    scrollTo(0,0);
    // window.scrollTo(0,0); // window is global object
  }

}
