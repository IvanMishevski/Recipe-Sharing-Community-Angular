import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { ProfileDetails } from '../../types/user';
import { DatePipe } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { emailValidator } from '../../utils/email.validator';
import { DOMAINS } from '../../constants';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [DatePipe, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  isEditMode: boolean = false;
  get createdOn(): string {
    return this.userService.user!.created_at;
  }

  profileDetails: ProfileDetails = {
    username: '',
    email: '',
    tel: '',
    created_at: ''
  };
  form = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
    ]),
    email: new FormControl('', [Validators.required, emailValidator(DOMAINS)]),
    tel: new FormControl(''),
  });
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    const { username, email, tel, created_at } = this.userService.user!;
    
    this.profileDetails = { username, email, tel: tel!, created_at }
    this.form.setValue({
      username,
      email,
      tel: tel!,
    });
  }
  toggleEditMode() {
    this.isEditMode = !this.isEditMode;
  }
  handleSaveProfile() {
    if (this.form.invalid) {
      return;
    }

    this.profileDetails = this.form.value as ProfileDetails;
    this.profileDetails.created_at = this.createdOn;

    const { username, email, tel } = this.profileDetails;

    this.userService.updateProfile(username, email, tel).subscribe(() => {
      this.toggleEditMode();
    });
  }

  onCancel(event: Event) {
    event.preventDefault();
    this.toggleEditMode();
  }

}
