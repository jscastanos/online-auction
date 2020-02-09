import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor() { }

  user = {
    id: null,
    username: null,
    status: null,
    statusColor: 'medium'
  }
}
