import {Component, HostListener} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {AppService} from "./app.service";

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

  successMessage: null | string = null;
  errorMessage: null | string = null;

  carsData: any;

  category: string = 'sport';

  constructor(private fb: FormBuilder, private appService: AppService) {
  }

  ngOnInit() {
    this.appService.getData(this.category).subscribe(carsData => this.carsData = carsData);
  }

  scrollToElem(target: HTMLElement, value?: string) {
    target.scrollIntoView();

    if (value) {
      this.orderForm.patchValue({car: value});
    }
  }

  toggleCategory(category: string) {
    this.category = category;
    this.ngOnInit();
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
      this.appService.sendQuery(this.orderForm.value)
        .subscribe(
          {
            next: (response: any) => {
              this.successMessage = response.message;
              this.orderForm.reset();
            },
            error: (response) => {
              this.errorMessage = response.error.message;
            }
          });
    }
  }
}
