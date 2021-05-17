import { getCurrentRouteState } from './../../core/store/selectors';
import { StoreRootState } from './../../core/store/index';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { trigger, transition, query, animateChild, style, animate } from '@angular/animations';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss'],
  animations: [
    trigger('ngIfAnimation', [
      transition(':enter, :leave', [
        query('@*', animateChild())
      ])
    ]),
    trigger('easeInOut', [
      transition('void => *', [
        style({
          opacity: 0
        }),
        animate("500ms ease-in", style({
          opacity: 1
        }))
      ]),
      transition('* => void', [
        style({
          opacity: 1
        }),
        animate("500ms ease-in", style({
          opacity: 0
        }))
      ])
    ])
  ]
})
export class HeroComponent implements OnInit, OnDestroy {
  private subscriptions: { [key: string]: any } = {};

  is_show_slider: boolean = true;
  queryParams: {} = {}


  constructor(private store: Store<StoreRootState>) {
    this.routerSubscriber();
  }

  ngOnInit(): void { }

  routerSubscriber() {
    this.subscriptions.routerSelector = this.store
      .pipe(select(getCurrentRouteState))
      .subscribe((route: any) => {
        this.queryParams = route.queryParams
        console.log(this.queryParams);
      });
  }
  toggleSlider_changed(evt: any) {
    console.log("slider value" + evt);
    this.is_show_slider = !this.is_show_slider;
  }
  ngOnDestroy(): void {
    this.subscriptions.routerSelector.unsubscribe();
  }
}
