import { Component } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { PatientService } from '../../services/patient.service';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    LoginComponent,
    MatButtonModule,
    MatCardModule,
    RouterLink,
    MatDividerModule,
    CommonModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  patientData: any;
  loading: boolean = true;
  constructor(private patientService: PatientService) {}

  ngOnInit(): void {
    this.getData();
  }

  /**
   * @purpose Get single patient data
   * @input None
   * @return void
   */
  getData() {
    const patientData = localStorage.getItem('patientData'); // get patientData from localstorage
    if (patientData) {
      const patient_id = JSON.parse(patientData).patient_id;
      this.patientService
        .getPatientById(patient_id)
        .subscribe((result: any) => {
          if (result?.data && result?.data.length > 0) {
            this.patientData = {
              ...result.data[0],
              created_date: result?.datetime?.split(' ')[0],
            };
          }
          this.loading = false;

          // setTimeout(() => {
          //   this.loading = false;
          // }, 5000);     // Uncomment this code and comment above line to see loader working
        });
    } else {
      this.loading = false;
    }
  }
}
