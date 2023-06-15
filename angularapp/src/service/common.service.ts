import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../interface/employee'
@Injectable({
  providedIn: 'root'
})
export class CommonService {

  
  baseURL: string = 'http://localhost:5157';
  constructor(private http: HttpClient) { }
  public getWaeatherForeCast(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.baseURL}/api/Employee/GetEmployee`);
  }
  public saveEmployee(employee: Employee): Observable<any> {
    return this.http.post(`${this.baseURL}/api/Employee`, employee);
  }
  public deleteEmployee(employee: Employee): Observable<any> {
    return this.http.delete(`${this.baseURL}/api/Employee/` + employee.Id);
  }
}
