import { Component, HostListener, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  showSidebar:boolean = true;
  user:User;
  isMobile: boolean = false;

  constructor(private auth:AuthService){

  }

  ngOnInit(): void {
    this.user = this.auth.getUser();
    let width = window.innerWidth;
    if(width < 768){
      this.isMobile = true;
    }else
      this.isMobile = false;
  }

  close(){
    this.showSidebar = false;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    let width = window.innerWidth;
    if(width < 768){
      this.isMobile = true;
    }else 
      this.isMobile = false
  }

}
