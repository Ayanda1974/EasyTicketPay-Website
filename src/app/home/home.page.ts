import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

interface Driver {
  Name: string;
  Surname: string;
  email: string;
  license: string;  // Field to store driver's license type
}

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  // passengers!: Observable<any[]>;  // Adjust type as per your existing implementation
  drivers!: Observable<Driver[]>;

  constructor(private firestore: AngularFirestore) {}

  ngOnInit() {
    // Fetch passengers data
    // this.passengers = this.firestore.collection<any>('Passengers').valueChanges(); // Replace 'any' with correct type if available

    // Fetch drivers data
    this.drivers = this.firestore.collection<Driver>('Drivers').valueChanges(); // Assuming collection name is 'drivers'
    
    // Optional logging for debugging purposes
    this.drivers.subscribe(data => {
      console.log('Driver data:', data);
    }, error => {
      console.error('Error fetching driver data:', error);
    });
  }
}
