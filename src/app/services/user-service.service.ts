import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ToastService } from 'angular-toastify';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(private afs: AngularFirestore, private afa: AngularFireAuth, private toast: ToastService, private authService: AuthService) { }

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

  async fetchUserData() {
    const auth = getAuth()

    let userPromise = new Promise((resolve, reject) => {
      onAuthStateChanged(auth, (user) => {
          if (user) {
            this.afs.collection("users").doc(user.uid).ref.get().then((doc) => {
              if (doc.exists) {
                resolve(doc.data())
              } 
              else {
                reject(this.toast.error("User does not Exist..."))
              }
            })
          }
        })
    })
    return userPromise
  }

  adminLoggedIn() {
    const auth = getAuth()

    onAuthStateChanged(auth, (user) => {
      if (user?.email === "admin@gmail.com" && user.uid === "wPGbBYbaTWfVLbnMzJ8D3vVyN992") {
        return true
      }
      else {
        return false
      }
    })
    return onAuthStateChanged
  }
}
