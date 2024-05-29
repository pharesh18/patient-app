import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PatientService } from '../../services/patient.service';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { VALID_RESPONSE } from '../../constants/constants';
import { NgToastService } from 'ng-angular-popup';

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
    private patientService: PatientService,
    private toast: NgToastService
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
      this.patientService.getPatientById(parent_id).subscribe({
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
  }
}
