import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  isSidebarVisible = true;

  toggleSidebar(): void {
    this.isSidebarVisible = !this.isSidebarVisible;
  }
}
