import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnvService {
  URL = 'http://192.168.1.5:69';
  API_URL = 'http://192.168.1.5:69/api/';

  constructor() { }
}
