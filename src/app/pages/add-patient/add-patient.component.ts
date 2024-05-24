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

  addPatientForm = this.fb.group({
    first_name: [
      '',
      [
        Validators.required,
        Validators.pattern(/^[a-zA-Z]+$/),
        Validators.minLength(2),
        Validators.maxLength(30),
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

  handleAddPatient(): void {
    if (this.addPatientForm.valid) {
      const body = {
        first_name: this.addPatientForm.value.first_name!,
        last_name: this.addPatientForm.value.last_name,
        mobile: String(this.addPatientForm.value.mobile!),
        zipcode: String(this.addPatientForm.value.zipcode),
      };

      this.patientSerive.addPatient(body).subscribe((result: any) => {
        if (result.data) {
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
        console.log(result);
      });
    }
  }
}
