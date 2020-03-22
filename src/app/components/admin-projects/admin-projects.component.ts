import { Component, OnInit, OnChanges, OnDestroy } from '@angular/core';
import { ProjectService } from 'src/app/services/project.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-admin-projects',
  templateUrl: './admin-projects.component.html',
  styleUrls: ['./admin-projects.component.css']
})
export class AdminProjectsComponent implements OnInit {
  modalProject = null
  projects:any = []
  constructor(private pS: ProjectService,private router: Router) { }

  ngOnInit() {
  this.projects = []
    this.getAllProjects()
    this.modalProject = null
  }


// gets all the projects from the database
 getAllProjects(){
  this.pS.getAllUnapprovedProjects()
  .subscribe(allprojects => {
    this.projects = allprojects;
    console.log(this.projects)
  })

 }

 // this will open a clicked project in the modal
  openInModal(project){
    this.modalProject = project;
  }

  // deletes the project that is in the modal and will navigate to itself
  onDelete(){
    this.pS.deleteAProject(this.modalProject._id).subscribe(del =>{
      this.onModalClose();
      this.router.navigate(['/projects'])
    },err=>{
      console.log(err);
      this.onModalClose();
      this.router.navigate(['/projects'])
    })
  }

  onAccept(){
    this.pS.approveProject(this.modalProject._id).subscribe(approvedPro =>{
      console.log(approvedPro);
      this.onModalClose();
    },err =>{
      console.log(err);
      this.onModalClose();
    })
  }

  // when the modal closes it will again fetch for projects in the database 
  onModalClose(){
    this.getAllProjects()
  }

  
}
