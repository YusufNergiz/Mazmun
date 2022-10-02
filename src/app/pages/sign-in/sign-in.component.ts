import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { ToastService } from 'angular-toastify';
import { getAuth, signInWithEmailAndPassword, signInWithPopup, sendPasswordResetEmail } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  // User Sign In
  email!: string;
  password!: string;
  // 

  // Auth
  auth = getAuth()
  // 

  constructor(private router: Router, private toast: ToastService, private authService: AuthService, private afs: AngularFirestore) { }

  ngOnInit(): void {
  }

  signInUser() {
    if (this.email && this.password !== '' || undefined || null) {
      signInWithEmailAndPassword(this.auth, this.email, this.password)
      .then((userCredential) => {
        this.router.navigate(['/'])
        this.toast.success("Successfully Signed In!")
      })
      .catch((error) => {
        this.toast.error("Incorrect User Credentials")
      })
    }
    else {
      this.toast.error("Please fill all the inputs")
    }
    
  }

  signInWithGoogle() {
    const provider = new GoogleAuthProvider();

    signInWithPopup(this.auth, provider)
      .then((result) => {
        this.afs.collection('users').doc(result.user.uid).set({name: result.user.displayName, email: result.user.email, uid: result.user.uid}, {merge: true})
        this.router.navigate(['/'])
        this.toast.success(`Signed In as ${result.user.displayName}`)
      })
      .catch((error) => {
        this.toast.error(error.message)
      })
  }

  forgotPassword() {
    if (this.email === '' || null || undefined) {
      this.toast.error("Please enter an email adress")
    }
    else {
      sendPasswordResetEmail(this.auth, this.email)
      .then(() => {
        this.toast.info(`Password Reset Email has been sent to ${this.email}`)
      })
      .catch((error) => {
        this.toast.error(error.message)
      })
    }
  }

}
