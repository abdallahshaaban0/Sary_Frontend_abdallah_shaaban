import { HeroInterface } from './../../../../core/models/hero.interface';
import { HeroService } from './../../../../services/hero.service';
import { Component, OnInit, OnDestroy, OnChanges, SimpleChanges, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-hero-table',
  templateUrl: './hero-table.component.html',
  styleUrls: ['./hero-table.component.scss']
})
export class HeroTableComponent implements OnInit, OnChanges {
  @Input() formDataInput!: {};
  @Input() formFields!: [];
  @Output() sliderValChanged = new EventEmitter();

  toggleSliderVal!: any;
  heroList: HeroInterface[] = [];

  constructor(private _heroService: HeroService) { }

  ngOnInit(): void {
    // this.getHeroList(this.formDataInput);
  }
  ngOnChanges(changes: SimpleChanges) {
    console.log(changes.formDataInput.currentValue);
    this.getHeroList(changes.formDataInput.currentValue);
  }
  toggleSlider() {
    this.toggleSliderVal = !this.toggleSliderVal;
    this.sliderValChanged.emit(this.toggleSliderVal);
  }
  getHeroList(changesObj: {}) {
    this._heroService.getHeroList(changesObj).subscribe((result: any) => {
      this.heroList = result;
    })
  }

}
