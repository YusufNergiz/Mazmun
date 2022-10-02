import { Component, OnInit, HostListener } from '@angular/core';
import { UserServiceService } from 'src/app/services/user-service.service';
import { getAuth } from "firebase/auth";
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { NgxSpinnerService } from 'ngx-spinner';


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
  

  // User Data from their Google Accounts
  userLoggedIn: boolean = false;
  displayName!: any; 
  email!: any;
  photoUrl!: any;
  // 

  // User Data from their Firestore Documents
  userName!: string;
  userProfileImage!: string;
  // 

  constructor(private userService: UserServiceService, private afa: AngularFireAuth, private spinner: NgxSpinnerService) {
    spinner.show()
   }

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
        this.fetchUserData()
      }
      else {
        this.userLoggedIn = false;
        this.spinner.hide()
      }
    })
  }

  async fetchUserData() {
    this.userService.fetchUserData().then((data: any) => {
      this.userName = data.name,
      this.userProfileImage = data.profileImage
      this.spinner.hide()
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
