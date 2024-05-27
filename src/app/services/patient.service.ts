import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPatient } from '../types/patientTypes';

// CONFIDENTIAL VARIABLES ARE CONFIGURED HERE
const BASE_URL = '';
const API_KEY = '';

@Injectable({
  providedIn: 'root',
})
export class PatientService {
  constructor(private http: HttpClient) {} // Inject HttpClient for api calling

  /**
   * @purpose Get single patient data
   * @input patient_id
   * @return patient_data with status code and message
   */
  getPatientById(patient_id: string) {
    return this.http.post(`${BASE_URL}/patient/patients/view`, {
      patient_id,
      apikey: API_KEY,
    });
  }

  /**
   * @purpose add new patient in the database
   * @input patient data of type IPatient
   * @return patient_id after successfully creating the patient along with the status code, message and creation timpstamp
   */

  addPatient(body: IPatient) {
    return this.http.post(`${BASE_URL}/patient/patients/add`, {
      ...body,
      apikey: API_KEY,
    });
  }
}
