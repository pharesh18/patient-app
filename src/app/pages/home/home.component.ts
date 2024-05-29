import { Component } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { PatientService } from '../../services/patient.service';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { VALID_RESPONSE } from '../../constants/constants';
import { NgToastService } from 'ng-angular-popup';

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
  constructor(
    private patientService: PatientService,
    private toast: NgToastService
  ) {}

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
      this.patientService.getPatientById(patient_id).subscribe({
        next: (result: any) => {
          if (
            result.status_code === VALID_RESPONSE &&
            result?.data &&
            result?.data.length > 0
          ) {
            this.patientData = {
              ...result.data[0],
              created_date: result?.datetime?.split(' ')[0],
            };
          }
          this.loading = false;
        },
        error: (err) => {
          this.loading = false;
          this.toast.error({
            detail: 'ERROR',
            summary: err.message,
            duration: 3000,
          });
          console.log(err);
        },
      });
    } else {
      this.loading = false;
    }
  }
}
