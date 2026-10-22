import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective } from '@angular/forms';

@Component({
  standalone: false,
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  loanForm: FormGroup;
  @ViewChild(FormGroupDirective) formDirective?: FormGroupDirective;
  errorMessage = '';
  monthlyPayment = 0;
  interest = 0;
  principal = 0;
  termYears = 0;
  hasResult = false;
  balancePath = '';
  areaPath = '';

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.loanForm = this.fb.group({
      loanAmount: [''],
      interestRate: [''],
      years: [''],
    });
  }

  onSubmit() {
    const numeric = (value: unknown) =>
      typeof value === 'string' && value.trim() !== '' ? Number(value) : NaN;
    const values = this.loanForm.value;
    const loanAmount = numeric(values.loanAmount);
    const annualRate = numeric(values.interestRate);
    const years = numeric(values.years);
    const months = years * 12;
    this.monthlyPayment = 0;
    this.interest = 0;
    this.errorMessage = '';
    this.hasResult = false;
    this.balancePath = '';
    this.areaPath = '';

    if (
      !Number.isFinite(loanAmount) ||
      loanAmount <= 0 ||
      !Number.isFinite(annualRate) ||
      annualRate < 0 ||
      !Number.isInteger(years) ||
      years < 1 ||
      !Number.isSafeInteger(months)
    ) {
      this.errorMessage =
        'Enter a positive loan amount, a non-negative interest rate, and a whole number of years.';
      return;
    }

    const monthlyRate = annualRate / 100 / 12;
    // log1p/expm1 retain precision for rates close to zero; zero has no interest.
    const payment =
      monthlyRate === 0
        ? loanAmount / months
        : (loanAmount * monthlyRate) /
          -Math.expm1(-months * Math.log1p(monthlyRate));
    const rounded = Number(payment.toFixed(2));
    const totalInterest =
      monthlyRate === 0 ? 0 : Math.max(0, rounded * months - loanAmount);
    if (!Number.isFinite(rounded) || !Number.isFinite(totalInterest)) {
      this.errorMessage =
        'These values are too large to calculate. Please use smaller values.';
      return;
    }
    this.monthlyPayment = rounded;
    this.interest = totalInterest;
    this.principal = loanAmount;
    this.termYears = years;
    this.hasResult = true;
    // Sample the exact balance formula, bounded to 61 points even for long terms.
    // Remaining-term form avoids overflow from raising (1 + r) to a large exponent.
    const points = Array.from({ length: 61 }, (_, index) => {
      const remaining = months * (1 - index / 60);
      const balance =
        monthlyRate === 0
          ? loanAmount * (1 - index / 60)
          : (payment * -Math.expm1(-remaining * Math.log1p(monthlyRate))) /
            monthlyRate;
      return `${index === 0 ? 'M' : 'L'}${index * 10},${(175 - Math.min(1, Math.max(0, balance / loanAmount)) * 160).toFixed(2)}`;
    });
    this.balancePath = points.join(' ');
    this.areaPath = this.balancePath + ' L600,175 L0,175 Z';
  }

  clearForm() {
    this.monthlyPayment = 0;
    this.interest = 0;
    this.errorMessage = '';
    this.hasResult = false;
    this.principal = 0;
    this.termYears = 0;
    this.balancePath = '';
    this.areaPath = '';
    this.loanForm.reset();
    this.formDirective?.resetForm();
  }
}
