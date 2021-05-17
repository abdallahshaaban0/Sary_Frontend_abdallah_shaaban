import { ChangeBGDirective } from '../../directive/change-BG.directive';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [ChangeBGDirective],
  imports: [
    CommonModule,
    AccordionModule.forRoot(),
    TypeaheadModule.forRoot(),
    BsDatepickerModule.forRoot()
  ],
  exports: [
    AccordionModule,
    TypeaheadModule,
    BsDatepickerModule,
    ChangeBGDirective
  ]
})
export class SharedBootstrapModule { }
