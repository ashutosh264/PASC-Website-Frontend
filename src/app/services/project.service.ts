import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from "../../environments/environment";

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json"
  })
};

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  authToken;
  url = environment.port


  constructor(private http: HttpClient) { }


  loadToken(){
    return localStorage.getItem('idToken')
  }
 
  getAllUnapprovedProjects(){
    this.authToken = this.loadToken()
    var token = "Bearer " + this.authToken.toString();
    var httpAdmin = {
      headers : new HttpHeaders({
        "Authorization": token
      })
    }
    return this.http.get(`${this.url}/api/projects/reviewprojects`,httpAdmin)
  }

  deleteAProject(projectid){
    this.authToken = this.loadToken()
    var token = 'Bearer ' + this.authToken.toString();
    var httpAdmin = {
      headers : new HttpHeaders({
        "Content-Type": "application/json",
        "Authorization": token
      })
    }
    return this.http.delete(`${this.url}/api/projects/admin/delete/${projectid}`,httpAdmin)
  }

  approveProject(projectid){
    this.authToken = this.loadToken()
    var token = 'Bearer ' + this.authToken.toString();
    var httpAdmin = {
      headers : new HttpHeaders({
        "Content-Type": "application/json",
        "Authorization": token
      })
    }
    return this.http.put(`${this.url}/api/projects/reviewprojects/approve/${projectid}`,{},httpAdmin)
  }
}
