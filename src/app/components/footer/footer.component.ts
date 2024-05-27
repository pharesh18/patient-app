import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent {
  /**
   * @purpose Get the year in YYYY format
   * @input None
   * @return year of type number in YYYY format
   */

  getFullYear(): number {
    return new Date().getFullYear();
  }
}
