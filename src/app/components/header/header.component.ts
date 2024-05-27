import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  showSidebar: boolean = true;
  constructor(private commonService: CommonService) {}

  /**
   * @purpose To toggle sidebar show or hide
   * @input None
   * @return void
   */
  handleSidebar() {
    this.commonService.toggleSidebar.emit(!this.showSidebar);
    this.showSidebar = !this.showSidebar;
  }
}
