import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

interface Passenger {
  Name: string;
  Surname: string;
  email: string;
}

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {
  passengers!: Observable<Passenger[]>;
  // router: any;

  constructor(private firestore: AngularFirestore, private router: Router) { }

  ngOnInit() {
    // Fetch the passengers collection and ensure the data is observed correctly
    this.passengers = this.firestore.collection<Passenger>('Passengers').valueChanges();
    
    // Optional logging for debugging purposes
    this.passengers.subscribe(data => {
      console.log('Passenger data:', data);
    }, error => {
      console.error('Error fetching passenger data:', error);
    });
  }

  navigateHome() {
    this.router.navigate(['/home']);  // Adjust the route path based on your routing configuration
  }
}
