// import { Component } from '@angular/core';
// import { MyServiceService } from '../services/my-service.service'; 


// @Component({
//   selector: 'app-login',
//   templateUrl: './login.page.html',
//   styleUrls: ['./login.page.scss'],
// })
// export class LoginPage {
//   Email!: string;
//   password!: string;

//   constructor(private MyServiceService: MyServiceService) {}

//   login() {
//     this.MyServiceService.login(this.email, this.password);
//   }
// }



import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  Email!: string;
  Password!: string;

  constructor(private firestore: AngularFirestore, private router: Router) {}

  login() {
    if (!this.Email || !this.Password) {
      alert('Please enter both email and password');
      return;
    }

    // Log email and password to verify what is being sent
    console.log('Attempting to login with', this.Email, this.Password);

    this.firestore.collection('Login', ref => 
      ref.where('Email', '==', this.Email).where('Password', '==', this.Password)
    ).valueChanges().pipe(
      map(users => {
        console.log('Fetched users:', users); // Log fetched users
        return users.length > 0;  // Check if any user matches the credentials
      }),
      switchMap(isValid => {
        if (isValid) {
          this.router.navigate(['/admin']); // Navigate to admin page
          return of(true);
        } else {
          alert('Invalid email or password'); // Alert if credentials are incorrect
          return of(false);
        }
      })
    ).subscribe({
      error: (err) => {
        console.error('Error fetching users:', err); // Log any errors
        alert('An error occurred while logging in');
      }
    });
  }
}

