import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ProfileService } from 'src/app/services/profile.service';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['../auth.scss'],
})
export class RegisterPage implements OnInit {
  registerForm;

  validations = {
    username: false,
    username_available: false,
    password: false,
    confirm_password: false,
    DOB: false,
    readTAC: false,
    underAge: false
  }


  userData: User;

  constructor(public formBuilder: FormBuilder, private profileService: ProfileService, private authService: AuthService, public toast: ToastController, public router: Router) {
    this.createForm();
  }

  ngOnInit() {
  }

  async initToast(message, duration) {
    const initToast = await this.toast.create({
      message: message,
      duration: duration
    });

    initToast.present();
  }

  private createForm() {
    this.registerForm = this.formBuilder.group({
      'username': new FormControl('', Validators.required),
      'password': new FormControl('', Validators.required),
      'confirm_password': new FormControl('', Validators.required),
      'DOB': new FormControl('', Validators.required),
      'readTAC': new FormControl(false),
      'underAge': new FormControl(false)
    },
      {
        validators: [
          this.checkpassword.bind(this),
          this.checkUsernameAvailability.bind(this)]
      })
  }


  checkpassword(formGroup: FormGroup) {
    const { value: password } = formGroup.get('password');
    const { value: confirm_password } = formGroup.get('confirm_password');

    return password === confirm_password ? null : { passwordNotMatch: true }
  }

  checkUsernameAvailability(formGroup: FormGroup) {

    const { value: username } = formGroup.get('username');

    if (username != null && username != "") {

      this.profileService.checkUsernameAvailability(username)
        .subscribe(data => {
          this.validations.username_available = !<boolean>data;
        });

      return this.validations.username_available ? null : { usernameNotAvailable: true };

    }
    else {
      return null;
    }
  }

  defaultValues(validations) {
    for (let key in validations) {
      this.validations[key] = false
    }
  }

  updateValidation(e) {
    if (e == "readTAC") {
      this.validations[e] = this.registerForm.value[e];
      return;
    }

    if (e == "DOB") {
      var age = this.getAge(this.registerForm.value[e])

      if (age >= 18)
        this.validations["underAge"] = false;
      else
        this.validations["underAge"] = true;
      return;
    }

    this.validations[e] = this.registerForm.value[e].length > 0 ? false : true;
  }

  register(form) {

    //check validations 
    this.validations.username = !form.value.username ? true : false;
    this.validations.password = !form.value.password ? true : false;
    this.validations.confirm_password = !form.value.confirm_password ? true : false;
    this.validations.DOB = !form.value.DOB ? true : false;
    this.validations.readTAC = form.value.readTAC;

    if (form.value.username != "" &&
      form.value.password != "" &&
      form.value.confirm_password != "" &&
      form.value.DOB != "" &&
      form.value.readTAC &&
      this.validations.underAge == false) {

      this.userData = {
        username: form.value.username,
        password: form.value.password,
        Bdate: form.value.DOB
      }

      this.authService.register(this.userData).subscribe(data => {
        let params = {
          queryParams: {
            id: JSON.stringify(data)
          }
        }

        this.defaultValues(this.validations);
        this.router.navigate(["/getting-started"], params);
      },
        response => {
          this.initToast("Error in saving. Please try again", 2000);
        })

    } else {

      this.initToast("Please provide your information above", 2000);
    }



  }


  getAge(dob) {
    return Math.floor((new Date().getTime() - new Date(dob).getTime()) / 3.15576e+10)

  }


}
