import { DestroyRef, inject, Injectable, signal } from '@angular/core';
import { finalize } from 'rxjs';
import { PremiumFeatureError } from '@core/services/ninjas/ninjas-api.errors';
import { RandomPasswordQueryParams } from '@core/services/ninjas/ninjas-api.model';
import { NinjasApiService } from '@core/services/ninjas/ninjas-api.service';
import { DialogService } from '@core/services/dialog/dialog.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable()
export class PasswordGeneratorStore {
  readonly #apiService = inject(NinjasApiService);
  readonly #dialogService = inject(DialogService);
  readonly #destroyRef = inject(DestroyRef);

  password = signal('*cFsQvKE0bUP!PF8');

  length = signal<number>(16);
  includeNumbers = signal(true);
  includeSymbols = signal(true);

  isLoading = signal(false);
  isCopied = signal(false);

  error = signal<string | null>(null);

  get #passwordOptions(): RandomPasswordQueryParams {
    return {
      length: this.length(),
      exclude_numbers: !this.includeNumbers(),
      exclude_special_chars: !this.includeSymbols(),
    };
  }

  setPassword() {
    this.isLoading.set(true);
    this.#apiService
      .getRandomPassword$(this.#passwordOptions)
      .pipe(
        finalize(() => this.isLoading.set(false)),
        takeUntilDestroyed(this.#destroyRef)
      )
      .subscribe({
        next: (randomPassword) => {
          this.password.set(randomPassword);
          this.isCopied.set(false);
        },
        error: (error) => {
          this.error.set(error.message);
          if (error instanceof PremiumFeatureError) {
            this.#dialogService.openErrorDialog(error.message);
          }
        },
      });
  }
}
