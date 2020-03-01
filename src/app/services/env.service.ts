import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class EnvService {
  URL = "http://onlineauction-001-site1.dtempurl.com/";
  API_URL = "http://onlineauction-001-site1.dtempurl.com/api/";
  // URL = "http://localhost:69/";
  // API_URL = "http://localhost:69/api/";
  constructor() {}
}
