import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PatientService } from '../../services/patient.service';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-patient-details',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule],
  templateUrl: './patient-details.component.html',
  styleUrl: './patient-details.component.css',
})
export class PatientDetailsComponent {
  patientData: any;
  loading: boolean = true;
  constructor(
    private route: ActivatedRoute,
    private patientService: PatientService
  ) {}

  ngOnInit(): void {
    this.getData();
  }

  /**
   * @purpose Get single patient data from database
   * @input None
   * @return void
   */
  getData() {
    let parent_id = this.route.snapshot.paramMap.get('id'); // get id from the url
    parent_id &&
      this.patientService.getPatientById(parent_id).subscribe((result: any) => {
        if (result?.data && result?.data.length > 0) {
          this.patientData = {
            ...result.data[0],
            created_date: result?.datetime?.split(' ')[0],
          };
        }
        this.loading = false;
      });
  }
}
