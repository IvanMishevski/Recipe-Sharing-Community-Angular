import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { DOMAINS } from '../../constants';
import { UserService } from '../user.service';
import { ErrorMsgComponent } from '../../core/error-msg/error-msg.component';
import { ErrorMsgService } from '../../core/error-msg/error-msg.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, FormsModule,ErrorMsgComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  domains = DOMAINS;
  constructor(private userService: UserService, private router: Router, private errorMsgService: ErrorMsgService) { }
  login(form: NgForm) {
    if (form.invalid) {
      return;
    }
    const { email, password } = form.value;

      this.userService.login(email, password).subscribe({
        next: () => {
          this.router.navigate(['/recipes'])
        },
        error: (err) => {
          console.error('Login error:', err)
          this.errorMsgService.setError(err);
          form.resetForm();
        }
      })
  }
}
