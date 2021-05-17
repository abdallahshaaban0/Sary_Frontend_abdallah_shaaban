import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CountryListService {
  apiUrl = "http://countryapi.gear.host/v1/Country/getCountries";
  constructor(private _httpService: HttpClient) { }

  getCountryList() {
    return this._httpService.get(this.apiUrl);
  }
}
