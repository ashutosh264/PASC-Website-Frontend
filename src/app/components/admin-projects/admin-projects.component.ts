import { Component, OnInit, OnChanges, OnDestroy } from '@angular/core';
import { ProjectService } from 'src/app/services/project.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-projects',
  templateUrl: './admin-projects.component.html',
  styleUrls: ['./admin-projects.component.css']
})
export class AdminProjectsComponent implements OnInit,OnDestroy {
  modalProject = null
  subscription: Subscription
  // projects = [
  //   {
  //     "title":"Heading1",
  //     "author":"Mein",
  //     "content":"Content1",
  //     "link":"www.google.com"
  //   },
  //   {
  //     "title":"Facebook",
  //     "author":"Mark Zucker",
  //     "content":"Sab visible hai",
  //     "link":"www.facebook.com"
  //   },
  //    {
  //     "title":"Microsoft",
  //     "author":"Corona",
  //     "content":"Content2",
  //     "link":"www.twitter.com"
  //   },
  // ]
  projects:any = []
  constructor(private pS: ProjectService,private router: Router) { }

  ngOnInit() {
  this.projects = []

    this.subscription = this.pS.getAllUnapprovedProjects()
    .subscribe(allprojects => {
      console.log(allprojects)

      this.projects = allprojects;
      console.log(this.projects)
    })
    this.modalProject = null
  }
 ngOnDestroy(){
   this.subscription.unsubscribe()
 }

  openInModal(project){
    this.modalProject = project;
  }

  onDelete(){
    this.pS.deleteAProject(this.modalProject._id).subscribe(del =>{
      this.router.navigate(['/adminPanel'])
    },err=>{
      console.log(err);
      this.router.navigate(['/adminPanel'])
    })
  }

}
