import { Injectable, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '@shared/error-dialog/error-dialog.component';

@Injectable({ providedIn: 'root' })
export class DialogService {
  readonly #dialog = inject(MatDialog);

  openErrorDialog(errorText: string) {
    this.#dialog.open(ErrorDialogComponent, {
      data: { errorText: errorText },
      width: '300px',
    });
  }
}
