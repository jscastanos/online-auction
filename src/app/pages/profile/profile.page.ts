import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { EnvService } from 'src/app/services/env.service';
import { CommonService } from 'src/app/services/common.service';
import { ProfileService } from 'src/app/services/profile.service';
import { Profile } from 'src/app/models/user';
import { NgForm } from '@angular/forms';
import { ToastController, ModalController } from '@ionic/angular';
import { BidderSupportingIdPage } from '../bidder-supporting-id/bidder-supporting-id.page';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit, OnDestroy {
  user;
  url;

  userData: Profile = {
    FirstName: "",
    MiddleName: "",
    LastName: "",
    Address: "",
    ContactNo: "",
    Occupation: "",
  };

  currForm = null;

  newAddress = [];

  //api
  getData;
  updateData;

  constructor(private auth: AuthService, private env: EnvService, private common: CommonService, private profileService: ProfileService, private toast: ToastController, private modal: ModalController) {
    this.user = this.common.user;
    this.url = this.env.URL;
  }
  ngOnInit() {
    this.loadData();

  }

  loadData() {
    //get profile data
    this.getData = this.profileService.getUserData(this.user.id).subscribe(data => {
      //populate model
      for (let key of Object.keys(data)) {
        this.userData[key] = data[key]
      }

      //split address
      this.newAddress = (this.userData.Address).split(", ");
      this.getData.unsubscribe();
    });
  }


  async presentToast(message) {
    const toast = await this.toast.create({
      message: message,
      duration: 2000,
    })

    toast.present();
  }

  async presentModal(page) {
    const modal = await this.modal.create({
      component: page
    })

    return modal.present();
  }

  openForm(formNo) {
    this.currForm = formNo;
  }

  openBidderSupportingIdModal() {
    this.presentModal(BidderSupportingIdPage);
  }

  resetForm() {
    this.currForm = null;
  }

  update(form: NgForm, formNo) {

    switch (formNo) {
      case 0:
        this.userData.FirstName = form.value["FirstName"];
        this.userData.MiddleName = form.value["MiddleName"];
        this.userData.LastName = form.value["LastName"];
        break;
      case 1:
        let completeAddress = "";

        for (let key of Object.keys(form.value)) {
          completeAddress += (form.value[key] + ", ")
        }

        this.newAddress = (completeAddress).split(", ");
        this.userData.Address = completeAddress;
        break;
      case 2:
        this.userData.ContactNo = form.value["ContactNo"];
        break;
      case 3:
        this.userData.Occupation = form.value["Occupation"];
        break;

    }

    this.presentToast("Your profile is being updated, please wait.")

    this.updateData = this.profileService.updateProfile(this.user.id, this.userData)
      .subscribe(result => {
        this.presentToast("Updated Successfully");
        this.currForm = null;

      },

        error => {
          this.presentToast("Failed to updated profile!");
          this.loadData();
        });

    this.updateData.unsubscribe();


  }

  ngOnDestroy() {
    this.updateData.unsubscribe();
  }

}
