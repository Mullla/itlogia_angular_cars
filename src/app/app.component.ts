import {Component, HostListener} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'cars-app';

  orderForm = this.fb.group({
    name: ['', Validators.required],
    phone: ['', Validators.required],
    car: ['', Validators.required],
  });

  isSubmitSuccess = false;

  carsData = [
    {
      image: '1.png',
      name: 'Lamborghini Huracan Spyder',
      gear: 'полный',
      engine: 5.2,
      seats: 2
    },
    {
      image: '2.png',
      name: 'Chevrolet Corvette',
      gear: 'полный',
      engine: 6.2,
      seats: 2
    },
    {
      image: '3.png',
      name: 'Ferrari California',
      gear: 'полный',
      engine: 3.9,
      seats: 4
    },
    {
      image: '4.png',
      name: 'Lamborghini Urus',
      gear: 'полный',
      engine: 4.0,
      seats: 5
    },
    {
      image: '5.png',
      name: 'Audi R8',
      gear: 'полный',
      engine: 5.2,
      seats: 2
    },
    {
      image: '6.png',
      name: 'Chevrolet Camaro',
      gear: 'полный',
      engine: 2.0,
      seats: 4
    }
  ];

  constructor(private fb: FormBuilder) {
  }

  scrollToElem(target: HTMLElement, value?: string) {
    target.scrollIntoView();

    if (value) {
      this.orderForm.patchValue({car: value});
    }
  }

  get _name() {
    return this.orderForm.get('name')
  }

  get _phone() {
    return this.orderForm.get('phone')
  }

  get _car() {
    return this.orderForm.get('car')
  }

  trans: any;

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(e: MouseEvent) {
    this.trans = {transform: 'translate3d(' + ((e.clientX * 0.3) / 8) + 'px,' + ((e.clientY * 0.3) / 8) + 'px,0px)'};
  }

  bgPos: any;

  @HostListener('document:scroll', ['$event'])
  onScroll() {
    this.bgPos = {backgroundPositionX: '0' + (0.3 * window.scrollY) + 'px'};
  }

  onSubmit() {
    if (this.orderForm.valid) {
      this.isSubmitSuccess = true;
    }

    this.orderForm.reset();
  }
}
