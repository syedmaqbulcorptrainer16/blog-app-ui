import { Injectable } from '@angular/core';
import {MatSnackBar, MatSnackBarRef} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private snackbar: MatSnackBar) { }

  success(message:string){
    this.snackbar.open(message,'',{duration:5000,
    horizontalPosition: 'center',
    verticalPosition: 'top'})

  }
}
