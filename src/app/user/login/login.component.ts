import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { DOMAINS } from '../../constants';
import { UserService } from '../user.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  domains = DOMAINS;
  constructor(private userService: UserService, private router: Router) { }
  login(form: NgForm) {
    if (form.invalid) {
      return;
    }
    const { email, password } = form.value;

      this.userService.login(email, password).subscribe(() => {
        this.router.navigate(['/recipes'])
      })
  }
}
