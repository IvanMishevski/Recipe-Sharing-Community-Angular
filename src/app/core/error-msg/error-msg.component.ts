import { Component, OnInit } from '@angular/core';
import { ErrorMsgService } from './error-msg.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-error-msg',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './error-msg.component.html',
  styleUrl: './error-msg.component.css'
})
export class ErrorMsgComponent implements OnInit {
  errorMsg = '';
  isVisible = false;
  
  constructor(private errorMsgService: ErrorMsgService) { }
  
  ngOnInit(): void {
    this.errorMsgService.apiError$.subscribe({
      next: (err: any) => {
        if (err?.error?.message || err?.message) {
          this.errorMsg = err.error?.message || err.message;
          this.isVisible = true;
          
          setTimeout(() => {
            this.isVisible = false;
            this.errorMsg = ''; // Clear the error from the service
          }, 5000);
        }
      }
    });
  }
}