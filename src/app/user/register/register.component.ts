import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../user.service';
import { emailValidator } from '../../utils/email.validator';
import { DOMAINS } from '../../constants';
import { matchPasswordsValidator } from '../../utils/matchPasswords.validator';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  constructor(private userService: UserService, private router: Router) { }
  form = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(5)
    ]),
    email: new FormControl('', [Validators.required, emailValidator(DOMAINS)]),
    tel: new FormControl(''),
    passGroup: new FormGroup({
      password: new FormControl('', [Validators.required, Validators.minLength(5)]),
      rePassword: new FormControl('', [Validators.required, matchPasswordsValidator('password', 'rePassword'),])
    },
      {
        validators: [matchPasswordsValidator('password', 'rePassword')]
      }

    )

  })
  isFieldTextMissing(controlName: string) {
    return this.form.get(controlName)?.touched &&
      this.form.get(controlName)?.errors?.['required']
  }
  isNotMinLength(controlName: string) {
    return this.form.get(controlName)?.touched &&
      this.form.get(controlName)?.errors?.['minlength']
  }
  get isEmailNotValid() {
    return this.form.get('email')?.touched &&
      this.form.get('email')?.errors?.['emailValidator']

  }
  arePasswordsNotMatching() {
    return this.form.get('passGroup')?.get('rePassword')?.touched && this.form.get('passGroup')?.get('rePassword')?.errors?.['matchPasswordsValidator']
  }
  register() {
    if (this.form.invalid) {
      return;
    }
    console.log(this.form.value);
    
    const {
      username,
      email,
      tel,
      passGroup: { password, rePassword } = {},
    } = this.form.value;

    this.userService.register(username!, email!, tel!, password!, rePassword!)
      .subscribe(() => {
        this.router.navigate(['/recipes'])
      })

  }
}
