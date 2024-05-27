import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PatientService } from '../../services/patient.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-patient-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './patient-details.component.html',
  styleUrl: './patient-details.component.css'
})
export class PatientDetailsComponent {
  patientData: any;
  constructor(private route: ActivatedRoute, private patientService: PatientService) { }
  ngOnInit(): void {
    let parent_id = this.route.snapshot.paramMap.get("id");
    parent_id && this.patientService.getPatientById(parent_id).subscribe((result: any) => {
      if (result?.data && result?.data.length > 0) {
        this.patientData = {
          ...result.data[0],
          created_date: result?.datetime?.split(" ")[0],
        };
      }
      console.log(this.patientData);
    });
  }
}
