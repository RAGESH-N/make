// import { Component } from '@angular/core';
// import { Router } from '@angular/router';
// import { HttpClient } from '@angular/common/http';

// @Component({
//   selector: 'app-restaurant-signin',
//   templateUrl: './restaurant-signin.component.html',
//   styleUrls: ['./restaurant-signin.component.css']
// })
// export class RestaurantSigninComponent {
//   restaurant = {
//     restaurantName: '',
//     mailId: '',
//     password: ''
//   };

//   errorMessage: string = '';

//   constructor(private http: HttpClient, private router: Router) {}

//   onSignIn(): void {
//     // Simulated API call to verify restaurant credentials
//     this.http.post('http://localhost:3000/api/restaurants/signin', this.restaurant).subscribe({
//       next: (response: any) => {
//         alert(response.message); // Optional success alert

//         // Store restaurantName and mailId in localStorage
//         localStorage.setItem('restaurantName', this.restaurant.restaurantName);
//         localStorage.setItem('mailId', this.restaurant.mailId);

//         // Navigate to the Restaurant Page
//         this.router.navigate(['/restaurant']);
//       },
//       error: (error) => {
//         this.errorMessage = error.error.message; // Display error message if sign-in fails
//       }
//     });
//   }
// }

// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-restaurant-signin',
//   templateUrl: './restaurant-signin.component.html',
//   styleUrls: ['./restaurant-signin.component.css']
// })
// export class RestaurantSigninComponent {
//   restaurant: any = {};
//   errorMessage: string = '';

//   isPasswordValid(): boolean {
//     const pwd = this.restaurant.password || '';
//     // At least 8 chars, one uppercase, one lowercase, one digit, one special char
//     return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(pwd);
//   }

//   onSignIn(): void {
//     if (!this.isPasswordValid()) {
//       this.errorMessage = 'Password must be at least 8 characters, include a capital letter, small letter, digit, and special character.';
//       return;
//     }
//     // Place your sign-in logic/API call here
//     this.errorMessage = '';
//     // ...
//   }
// }


// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { HttpClient } from '@angular/common/http';

// @Component({
//   selector: 'app-restaurant-signin',
//   templateUrl: './restaurant-signin.component.html',
//   styleUrls: ['./restaurant-signin.component.css']
// })
// export class RestaurantSigninComponent implements OnInit {
//   restaurant = {
//     restaurantName: '',
//     mailId: '',
//     password: ''
//   };

//   captcha!: string;
//   userCaptcha: string = '';
//   errorMessage: string = '';

//   constructor(private http: HttpClient, private router: Router) {}

//   ngOnInit(): void {
//     this.generateCaptcha();
//   }

//   generateCaptcha(): void {
//     const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//     this.captcha = Array.from({ length: 6 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
//   }

//   isRestaurantNameValid(): boolean {
//     return this.restaurant.restaurantName.length > 3;
//   }

//   isEmailValid(): boolean {
//     return /^[a-zA-Z0-9._%+-]+@(gmail|yahoo)\.com$/.test(this.restaurant.mailId);
//   }

//   isPasswordValid(): boolean {
//     return (
//       this.restaurant.password.length >= 8 &&
//       /[A-Z]/.test(this.restaurant.password) && // At least one uppercase letter
//       /[a-z]/.test(this.restaurant.password) && // At least one lowercase letter
//       /\d/.test(this.restaurant.password) && // At least one digit
//       /[@$!%*?&]/.test(this.restaurant.password) // At least one special character
//     );
//   }

//   isCaptchaValid(): boolean {
//     return this.userCaptcha === this.captcha;
//   }

//   onSignIn(): void {
//     if (!this.isRestaurantNameValid() || !this.isEmailValid() || !this.isPasswordValid() || !this.isCaptchaValid()) {
//       this.errorMessage = 'Please fill all fields correctly.';
//       return;
//     }

//     this.http.post('http://localhost:3000/api/restaurants/signin', this.restaurant).subscribe({
//       next: (response: any) => {
//         alert(response.message);
//         localStorage.setItem('restaurantName', this.restaurant.restaurantName);
//         localStorage.setItem('mailId', this.restaurant.mailId);
//         this.router.navigate(['/restaurant']);
//       },
//       error: (error) => {
//         this.errorMessage = error.error.message;
//       }
//     });
//   }
// }

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-restaurant-signin',
  templateUrl: './restaurant-signin.component.html',
  styleUrls: ['./restaurant-signin.component.css']
})
export class RestaurantSigninComponent implements OnInit {
  restaurant = {
    restaurantName: '',
    mailId: '',
    password: ''
  };

  captcha!: string;
  userCaptcha: string = '';
  errorMessage: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.generateCaptcha();
  }

  generateCaptcha(): void {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    this.captcha = Array.from({ length: 6 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
  }

  isRestaurantNameValid(): boolean {
    return this.restaurant.restaurantName.length > 3;
  }

  isEmailValid(): boolean {
    return /^[a-zA-Z0-9._%+-]+@(gmail|yahoo)\.com$/.test(this.restaurant.mailId);
  }

  isPasswordValid(): boolean {
    return (
      this.restaurant.password.length >= 8 &&
      /[A-Z]/.test(this.restaurant.password) && // At least one uppercase letter
      /[a-z]/.test(this.restaurant.password) && // At least one lowercase letter
      /\d/.test(this.restaurant.password) && // At least one digit
      /[@$!%*?&]/.test(this.restaurant.password) // At least one special character
    );
  }

  isCaptchaValid(): boolean {
    return this.userCaptcha === this.captcha;
  }

  onSignIn(): void {
    if (!this.isRestaurantNameValid() || !this.isEmailValid() || !this.isPasswordValid() || !this.isCaptchaValid()) {
      this.errorMessage = 'Please fill all fields correctly.';
      return;
    }

    this.http.post('http://localhost:3000/api/restaurants/signin', this.restaurant).subscribe({
      next: (response: any) => {
        alert(response.message);
        localStorage.setItem('restaurantName', this.restaurant.restaurantName);
        localStorage.setItem('mailId', this.restaurant.mailId);
        this.router.navigate(['/restaurant']);
      },
      error: (error) => {
        this.errorMessage = error.error.message;
      }
    });
  }
}