import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import { JwtHelperService } from "@auth0/angular-jwt";
import { CookieService } from "ngx-cookie-service";
import { HttpHeaders } from "@angular/common/http";
import { auth } from "firebase";
import { ActivatedRoute } from "@angular/router";
const helper = new JwtHelperService();

@Component({
  selector: "app-google-oauth",
  templateUrl: "./google-oauth.component.html",
  styleUrls: ["./google-oauth.component.css"]
})
export class GoogleOauthComponent implements OnInit {
  constructor(
    public authService: AuthService,
    public router: Router,
    public cookie: CookieService,
    public route: ActivatedRoute
  ) {}

  authToken;
  authUser;
  result;

  async ngOnInit() {
    // this.authToken = this.cookie.get("jwt")
    // this.cookie.delete("jwt")
    this.authToken = this.route.snapshot.params["token"];
    this.authUser = helper.decodeToken(this.authToken);
    console.log(this.authToken);
    console.log(this.authUser);
    if (this.authUser.errgol) {
      (await this.authService.loginGoogle(this.authUser.subject)).subscribe(
        res => {
          this.result = res;
          if (this.result.logged) {
            this.authService.storeToken(this.authToken);
            setTimeout(() => {
              window.alert("Logged in with Google Account");
              this.router.navigate(["blogs"]);
            }, 1000);
          } else {
            window.alert("An Error Occured ! Login Again");
            this.router.navigate(["login"]);
          }
        }
      );
    }
  }
}
