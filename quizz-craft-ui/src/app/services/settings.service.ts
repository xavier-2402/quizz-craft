import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor() { }

  getImagesCarrousel():any[]{
    let array:any[]=[
      {img:'../../../assets/login/education.png'},
      {img:'../../../assets/login/tools.png'}
    ]

    return array;
  }
}
