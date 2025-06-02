import { Component, inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { ErrorDialogData } from '@core/services/dialog/dialog.model';

@Component({
  selector: 'app-error-dialog',
  imports: [MatDialogModule],
  templateUrl: './error-dialog.component.html',
  styleUrl: './error-dialog.component.scss',
})
export class ErrorDialogComponent {
  readonly #dialogRef = inject(MatDialogRef<ErrorDialogComponent>);
  readonly errorData = inject<ErrorDialogData>(MAT_DIALOG_DATA);

  close() {
    this.#dialogRef.close();
  }
}
