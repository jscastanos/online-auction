import { Injectable } from '@angular/core';
import { Plugins, CameraResultType, CameraSource, Filesystem } from '@capacitor/core'
const { Camera } = Plugins;

interface Photo {
  base64: string;
}

@Injectable({
  providedIn: 'root'
})


export class CameraService {
  public photo: Photo = {
    base64: ""
  };

  constructor() { }

  public async takePhoto() {
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Base64,
      source: CameraSource.Camera,
      quality: 100,
      width: 200,
      height: 200,

    });

    this.photo = {
      base64: capturedPhoto.base64String
    }
  }

  public async uploadPhoto() {
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Base64,
      source: CameraSource.Photos,
      quality: 100,
      width: 200,
      height: 200,

    });

    this.photo = {
      base64: capturedPhoto.base64String
    }

  }
}
