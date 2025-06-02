import { Component } from '@angular/core';
import { PasswordGeneratorComponent } from '@features/password-generator/password-generator.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [PasswordGeneratorComponent],
})
export class AppComponent {}
