import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EnvService } from './env.service';

@Injectable({
  providedIn: 'root'
})
export class BrowseByIdService {

  constructor(private http: HttpClient, private env: EnvService) {

  }

}
