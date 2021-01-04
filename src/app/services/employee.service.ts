import { Injectable } from '@angular/core';
import {EmployeeData} from '../model/employee';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  url:string;
  constructor(private _http:HttpClient) { 
    this._http.get('assets/urls.txt',{ responseType: 'text' }).subscribe(data=>{
      this.url = data;
      console.log(this.url)
    });
  }

  

  // // public readFiles():Observable<any>{
  // //  return  this._http.get('assets/urls.txt',{ responseType: 'text' });
  // // }
  // public getURL():Observable<string>{
  //   return this._http.get<string>(this.url);
  // }
  public getEmployees():Observable<EmployeeData[]>{
    return this._http.get<EmployeeData[]>(this.url);
  }


  public addEmployee(employeedata:EmployeeData):Observable<EmployeeData>{
    const headers = new HttpHeaders({'Content-Type':'application/json'});
  
    return this._http.post<EmployeeData>(this.url,employeedata,{headers})
    
  }

  public getEmployee(id:string):Observable<EmployeeData>{
    return this._http.get<EmployeeData>(this.url+'/'+`${id}`);
  }

  public updateEmployee(employeedata:EmployeeData):Observable<{}>{
    const headers = new HttpHeaders({'Content-Type':'application/json'});
    return this._http.put<EmployeeData>(this.url+'/'+`${employeedata.id}`,employeedata,{headers})
   
  }


  public deleteEmployee(id:string):Observable<{}>{
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    alert(id);
    const url = this.url+'/'+`${id}`;
    
    return this._http.delete<EmployeeData>(url, { headers })
  }






  
}
