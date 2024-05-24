import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { NgToastModule } from 'ng-angular-popup';
import { MaterialModule } from './modules/material/material.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    MaterialModule,
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    AuthLayoutComponent,
    MainLayoutComponent,
    NgToastModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {}
