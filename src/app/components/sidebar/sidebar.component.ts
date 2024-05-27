import { Component, EventEmitter, Output } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { CommonService } from '../../services/common.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    MatSidenavModule,
    MatListModule,
    RouterOutlet,
    RouterLink,
    MatIconModule,
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  openedSidebar: boolean = true;

  constructor(private router: Router, private commonService: CommonService) {}

  ngOnInit(): void {
    this.commonService.toggleSidebar.subscribe((val) => {
      this.openedSidebar = val;
    });
  }

  /**
   * @purpose Remove userdata from localStorage and redirect to login page
   * @input None
   * @return void
   */
  handleLogout() {
    localStorage.removeItem('userData');
    this.router.navigate(['/login']);
  }
}
