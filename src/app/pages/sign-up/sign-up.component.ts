import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { ToastService } from 'angular-toastify';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  // User Credentials
  name!: string;
  email!: string;
  password!: string;
  // 

  constructor(private router: Router, private afs: AngularFirestore, private afa: AngularFireAuth, private _toastService: ToastService) { }

  ngOnInit(): void {
  }

  async registerUser() {
    const auth = getAuth();

    createUserWithEmailAndPassword(auth, this.email, this.password)
      .then((userCredentials) => {
        this.afa.user.subscribe((user) => {
          user?.updateProfile({
            displayName: this.name
          })
        })
        const user = userCredentials.user;
        return this.afs.collection('users').doc(user.uid).set({name: this.name, email: this.email, uid: user.uid})})
      .catch((error) => {
        console.log(error)
      })

      this.router.navigate(['/'])
      this._toastService.success('Profile Successfully Created!')
  }

}
