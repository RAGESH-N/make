import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  resetForm: FormGroup;
  resetMessage = '';
  
  constructor(private fb: FormBuilder, private http: HttpClient,private router: Router) {
    this.resetForm = this.fb.group({
      userid: ['', Validators.required],
      favDish: ['', Validators.required],
      foodPref: ['', Validators.required],
      newPassword: ['', [
        Validators.required,
        Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
      ]],
      confirmPassword: ['', Validators.required]
    });
  }

  get passwordMismatch(): boolean {
    return (
      this.resetForm.get('newPassword')?.value &&
      this.resetForm.get('confirmPassword')?.value &&
      this.resetForm.get('newPassword')?.value !== this.resetForm.get('confirmPassword')?.value
    );
  }

 onReset() {
  if (this.resetForm.invalid || this.passwordMismatch) {
    return;
  }

  const { userid, favDish, foodPref, newPassword } = this.resetForm.value;

  this.http.post('http://localhost:3000/api/users/forgot-password', {
    userid, favDish, foodPref, newPassword
  }).subscribe(
    (res: any) => {
      // Optionally show a message before redirect
      this.resetMessage = res.message || 'Password reset successful!';
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 1500); // Redirect after 1.5 seconds (optional, or use 0 for immediate)
    },
    err => {
      this.resetMessage = err.error?.message || 'An error occurred.';
    }
  );
}
}