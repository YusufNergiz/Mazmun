import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { faUser, faBook, faBookmark, faCartShopping, faReceipt, faLockOpen, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-profile-navbar',
  templateUrl: './profile-navbar.component.html',
  styleUrls: ['./profile-navbar.component.css']
})
export class ProfileNavbarComponent implements OnInit {

  tabIndex: number = 0;

  @Output() tabIndexEvent = new EventEmitter<number>();

  changeTabIndex(index: number) {
    this.tabIndexEvent.emit(index)
    this.tabIndex = index;
  }

  // Profile Navbar
  faUser = faUser;
  faBook = faBook;
  faBookmar = faBookmark;
  faCartShopping = faCartShopping;
  faReceipt = faReceipt;
  faLockOpen = faLockOpen;
  faExit = faArrowRightFromBracket;
  //  

  constructor() { }

  ngOnInit(): void {
  }

  onTabClick(index: number) {
    this.tabIndex = index;
  }

}
