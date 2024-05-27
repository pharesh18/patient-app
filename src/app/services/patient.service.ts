import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPatient } from '../types/patientTypes';

// CONFIDENTIAL VARIABLES ARE CONFIGURED HERE
const BASE_URL = '';
const API_KEY = '';
// hgWpDjjX4b9GMlEXs619zA==
// 3ufoiqUIhZgJ7ywTpvfi3Q==

@Injectable({
  providedIn: 'root',
})
export class PatientService {
  constructor(private http: HttpClient) { }

  getPatientById(patient_id: string) {
    return this.http.post(`${BASE_URL}/patient/patients/view`, {
      patient_id,
      apikey: API_KEY,
    });
  }

  addPatient(body: IPatient) {
    console.log(body);
    return this.http.post(`${BASE_URL}/patient/patients/add`, {
      ...body,
      apikey: API_KEY,
    });
  }
}
