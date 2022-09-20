import { Component, OnInit, HostListener } from '@angular/core';
import { UserServiceService } from 'src/app/services/user-service.service';
import { getAuth } from "firebase/auth";
import { AngularFireAuth } from '@angular/fire/compat/auth';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public navbarCollapsed = true;

  profileImage: string = "assets/images/defaultUser.png"

  public innerWidth: any;

  mobile: boolean = false;
  

  // User Data
  userLoggedIn: boolean = false;
  displayName!: any; 
  email!: any;
  photoUrl!: any;
  // 


  constructor(private userService: UserServiceService, private afa: AngularFireAuth) { }

  ngOnInit(): void {
    this.checkIfUserSignedIn()
  }

  checkIfUserSignedIn(): any {
    this.afa.onAuthStateChanged((user) => {
      if (user) {
        this.userLoggedIn = true
        this.displayName = user.displayName;
        this.email = user.email;
        this.photoUrl = user.photoURL;
      }
      else {
        this.userLoggedIn = false;
      }
    })
  }

  search() {
    console.log("Search Button Clicked")
  }

  @HostListener('window:resize', ['$event'])
    onResize(event: any) {
      this.innerWidth = window.innerWidth;
      if (this.innerWidth < 1100) {
        this.mobile = true;
      }
      else {
        this.mobile = false
      }
    }
}
