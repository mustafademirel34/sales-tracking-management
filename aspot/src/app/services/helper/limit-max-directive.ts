import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[limitToMax]'
})
export class LimitToMaxDirective {
  @Input('limitToMax') maxLength!: number; // 'maxLength' değişkenini 'Input' olarak işaretledik

  constructor(private elementRef: ElementRef) {}

  @HostListener('input', ['$event'])
  onInput(event: Event) {
    const inputElement = this.elementRef.nativeElement as HTMLInputElement;
    const value = inputElement.value;

    // SIFIR YOK SIFIRI YEDİM
    // if(value.charAt(0) !== '0')
    //   inputElement.value = "0"+inputElement.value;

    if (value.length > this.maxLength) {
      inputElement.value = value.slice(0, this.maxLength);
    }
    
  }
}
