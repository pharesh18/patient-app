import { Component } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { PatientService } from '../../services/patient.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    LoginComponent,
    MatButtonModule,
    MatCardModule,
    RouterLink,
    MatDividerModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  // arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  patientData: any;
  constructor(private patientService: PatientService) {}

  ngOnInit(): void {
    const body = {
      patient_id: '3ufoiqUIhZgJ7ywTpvfi3Q==',
    };
    this.patientService.getPatientById(body).subscribe((result: any) => {
      if (result) {
        this.patientData = {
          ...result.data[0],
          createdAt: result.datetime,
        };
      }

      console.log(this.patientData);
    });
  }
}
