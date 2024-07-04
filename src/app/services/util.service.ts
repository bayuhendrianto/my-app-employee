import { Component, Injectable } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class UtilService {
  constructor(private snackBar: MatSnackBar) {}

  showToast(
    message: string,
    horizontalPosition?: 'center' | 'left' | 'right',
    verticalPosition?: 'top' | 'bottom',
    duration?: number
  ) {
    this.snackBar.open(message, 'OK', {
      horizontalPosition: horizontalPosition ?? 'right',
      verticalPosition: verticalPosition ?? 'top',
      duration: duration ?? 3000,
    });
  }

  showToastComponent(
    message: string,
    horizontalPosition?: 'center' | 'left' | 'right',
    verticalPosition?: 'top' | 'bottom',
    duration?: number
  ) {
    this.snackBar.openFromComponent(PizzaPartyComponent, {
      horizontalPosition: horizontalPosition ?? 'right',
      verticalPosition: verticalPosition ?? 'top',
      duration: duration ?? 3000,
    });
  }
}

@Component({
  selector: 'snack-bar-component-example-snack',
  template: `<span class="example-pizza-party"> Pizza party!!! 🍕 </span>`,
  styles: `
    .example-pizza-party {
      color: hotpink;
    }
  `,
  standalone: true,
})
export class PizzaPartyComponent {}
