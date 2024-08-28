import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth'; // Import Firebase Auth

interface Passenger {
  Name: string;
  Surname: string;
  Email: string;
}

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {
  passengers!: Observable<Passenger[]>;

  constructor(
    private firestore: AngularFirestore,
    private router: Router,
    private afAuth: AngularFireAuth // Inject Firebase Auth for logout
  ) { }

  ngOnInit() {
    // Fetch the passengers collection and observe data changes
    this.passengers = this.firestore.collection<Passenger>('Passengers').valueChanges();

    // Optional logging for debugging purposes
    this.passengers.subscribe(data => {
      console.log('Passenger data:', data);
    }, error => {
      console.error('Error fetching passenger data:', error);
    });
  }

  // Navigate to Home page to view drivers
  navigateHome() {
    this.router.navigate(['/home']);
  }

  // Assign Admin Function
  assignAdmin(Email: string) {
    if (!Email) {
      console.error('Invalid Email address.');
      return;
    }
  
    // Use Email as the document ID to update role
    this.firestore.collection('Login').doc(Email).set({ role: 'admin' })
      .then(() => {
        console.log(`${Email} has been assigned as admin.`);
      })
      .catch(error => {
        console.error('Error assigning admin:', error.message);
      });
  }

  // Delete User Function
  deleteUser(Email: string) {
    if (!Email) {
      console.error('Invalid Email address.');
      return;
    }
  
    // Use Email as the document ID to delete the user
    this.firestore.collection('Passengers').doc(Email).delete()
      .then(() => {
        console.log(`${Email} has been deleted.`);
      })
      .catch(error => {
        console.error('Error deleting user:', error.message);
      });
  }

  // Logout Function
  logout() {
    this.afAuth.signOut().then(() => {
      this.router.navigate(['/login']); // Redirect to login page
      console.log('Admin logged out successfully');
    }).catch(error => {
      console.error('Error logging out:', error);
    });
  }
}
