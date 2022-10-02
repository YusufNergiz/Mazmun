import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from 'angular-toastify';
import { getAuth, signOut } from "firebase/auth";

@Component({
  selector: 'app-sign-out',
  templateUrl: './sign-out.component.html',
  styleUrls: ['./sign-out.component.css']
})
export class SignOutComponent implements OnInit {

  constructor(private toast: ToastService, private router: Router) { }

  ngOnInit(): void {
  }

  signOut() {
    const auth = getAuth();
    signOut(auth).then(() => {
      this.router.navigate(['/'])
      this.toast.success("Signed Out Successfully")
    }).catch((error) => {
      this.toast.error("Something went Wrong!")
    });
  }

}
