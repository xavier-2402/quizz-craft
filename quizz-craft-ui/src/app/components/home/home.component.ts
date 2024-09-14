import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  showSidebar:boolean = false;
  isStatic:boolean = false;

  onMouseOver(){
    this.showSidebar = true;
  }

  onMouseOut(){
    if(this.isStatic) return;
    this.showSidebar = false;

  }


}
