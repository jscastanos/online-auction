import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { ProfileService } from 'src/app/services/profile.service';
import { Profile } from 'src/app/models/user';
import { NgForm } from '@angular/forms';
import { Plugins, CameraResultType, CameraSource } from '@capacitor/core'
const { Camera } = Plugins;

@Component({
  selector: 'app-getting-started',
  templateUrl: './getting-started.page.html',
  styleUrls: ['../auth.scss'],
})
export class GettingStartedPage implements OnInit, OnDestroy {
  step = 0;
  titles = ["Personal Information", "Address Details", "Additional Information", "Upload Image"];
  title = this.titles[this.step];
  id;
  image = null;

  updateData: Profile = {
    FirstName: "",
    MiddleName: "",
    LastName: "",
    Address: "",
    ContactNo: "",
    Occupation: "",
  };

  //api
  saveImage: any;
  updateProfile: any;

  constructor(public toast: ToastController, private router: Router, private route: ActivatedRoute, private profileService: ProfileService) {
    //get params
    this.route.queryParams.subscribe(params => {
      this.id = JSON.parse(params.id.toString());
    });

  }

  ngOnInit() {
  }

  async presentToast(msg, duration) {
    const toast = await this.toast.create({
      message: msg,
      duration: 2000,
    })

    toast.present();
  }


  formWizard(form: NgForm) {
    this.step++;
    this.title = this.titles[this.step];

    //populate model
    let completeAddress = "";

    for (let key of Object.keys(form.value)) {
      if (key == "add" || key == "barangay" || key == "city") {
        completeAddress += (form.value[key] + ", ")

      } else if (key == "province") {
        completeAddress += form.value["province"];

        this.updateData.Address = completeAddress;
      } else {
        this.updateData[key] = form.value[key]
      }
    }
  }


  async capture() {
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Base64,
      source: CameraSource.Camera,
      quality: 100,
      width: 200,
      height: 200
    })

    this.image = capturedPhoto.base64String;
  }

  async upload() {
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Base64,
      source: CameraSource.Photos,
      quality: 100,
      width: 200,
      height: 200
    })

    this.image = capturedPhoto.base64String;
  }

  sendData() {
    if (this.image != null) {
      this.saveImage = this.profileService.saveImage(this.id, this.image, 0).subscribe();
    }
    this.updateProfile = this.profileService.updateProfile(this.id, this.updateData).subscribe(result => {
      this.presentToast("Your profile is being updated. Please wait", 2000);


      setTimeout(() => {
        this.router.navigateByUrl("/");
      }, 3000);

    }, response => {
      this.presentToast("Error saving file. Please try again", 2000);
    })
  }

  ngOnDestroy() {
    this.updateProfile.unsubscribe();
    if (this.saveImage != null)
      this.saveImage.unsubscribe();
  }
}
