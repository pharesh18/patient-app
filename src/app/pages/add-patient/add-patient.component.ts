import { Component, inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { PatientService } from '../../services/patient.service';

@Component({
  selector: 'app-add-patient',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './add-patient.component.html',
  styleUrl: './add-patient.component.css',
})
export class AddPatientComponent {
  constructor(
    private router: Router,
    private toast: NgToastService,
    private patientSerive: PatientService
  ) {}

  fb = inject(FormBuilder);

  /**
   * @purpose Validate all the form fields
   */
  addPatientForm = this.fb.group({
    first_name: [
      '',
      [
        Validators.required, // required field
        Validators.pattern(/^[a-zA-Z]+$/), // inputed value must be in this format
        Validators.minLength(2), // minimum length of input
        Validators.maxLength(30), // maximum length of input
      ],
    ],
    last_name: [
      '',
      [
        Validators.pattern(/^[a-zA-Z']+$/),
        Validators.minLength(2),
        Validators.maxLength(30),
      ],
    ],
    mobile: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]], // accepting here indian phone numbers only
    zipcode: ['', [Validators.pattern(/^\d{6}$/)]], // accepting here 6 digit zipcode only
  });

  /**
   * @purpose - Add patient to the database
   * @input - None
   * @return - void
   */
  handleAddPatient(): void {
    if (this.addPatientForm.valid) {
      const body = {
        first_name: this.addPatientForm.value.first_name!?.trim(),
        last_name: this.addPatientForm.value.last_name?.trim(),
        mobile: String(this.addPatientForm.value.mobile!)?.trim(),
        zipcode: String(this.addPatientForm.value.zipcode)?.trim(),
      };

      this.patientSerive.addPatient(body).subscribe((result: any) => {
        if (result?.data) {
          localStorage.setItem(
            'patientData',
            JSON.stringify({ patient_id: result?.data.patient_id })
          );
          this.router.navigate(['/']);
          this.toast.success({
            detail: 'SUCCESS',
            summary: 'Patient added successfully',
            duration: 3000,
          });
        } else {
          this.toast.error({
            detail: 'ERROR',
            summary: result?.status_message,
            duration: 3000,
          });
        }
      });
    }
  }
}
