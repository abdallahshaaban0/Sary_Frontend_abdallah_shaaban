import { Directive, OnChanges, Input, HostListener, ElementRef, Renderer2, SimpleChanges, OnInit, OnDestroy } from '@angular/core';
import { NgModel } from '@angular/forms';
@Directive({
  selector: '[changeBG]'
})
export class ChangeBGDirective {

  constructor(el: ElementRef) {
    el.nativeElement.style.backgroundColor = '#fff';
  }
}
