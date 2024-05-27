import { Component } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { PatientService } from '../../services/patient.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    LoginComponent,
    MatButtonModule,
    MatCardModule,
    RouterLink,
    MatDividerModule,
    CommonModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  // arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  patientData: any;
  constructor(private patientService: PatientService) { }

  ngOnInit(): void {
    const patientData = localStorage.getItem("patientData");
    if (patientData) {
      const patient_id = JSON.parse(patientData).patient_id;
      this.patientService.getPatientById(patient_id).subscribe((result: any) => {
        console.log(result);
        if (result?.data && result?.data.length > 0) {
          this.patientData = {
            ...result.data[0],
            created_date: result?.datetime?.split(" ")[0],
          };
        }
      });
    }
  }
}
