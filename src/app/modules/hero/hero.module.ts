import { SortDirective } from './../../core/directive/sort.directive';
import { CountryListService } from './../../core/services/country-list.service';
import { SharedBootstrapModule } from './../../core/modules/bootstrap/shared.bootstrap.module';
import { Routes, RouterModule } from '@angular/router';
import { HeroComponent } from './hero.component';
import { HeroService } from './../../services/hero.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterComponent } from './components/filter/filter.component';
import { HeroTableComponent } from './components/hero-table/hero-table.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


const routes: Routes = [{
  path: '', component: HeroComponent,
}];
@NgModule({
  declarations: [
    HeroComponent,
    FilterComponent,
    HeroTableComponent,
    SortDirective
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedBootstrapModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    HeroService,
    CountryListService
  ]
})
export class HeroModule { }
