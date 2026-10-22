/**
 * Title: app.module.ts
 * Author: Andres Macias
 * Date: 11/20/22
 * Description: App module
 */

import { Component } from '@angular/core';

@Component({
  standalone: false,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  assignment: string;

  constructor() {
    this.assignment = "Loan App";
  }
}
