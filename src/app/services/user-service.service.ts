import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { getAuth, onAuthStateChanged } from "firebase/auth";

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(private afs: AngularFirestore, private afa: AngularFireAuth) { }

  userLoggedIn() {
    const auth = getAuth()

    onAuthStateChanged(auth, (user) => {
      if (user) {
        return true
      }
      else {
        return false
      }
    }) 

    return onAuthStateChanged
  }

}
