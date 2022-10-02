import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  tabIndex: number = 0;

  constructor() { }

  ngOnInit(): void {
  }

  changeTabIndex(index: number) {
    this.tabIndex = index;
  }

}
