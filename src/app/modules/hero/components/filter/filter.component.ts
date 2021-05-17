import { Router } from '@angular/router';
import { CountryListService } from './../../../../core/services/country-list.service';
import { Component, OnInit, ViewEncapsulation, ElementRef, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead';
import { HeroService } from '../../services/hero.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FilterComponent implements OnInit {
  @Input() formDataInput!: {};
  @Input() formFields!: [];

  heroFields: [] = [];
  countryList!: [];
  filterForm!: FormGroup;
  user_phone_pattern = /^\+?1?\s*?\(?\d{3}(?:\)|[-|\s])?\s*?\d{3}[-|\s]?\d{4}$/;

  constructor(private _countryService: CountryListService,
    private _routerService: Router,
    private _heroService: HeroService
  ) {
    this.getCountryList();
    this.getHeroFields();
  }



  ngOnInit(): void {
    this.initForm();
    this.filterForm.patchValue(this.formDataInput);
    // this.toggleSlider_getter();
  }

  initForm() {
    this.filterForm = new FormGroup({
      email: new FormControl("", [Validators.email]),
      user_phone: new FormControl("", [Validators.pattern(this.user_phone_pattern)]),
      user_name: new FormControl(""),
      company: new FormControl(""),
      country: new FormControl(""),
      date: new FormControl("")
    })
  }
  checkQueryParamVal(queryParams: any, key: string) {
    if (this.filterForm.value[key].length > 0) {
      queryParams[key] = this.filterForm.value[key];
    }
  }
  filterFn() {
    let queryParams: any = {};
    for (const key in this.filterForm.value) {
      if (this.filterForm.value.hasOwnProperty(key)) {
        if (key == "date" && this.filterForm.value[key] != null) {
          this.checkQueryParamVal(queryParams, key);
        } else {
          this.checkQueryParamVal(queryParams, key);
        }
      }
    }
    let query = Object.keys(queryParams).map(key => key + '=' + queryParams[key]).join('&');

    this._routerService.navigateByUrl(`hero?${query}`);
  }

  getHeroFields() {
    this._heroService.getFormFields().subscribe((res: any) => {
      this.heroFields = res;
    })
  }

  getCountryList() {
    // let searchKey = evt.srcElement.value;
    this._countryService.getCountryList().subscribe((res: any) => {
      this.countryList = res["Response"];
    })
  }

  onSelectCountry(event: TypeaheadMatch): void {
    console.log(event.item);
  }

  typeaheadNoResults(event: boolean): void {
    console.log(event)
  }
}
