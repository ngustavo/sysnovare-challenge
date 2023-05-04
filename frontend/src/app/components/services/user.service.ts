import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class UserService {
  private apiUrl = "http://localhost:4000/api/v1/user";

  constructor(private http: HttpClient) {}

  subscribe(name: string, email: string, password: string) {
    return this.http.post(`${this.apiUrl}/subscribe`, {
      name,
      email,
      password,
    });
  }

  login(email: string, password: string) {
    return this.http.post(`${this.apiUrl}/login`, { email, password });
  }

  getFunds(email: string): Observable<Object> {
    return this.http.get(`${this.apiUrl}/${email}/funds`);
  }

  addFunds(email: string, amount: number): Observable<Object> {
    return this.http.put(`${this.apiUrl}/${email}/funds`, { amount });
  }

  removeFunds(email: string, amount: number): Observable<Object> {
    return this.http.delete(`${this.apiUrl}/${email}/funds`, {
      body: { amount },
    });
  }
}
