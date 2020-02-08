import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EnvService } from './env.service';
import { Profile } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient, private env: EnvService) { }

  checkUsernameAvailability(username) {
    return this.http.get(this.env.API_URL + 'auth/username/check?username=' + username)
  }


  updateProfile(id, profile) {
    return this.http.put(this.env.API_URL + 'auth/profile/' + id + "/update/", profile
    )
  }


  public saveImage(id, imageBase64, type) {
    return this.http.post(this.env.API_URL + "auth/profile/" + id + "/image", {
      imageBase64: imageBase64,
      type: type
    });
  }
}
