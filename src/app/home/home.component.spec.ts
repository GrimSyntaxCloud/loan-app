import { AppModule } from '../app.module';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('preserves the monthly payment and total interest calculation', () => {
    component.loanForm.setValue({loanAmount: '10000', interestRate: '5', years: '3'});
    component.onSubmit();
    expect(component.monthlyPayment).toBe(299.71);
    expect(component.interest).toBeCloseTo(789.56, 2);
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('299.71');
  });
  it('resets inputs and results without submitting the empty form', () => {
    component.loanForm.setValue({loanAmount: '10000', interestRate: '5', years: '3'});
    component.onSubmit();
    fixture.nativeElement.querySelector('button.btn-color-primary').click();
    expect(component.monthlyPayment).toBe(0);
    expect(component.interest).toBe(0);
    expect(component.loanForm.value.loanAmount).toBeNull();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
