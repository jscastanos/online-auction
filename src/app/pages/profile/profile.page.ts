import { Component, OnInit, OnDestroy } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { EnvService } from "src/app/services/env.service";
import { CommonService } from "src/app/services/common.service";
import { ProfileService } from "src/app/services/profile.service";
import { Profile } from "src/app/models/user";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
  NgForm
} from "@angular/forms";
import { ToastController } from "@ionic/angular";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.page.html",
  styleUrls: ["./profile.page.scss"]
})
export class ProfilePage implements OnInit {
  user;
  url;

  userData: Profile = {
    FirstName: "",
    MiddleName: "",
    LastName: "",
    Address: "",
    ContactNo: "",
    Occupation: ""
  };

  currForm = null;

  newAddress = [];

  passwordForm;

  profileImage;

  //api
  getData;
  updateData;
  savePhoto;

  constructor(
    public formBuilder: FormBuilder,
    private auth: AuthService,
    private env: EnvService,
    private common: CommonService,
    private profileService: ProfileService,
    private toast: ToastController
  ) {
    this.user = this.common.user;
    this.url = this.env.URL;
  }
  ngOnInit() {
    this.loadData();
    this.createForm();
  }

  private createForm() {
    this.passwordForm = this.formBuilder.group(
      {
        old_password: new FormControl("", Validators.required),
        new_password: new FormControl("", Validators.required),
        confirm_password: new FormControl("", Validators.required)
      },
      {
        validators: [this.checkpassword.bind(this)]
      }
    );
  }

  checkpassword(formGroup: FormGroup) {
    const { value: new_password } = formGroup.get("new_password");
    const { value: confirm_password } = formGroup.get("confirm_password");

    return new_password === confirm_password
      ? null
      : { passwordNotMatch: true };
  }

  updatePassword(form, formDirective) {
    if (
      form.value.new_password == form.value.confirm_password &&
      form.value.old_password != "" &&
      form.value.new_password != "" &&
      form.value.confirm_password != ""
    ) {
      this.profileService
        .updatePassword(
          this.user.id,
          form.value.old_password,
          form.value.new_password
        )
        .subscribe(data => {
          if (data == 1) {
            this.presentToast("Password updated successfully!");
            formDirective.resetForm();
            this.currForm = null;
          } else {
            this.presentToast(data);
          }
        });
    } else {
      this.presentToast("Please provide details");
    }
  }

  loadData() {
    //get profile data
    this.getData = this.profileService
      .getUserData(this.user.id)
      .subscribe(data => {
        //populate model
        for (let key of Object.keys(data)) {
          this.userData[key] = data[key];
        }

        //split address
        if (this.userData.Address != null)
          this.newAddress = this.userData.Address.split(", ");

        this.getData.unsubscribe();
      });
  }

  async presentToast(message) {
    const toast = await this.toast.create({
      message: message,
      duration: 2000
    });

    toast.present();
  }

  openForm(formNo) {
    this.currForm = formNo;
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
          completeAddress += form.value[key] + ", ";
        }

        this.newAddress = completeAddress.split(", ");
        this.userData.Address = completeAddress;
        break;
      case 2:
        this.userData.ContactNo = form.value["ContactNo"];
        break;
      case 3:
        this.userData.Occupation = form.value["Occupation"];
        break;
    }

    this.presentToast("Your profile is being updated, please wait.");

    this.updateData = this.profileService
      .updateProfile(this.user.id, this.userData)
      .subscribe(
        result => {
          this.presentToast("Updated Successfully");
          this.currForm = null;
        },

        error => {
          this.presentToast("Failed to updated profile!");
          this.loadData();
        }
      );
  }

  ionViewDidLeave() {
    if (this.updateData != null) this.updateData.unsubscribe();

    if (this.savePhoto != null) this.savePhoto.unsubscribe();
  }
}
