import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class HeroService {

  apiUrl = environment.apiURL;

  // start another way to send data instead of ngrx
  // private sliderSub = new BehaviorSubject(true)
  // sliderData = this.sliderSub.asObservable();
  // end another way to send data instead of ngrx

  constructor(private _httpClientService: HttpClient) { }


  getHeroList(objectIfExist: any) {
    let apiUrl = this.apiUrl + 'heros'
    objectIfExist = this.obj_2_queryParams(objectIfExist);
    apiUrl += objectIfExist.length > 0 ? `?${objectIfExist}` : '';
    return this._httpClientService.get(apiUrl);
  }

  getFormFields() {
    return this._httpClientService.get(this.apiUrl + 'heroFormFields')
  }

  // setSliderData(val: boolean) {
  //   this.sliderSub.next(val);
  // }

  obj_2_queryParams(params: any) {
    let query = Object.keys(params).map(key => key + '=' + params[key]).join('&');
    return query;
  }
}
