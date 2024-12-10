import { Component, OnInit } from '@angular/core';
import { UserService } from '../user/user.service';
import { LoaderComponent } from '../shared/loader/loader.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authenticate',
  standalone: true,
  imports: [LoaderComponent],
  templateUrl: './authenticate.component.html',
  styleUrl: './authenticate.component.css'
})
export class AuthenticateComponent implements OnInit{
  isAuthenticating = true;
 constructor(private userService: UserService,private router: Router) { }

 ngOnInit(): void {
  this.userService.getProfile().subscribe({
   next: ()=>{
    this.isAuthenticating = false;
   },
   error: ()=>{
     this.isAuthenticating = false;
     // Only redirect if we're on a protected route
     if (this.router.url !== '/') {
       this.router.navigate(['/']);
     }
   },
   complete: ()=>{
     this.isAuthenticating = false;
   }
  })
}

}
