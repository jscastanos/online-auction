import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { get, set } from '../../services/storage.service';
import { AuthService } from '../../services/auth.service';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['../auth.scss'],
})
export class LoginPage {

  constructor(private router: Router, private authService: AuthService, private toastController: ToastController) { }


  async presentToast(m) {
    const toast = await this.toastController.create({
      message: m,
      duration: 2000
    });
    toast.present();
  }


  login(form: NgForm) {
    this.authService.login(form.value)
      .subscribe(
        data => {
          if (data != 0) {
            set("auction_data", {
              id: data["id"],
              urn: data["URN"],
              user: form.value["username"]
            });

            if (get("auction_data") != null) {
              this.router.navigateByUrl('/home');

            } else {
              this.router.navigateByUrl('./login')
            }
          } else {
            this.presentToast("Please check your username or password");
          }

        }

      )
  }
}
