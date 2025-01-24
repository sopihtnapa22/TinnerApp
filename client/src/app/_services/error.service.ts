import { inject, Injectable } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  private router = inject(Router)
  private snackBar = inject(MatSnackBar)
  private snackBarConfig: MatSnackBarConfig = {
    horizontalPosition: 'right',
    verticalPosition: 'top'
  }
  constructor() { }

  handleError(err: any) {
    if (err) {
      switch (err.status) {
        case 400:
          this.snackBar.open('Bad Request', 'ok', this.snackBarConfig)
          break
        case 404:
          this.router.navigate(['/404'])
          break
        case 500:
        case 501:
        case 502:
        case 503:
        case 504:
        case 505:
        case 506:
        case 507:
        case 508:
        case 509:
        case 510:
        case 511:
          if (err.error.message === 'Token has expired') {
            this.router.navigate(['/'])
          }
          const navExtra: NavigationExtras = {
            state: {
              massege: err.error,
              code: err.status
            }
          }
          this.router.navigate(['/server-error'], navExtra)
          break
        default:
          this.snackBar.open('Something went wrong,plese try again later.', 'ok', this.snackBarConfig)
          break;
      }
    }
    return throwError(() => err)
  }
}
