import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  url = 'https://localhost:3443/api/projects'
  constructor(private http: HttpClient) { }

  getAllUnapprovedProjects(){
    return this.http.get(`${this.url}/reviewprojects`)
  }

  deleteAProject(projectid){
    return this.http.delete(`${this.url}/admin/delete/${projectid}`)
  }
}
