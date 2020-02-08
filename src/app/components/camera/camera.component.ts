import { Component } from '@angular/core';
import { CameraService } from 'src/app/services/camera.service';


@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.scss'],
})
export class CameraComponent {
  croppedImage;

  constructor(public cameraService: CameraService) {
  }

  capture() {
    this.cameraService.takePhoto();
  }

  upload() {
    this.cameraService.uploadPhoto();
  }

}
