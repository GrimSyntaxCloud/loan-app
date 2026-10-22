import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  standalone: false,
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  loanForm: FormGroup;
  errorMessage = '';
  monthlyPayment = 0;
  interest = 0;

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

    if (!Number.isFinite(loanAmount) || loanAmount <= 0 ||
        !Number.isFinite(annualRate) || annualRate < 0 ||
        !Number.isInteger(years) || years < 1 || !Number.isSafeInteger(months)) {
      this.errorMessage = 'Enter a positive loan amount, a non-negative interest rate, and a whole number of years.';
      return;
    }

    const monthlyRate = annualRate / 100 / 12;
    // log1p/expm1 retain precision for rates close to zero; zero has no interest.
    const payment = monthlyRate === 0
      ? loanAmount / months
      : loanAmount * monthlyRate / -Math.expm1(-months * Math.log1p(monthlyRate));
    const rounded = Number(payment.toFixed(2));
    const totalInterest = monthlyRate === 0 ? 0 : Math.max(0, rounded * months - loanAmount);
    if (!Number.isFinite(rounded) || !Number.isFinite(totalInterest)) {
      this.errorMessage = 'These values are too large to calculate. Please use smaller values.';
      return;
    }
    this.monthlyPayment = rounded;
    this.interest = totalInterest;
  }

  clearForm() {
    this.monthlyPayment = 0;
    this.interest = 0;
    this.errorMessage = '';
    this.loanForm.reset();
  }
}
