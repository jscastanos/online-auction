import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnvService {
  URL = 'http://192.168.1.10:69/';
  API_URL = 'http://192.168.1.10:69/api/';

  constructor() { }
}
