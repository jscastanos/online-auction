import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { EnvService } from './env.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = false;
  token: any;

  constructor(
    private http: HttpClient,
    private env: EnvService
  ) { }

  login(user: User) {
    return this.http.post(this.env.API_URL + 'auth/user',
      { username: user.username, password: user.password }
    )
  }
}
