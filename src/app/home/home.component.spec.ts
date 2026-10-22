import { AppModule } from '../app.module';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('preserves the monthly payment and total interest calculation', () => {
    component.loanForm.setValue({
      loanAmount: '10000',
      interestRate: '5',
      years: '3',
    });
    component.onSubmit();
    expect(component.monthlyPayment).toBe(299.71);
    expect(component.interest).toBeCloseTo(789.56, 2);
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('299.71');
  });
  it('resets inputs and results without submitting the empty form', () => {
    component.loanForm.setValue({
      loanAmount: '10000',
      interestRate: '5',
      years: '3',
    });
    component.onSubmit();
    fixture.nativeElement.querySelector('button.btn-color-primary').click();
    expect(component.monthlyPayment).toBe(0);
    expect(component.interest).toBe(0);
    expect(component.loanForm.value.loanAmount).toBeNull();
  });
  it('handles zero interest without NaN or artificial interest', () => {
    component.loanForm.setValue({
      loanAmount: '1000',
      interestRate: '0',
      years: '3',
    });
    component.onSubmit();
    expect(component.monthlyPayment).toBe(27.78);
    expect(component.interest).toBe(0);
    expect(component.errorMessage).toBe('');
  });
  it('retains cents instead of truncating the principal', () => {
    component.loanForm.setValue({
      loanAmount: '12000.50',
      interestRate: '0',
      years: '1',
    });
    component.onSubmit();
    expect(component.monthlyPayment).toBe(1000.04);
  });
  it('rejects invalid inputs and clears stale results', () => {
    for (const values of [
      { loanAmount: '10000oops', interestRate: '5', years: '3' },
      { loanAmount: '10000', interestRate: '', years: '3' },
      { loanAmount: '10000', interestRate: '-5', years: '3' },
      { loanAmount: '10000', interestRate: '5', years: '1.5' },
    ]) {
      component.monthlyPayment = 100;
      component.loanForm.setValue(values);
      component.onSubmit();
      expect(component.monthlyPayment).toBe(0);
      expect(component.errorMessage).not.toBe('');
      fixture.detectChanges();
      expect(
        fixture.nativeElement.querySelector('[role="alert"]'),
      ).toBeTruthy();
    }
  });
  it('draws a finite amortization path with the original principal and a zero endpoint', () => {
    component.loanForm.setValue({
      loanAmount: '25000',
      interestRate: '6.5',
      years: '5',
    });
    component.onSubmit();
    expect(component.hasResult).toBe(true);
    expect(component.balancePath.startsWith('M0,15.00')).toBe(true);
    expect(component.balancePath.endsWith('L600,175.00')).toBe(true);
    expect(component.balancePath).not.toMatch(/NaN|Infinity/);
    // Positive-interest balance declines more slowly than a straight line.
    const midpoint = Number(component.balancePath.match(/L300,([\d.]+)/)?.[1]);
    expect(midpoint).toBeLessThan(95);
    component.clearForm();
    expect(component.balancePath).toBe('');
    expect(component.hasResult).toBe(false);
  });
  it('draws a straight zero-interest balance curve and clears it for invalid input', () => {
    component.loanForm.setValue({
      loanAmount: '12000',
      interestRate: '0',
      years: '1',
    });
    component.onSubmit();
    expect(component.balancePath).toContain('L300,95.00');
    component.loanForm.patchValue({ years: '1.5' });
    component.onSubmit();
    expect(component.hasResult).toBe(false);
    expect(component.balancePath).toBe('');
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
