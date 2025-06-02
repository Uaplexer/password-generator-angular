import { Component, inject } from '@angular/core';
import { PasswordGeneratorStore } from './password-generator.store';
import { FormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-password-generator',
  imports: [FormsModule, MatProgressSpinnerModule],
  templateUrl: './password-generator.component.html',
  styleUrl: './password-generator.component.scss',
  providers: [PasswordGeneratorStore],
})
export class PasswordGeneratorComponent {
  readonly store = inject(PasswordGeneratorStore);

  copyPasswordToClipboard(input: HTMLInputElement) {
    navigator.clipboard
      .writeText(input.value)
      .then(() => {
        this.store.isCopied.set(true);
      })
      .catch((err) => {
        console.error('Failed to copy:', err);
      });
  }
}
