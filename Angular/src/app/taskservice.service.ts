import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { FormGroup ,FormControl} from '@angular/forms';


@Injectable({
  providedIn: 'root'
})
export class TaskserviceService {

  constructor(private http: HttpClient) { }

  login(loginData): Observable<any> {
    return this.http.post(
      "http://localhost:3000/api/authenticate",
      loginData,{responseType: 'text'}
    );
  }

  
  userregister(registerData): Observable<any> {
    return this.http.post(
      "http://localhost:3000/api/register",
      registerData,{responseType: 'text'}
    );
  }

  userdata(emaildata):Observable<any>{
    return this.http.post(
      "http://localhost:3000/api/userProfile",emaildata,{responseType: 'text'}
    );
  }

  alluserdata():Observable<any>{
    return this.http.get(
      "http://localhost:3000/api/getAllusers"
    );
  }

  deleteuserid(deldata): Observable<any> {
    return this.http.post(
      "http://localhost:3000/api/delete",
      deldata,{responseType: 'text'}
    );
  }

  getUserProfile() {
    return this.http.get('http://localhost:3000/api/userProfile');
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }



}
