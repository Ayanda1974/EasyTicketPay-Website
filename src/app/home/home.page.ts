import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

interface Driver {
  Name: string;
  Surname: string;
  Email: string;
  License: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  drivers!: Observable<Driver[]>;

  constructor(
    private firestore: AngularFirestore,
    private afAuth: AngularFireAuth,
    private router: Router
  ) {}

  ngOnInit() {
    this.drivers = this.firestore.collection<Driver>('Drivers').valueChanges();
  }

  // logout() {
  //   this.afAuth.signOut().then(() => {
  //     this.router.navigate(['/login']);
  //   }).catch(error => {
  //     console.error('Error during logout:', error);
  //   });
  // }
  logout() {
    this.afAuth.signOut().then(() => {
      this.router.navigate(['/login']); // Redirect to login page
      console.log('Admin logged out successfully');
    }).catch(error => {
      console.error('Error logging out:', error);
    });
  }

  assignAdmin(Email: string) {
    if (!Email) {
      console.error('Invalid Email address.');
      return;
    }
    
    console.log(`Attempting to assign admin role to: ${Email}`);
    
    this.firestore.collection('Login').doc(Email).set({ role: 'admin' }, { merge: true })
      .then(() => {
        console.log(`Successfully assigned admin role to: ${Email}`);
      })
      .catch(error => {
        console.error('Error assigning admin:', error);
      });
  }
  
  // Delete User Function
  deleteUser(Email: string) {
    if (!Email) {
      console.error('Invalid Email address.');
      return;
    }
  
    // Use Email as the document ID to delete the user
    this.firestore.collection('Drivers').doc(Email).delete()
      .then(() => {
        console.log(`${Email} has been deleted.`);
      })
      .catch(error => {
        console.error('Error deleting user:', error.message);
      });
  }
}
