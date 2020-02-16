import { Component, OnInit } from '@angular/core';
import { Plugins, CameraSource, CameraResultType } from '@capacitor/core'
import { CommonService } from 'src/app/services/common.service';
import { ProfileService } from 'src/app/services/profile.service';
import { EnvService } from 'src/app/services/env.service';
import { Router, NavigationEnd } from '@angular/router';
import { ToastController } from '@ionic/angular';
const { Camera } = Plugins;

@Component({
  selector: 'app-bidder-supporting-id',
  templateUrl: './bidder-supporting-id.page.html',
  styleUrls: ['./bidder-supporting-id.page.scss'],
})
export class BidderSupportingIdPage implements OnInit {

  images = {
    front: null,
    back: null,
  }

  serverHasImage = {
    front: 0,
    back: 0
  }

  //common
  user;
  url;



  constructor(private toastController: ToastController, private common: CommonService, private profileService: ProfileService, private env: EnvService, private router: Router) {
    this.user = this.common.user;
    this.url = this.env.URL;

    this.router.events.subscribe((ev) => {
      if (ev instanceof NavigationEnd) {

        if (ev.url == "/bidder-supporting-id") {
          this.checkCardImage();
        } else {
          if (this.checkImage != null)
            this.checkImage.unsubscribe();
        }
      }


    });
  }

  ngOnInit() {
  }

  async presentToast(m) {
    const toast = await this.toastController.create({
      message: m,
      duration: 2000
    });
    toast.present();
  }

  async capture(type) {

    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Base64,
      source: CameraSource.Camera,
      quality: 100,
      width: 200,
      height: 200
    });

    if (type == 0) {
      this.serverHasImage.front = 1;
      this.images.front = ("data:image/png;base64," + capturedPhoto.base64String);
    }
    else {
      this.serverHasImage.back = 1;
      this.images.back = ("data:image/png;base64," + capturedPhoto.base64String);
    }


  }

  async upload(type) {
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Base64,
      source: CameraSource.Photos,
      quality: 100,
      width: 200,
      height: 200
    });

    if (type == 0) {
      this.serverHasImage.front = 1;
      this.images.front = ("data:image/png;base64," + capturedPhoto.base64String);
    }
    else {
      this.serverHasImage.back = 1;
      this.images.back = ("data:image/png;base64," + capturedPhoto.base64String);
    }

  }

  //api
  savePhoto;
  checkImage;

  submitPhoto() {

    for (let image of Object.keys(this.images)) {
      let type = (image == "front") ? 1 : 2;

      if (this.serverHasImage[image] != 0) {
        this.savePhoto = this.profileService.saveImage(this.user.id, this.images[image].split(",")[1], type).subscribe(data => {
          this.presentToast("Submitted successfully, you will be redirect in 3 seconds");
          setTimeout(() => {
            this.router.navigateByUrl("/profile")
          }, 3000)
        })
      }
    }
  }

  checkCardImage() {

    this.checkImage = this.profileService.checkCardImage(this.user.id).subscribe(data => {

      for (let key of Object.keys(data)) {

        let imageUrl = this.url + "/account/retrieveImage?id=" + this.user.id;

        let type = (key == "front") ? 1 : 2;
        this.images[key] = data[key] != 0 ? imageUrl + "&type=" + type : "../assets/placeholder.png";

        this.serverHasImage[key] = data[key];
      }

    })

  }

}
