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
  url ='http://localhost:3000/api/projects'


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
    return this.http.get(`${this.url}/reviewprojects`,httpAdmin)
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
    return this.http.delete(`${this.url}/admin/delete/${projectid}`,httpAdmin)
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
    return this.http.put(`${this.url}/reviewprojects/approve/${projectid}`,{},httpAdmin)
  }
}
