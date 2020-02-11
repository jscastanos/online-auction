import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EnvService } from './env.service';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient, private env: EnvService) { }


  register(user: User) {
    return this.http.post(this.env.API_URL + 'bidder/register', {
      UserName: user.username,
      Password: user.password,
      Bdate: user.Bdate
    })
  }

  checkUsernameAvailability(username) {
    return this.http.get(this.env.API_URL + 'bidder/username/check?username=' + username)
  }


  updateProfile(id, profile) {
    return this.http.put(this.env.API_URL + 'bidder/profile/' + id + "/update/", profile
    )
  }


  public saveImage(id, imageBase64, type) {
    return this.http.post(this.env.API_URL + "bidder/profile/" + id + "/image", {
      imageBase64: imageBase64,
      type: type
    });
  }

  getUserData(id) {
    return this.http.get(this.env.API_URL + 'bidder/profile/' + id);
  }

  checkCardImage(id) {
    return this.http.get(this.env.API_URL + 'bidder/checkcardimage?id=' + id);
  }

}
