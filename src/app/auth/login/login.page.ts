import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { get, set } from '../../services/storage.service';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {


  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
  }

  login(form: NgForm) {

    this.authService.login(form.value)
      .subscribe(
        data => {
          set("userID", data["id"]);
          set("username", form.value["username"]);
          if (get("userID") != null) {
            this.router.navigateByUrl('/home');

          } else {
            this.router.navigateByUrl('./login')
          }
        },
        err => console.log("no user found")

      )



  }
}
