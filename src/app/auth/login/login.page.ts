import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { get, set } from '../../services/storage.service';
import { AuthService } from '../../services/auth.service';
import { ToastController } from '@ionic/angular';
import { CommonService } from 'src/app/services/common.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['../auth.scss'],
})
export class LoginPage implements OnDestroy {
  btnDisabled = false; // submit button
  //common
  user;

  constructor(private router: Router, private authService: AuthService, private toastController: ToastController, private common: CommonService) {
    this.user = this.common.user;
  }


  async presentToast(m) {
    const toast = await this.toastController.create({
      message: m,
      duration: 2000
    });
    toast.present();
  }

  loginService: any;

  login(form: NgForm) {
    this.btnDisabled = true;
    this.loginService = this.authService.login(form.value)
      .subscribe(
        data => {
          if (data != 0) {
            set("auction_data", {
              id: data["id"],
              user: form.value["username"],
              status: data["status"]
            });

            if (get("auction_data") != null) {
              //update common
              this.user.id = data["id"];
              this.user.username = form.value["username"];
              this.user.status = data["status"];
              this.user.statusColor = data["status"] == 0 ? "danger" : "primary";

              //reset form
              form.resetForm();

              //redirect
              this.router.navigateByUrl('/home');
              this.btnDisabled = false;
            } else {
              this.router.navigateByUrl('./login')
            }
          } else {
            this.btnDisabled = false;
            this.presentToast("Please check your username or password");
          }

        },

        error => {
          this.btnDisabled = false;
          this.presentToast(error);
        }

      )
  }

  ngOnDestroy() {
    this.loginService.unsubscribe();
  }
}
