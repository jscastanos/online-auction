import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EnvService } from './env.service';

@Injectable({
  providedIn: 'root'
})
export class SliderService {

  constructor(private http: HttpClient, private env: EnvService) { }

  getData(reqUrl) {
    return this.http.get(this.env.API_URL + reqUrl);
  }

}
