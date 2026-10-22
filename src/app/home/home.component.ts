import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  standalone: false,
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  loanForm: FormGroup;
  errorMessage: string;
  monthlyPayment: number = 0;
  interest: number = 0;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.loanForm = this.fb.group({
      loanAmount: [''],
      interestRate: [''],
      years: [''],
    });
  }

 onSubmit() {
  const formValues = this.loanForm.value;
  const loanAmount = parseInt(formValues.loanAmount);
  const interest = parseFloat(formValues.interestRate);
  const years = parseInt(formValues.years);

  const numOfMonths = years * 12;
  const monthlyInterest = interest / 100 / 12;


  this.monthlyPayment = (loanAmount *(monthlyInterest * Math.pow(monthlyInterest + 1, numOfMonths))) /
    (Math.pow(1 + monthlyInterest, numOfMonths) - 1);

  this.monthlyPayment = parseFloat(this.monthlyPayment.toFixed(2));

  this.interest = this.monthlyPayment * numOfMonths - loanAmount;
}

clearForm() {
  this.monthlyPayment = 0;
  this.interest = 0;
  this.loanForm.reset();
}

}
