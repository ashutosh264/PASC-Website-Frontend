import { Injectable } from "@angular/core";
import { Blog } from "../shared/blog";
import { BLOGS } from "../shared/blogsData";
import { HttpClient } from "@angular/common/http";
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from "angularfire2/firestore";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";
import { HttpHeaders } from "@angular/common/http";
import { environment } from "../../environments/environment";

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json"
  })
};
const httpAdminOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json"
  })
};

@Injectable({
  providedIn: "root"
})
export class BlogService {
  itemsCollection: AngularFirestoreCollection<Blog>;
  items: Observable<Blog[]>;
  itemDoc: AngularFirestoreDocument<Blog>;
  Galleryitems: any;
  feedback: any;
  authToken;

  api = environment.port;
  constructor(
    public afs: AngularFirestore,
    public router: Router,
    private http: HttpClient
  ) {}

  // getUser(){
  //   let headers =  new Headers()
  //   this.loadToken()
  //   const Token = "Bearer " + this.authToken.toString()
  //   console.log(Token)
  //   const decoded = helper.decodeToken(Token);
  //   console.log(decoded.firstname)
  //   const httpOptions = {
  //     headers: new HttpHeaders({
  //       "Content-Type": "application/json",
  //       "Authorization" : Token
  //     })
  //   };

  //   return this.http.get(`${this.api}/auth/profile`,  httpOptions )
  // }

  loadToken() {
    const token = localStorage.getItem("idToken");
    this.authToken = token;
    return token;
  }

  getBlogs() {
    return this.http.get(`${this.api}/api/blogs`);
  }
  getSelectedBlog(id: string) {
    return this.http.get(`${this.api}/api/blogs/blogdetails/${id}`);
  }

  getAdminBlog() {
    this.loadToken();
    const Token = "Bearer " + this.authToken.toString();

    var httpAdmin = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: Token
      })
    };
    return this.http.get<Blog[]>(
      `${this.api}/api/blogs/reviewblogs`,
      httpAdmin
    );
  }

  addBlog(data: Blog) {
    return this.http.post(`${this.api}/api/blogs/new`, data, httpOptions);
  }

  approveBlog(id: string) {
    return this.http.put(
      `${this.api}/api/blogs/reviewblogs/approve/${id}`,
      httpAdminOptions
    );
  }

  deleteBlog(id: string) {
    return this.http.delete(
      `${this.api}/api/blogs/admin/delete/${id}`,
      httpAdminOptions
    );
  }
  createFeed(feed) {
    return this.http.post(`${this.api}/feedback/aboutus`, feed, httpOptions);
  }
  getFeed() {
    return this.http.get(`${this.api}/feedback/feedback`);
  }
  getProjects() {
    return this.http.get(`${this.api}/api/projects`);
  }
  addProject(data) {
    return this.http.post(`${this.api}/api/projects/new`, data, httpOptions);
  }
  viewGallery() {
    return this.http.get(`${this.api}/thumbnail/viewgallery`);
  }
  // uploadImage(file) {
  //   const formData = new FormData();
  //   formData.append("photo", file);
  //   return this.http.post(`${this.api}/thumbnail/upload`, formData);
  // }
  // uploadGallery(files, category) {
  //   const formData = new FormData();
  //   formData.append("category", category);
  //   for (var i = 0; i < files.length; i++) {
  //     formData.append("photo", files[i]);
  //   }
  //   return this.http.post(`${this.api}/thumbnail/gallery/upload`, formData);
  // }

  addFiles(fileObject) {
    console.log('request Sent');
    return this.http.post(`${this.api}/thumbnail/upload/firebase`, fileObject);

  }
  // -----------FIREBASE-------------

  getBlogsFromFirestore() {
    this.items = this.afs
      .collection("blogs", ref => ref.orderBy("date", "desc"))
      .snapshotChanges()
      .pipe(
        map(changes => {
          return changes.map(a => {
            const data = a.payload.doc.data() as Blog;
            data.id = a.payload.doc.id;
            return data;
          });
        })
      );
    return this.items;
  }
  getAdminBlogsFromFirestore() {
    this.items = this.afs
      .collection("blogs")
      .snapshotChanges()
      .pipe(
        map(changes => {
          return changes.map(a => {
            const data = a.payload.doc.data() as Blog;
            data.id = a.payload.doc.id;

            if (!data.approve) {
              return data;
            }
          });
        })
      );
    return this.items;
  }
  getSelectedBlogFromFirestore(id: string) {
    this.itemDoc = this.afs.doc<Blog>(`blogs/${id}`);
    return this.itemDoc.valueChanges();
  }
  create(data: Blog) {
    this.itemsCollection.add(data);
  }

  createfeed(value) {
    return this.afs.collection("feedback").add({
      name: value.name,
      subject: value.subject,
      email: value.email,
      text: value.text
    });
  }

  getFeedback() {
    return this.afs
      .collection("feedback")
      .snapshotChanges()
      .pipe(
        map(changes => {
          return changes.map(a => {
            const data = a.payload.doc.data() as any;
            data.id = a.payload.doc.id;
            return data;
          });
        })
      );

    return this.items;
  }

  getImages() {
    this.Galleryitems = this.afs.collection("files").valueChanges();
    return this.Galleryitems;
  }
  approve(id: string) {
    this.itemDoc = this.afs.doc<Blog>(`blogs/${id}`);
    this.itemDoc.update({ approve: true });
  }
  delete(id: string) {
    this.itemDoc = this.afs.doc<Blog>(`blogs/${id}`);
    this.itemDoc.delete();
    this.router.navigate(["reviewblogs"]);
  }
  provideId(id: string) {
    this.itemDoc = this.afs.doc<Blog>("blogs/" + id);
    this.itemDoc.update({ id: id });
  }
}
