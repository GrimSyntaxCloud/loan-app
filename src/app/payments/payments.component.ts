import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  standalone: false,
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent implements OnInit {
  @Input() payments = 0;


  constructor() { }

  ngOnInit(): void {
  }

}
