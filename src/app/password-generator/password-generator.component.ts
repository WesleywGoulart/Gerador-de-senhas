import { Component } from '@angular/core';

@Component({
  selector: 'app-password-generator',
  templateUrl: './password-generator.component.html',
  styleUrls: ['./password-generator.component.css']
})
export class PasswordGeneratorComponent {
  passwordLength: number = 8;
  useSpecialChars: boolean = true;
  useUppercase: boolean = true;
  generatedPassword: string = '';
  isPasswordCopied: boolean = false;
  showPassword: boolean = false;

  generatePassword(): void {
    const charset = 'abcdefghijklmnopqrstuvwxyz';
    const specialChars = '@#$%&*<>!?^';
    const uppercaseCharset = charset.toUpperCase();

    let finalCharset = charset;
    if (this.useSpecialChars) {
      finalCharset += specialChars;
    }
    if (this.useUppercase) {
      finalCharset += uppercaseCharset;
    }

    let generatedPassword = '';
    for (let i = 0; i < this.passwordLength; i++) {
      const randomIndex = Math.floor(Math.random() * finalCharset.length);
      generatedPassword += finalCharset[randomIndex];
    }

    this.generatedPassword = generatedPassword;
    this.isPasswordCopied = false;
    this.showPassword = true;
  }

  toggleCheckbox(checkboxId: string): void {
    const checkbox = document.getElementById(checkboxId) as HTMLInputElement;
    if (checkbox) {
      checkbox.checked = !checkbox.checked;
    }
  }

  copyPassword(): void {
    const textarea = document.createElement('textarea');
    textarea.value = this.generatedPassword;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);

    this.isPasswordCopied = true;
    this.hideNotification();
  }

  hideNotification() {
    if (this.isPasswordCopied) {
      setTimeout(() => {
        this.isPasswordCopied = false;
      }, 3000);
    }
  }
}