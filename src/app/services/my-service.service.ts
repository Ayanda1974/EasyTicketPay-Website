import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, of } from 'rxjs'; // Import Observable and of from rxjs

@Injectable({
  providedIn: 'root',
})
export class MyServiceService {

  constructor(private firestore: AngularFirestore) { }

  getUsers(): Observable<any[]> {
    // Ensure this returns an observable from the Firestore collection
    return this.firestore.collection<any>('Passengers').valueChanges();
  }

  login(username: string, password: string): boolean {
    // Add your login logic here
    // For example, mock validation:
    if (username === 'admin' && password === 'admin123') {
      return true;  // Login successful
    } else {
      return false; // Login failed
    }
  }

  getData(): Observable<any[]> {
    // Mock data returned as an observable
    const mockData = [
      { id: 1, name: 'Item 1' },
      { id: 2, name: 'Item 2' },
    ];
    return of(mockData); // 'of' creates an observable from the mock data
  }
}
