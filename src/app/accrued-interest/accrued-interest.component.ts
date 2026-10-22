import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  standalone: false,
  selector: 'app-accrued-interest',
  templateUrl: './accrued-interest.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrls: ['./accrued-interest.component.css']
})
export class AccruedInterestComponent implements OnInit {
  @Input() accruedInterest = 0;

  constructor() { }

  ngOnInit(): void {
  }

}
