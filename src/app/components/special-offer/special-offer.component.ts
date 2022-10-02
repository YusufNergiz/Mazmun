import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

import SwiperCore, { Navigation, Pagination, Scrollbar, A11y, Swiper, Autoplay } from 'swiper';

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, Autoplay]);

@Component({
  selector: 'app-special-offer',
  templateUrl: './special-offer.component.html',
  styleUrls: ['./special-offer.component.css']
})
export class SpecialOfferComponent implements OnInit {

  allBooks!: Observable<any>

  constructor(private afs: AngularFirestore) { }

  ngOnInit(): void {
    this.fetchAllBooks()
  }

  async fetchAllBooks() {
    this.allBooks = this.afs.collection("books").valueChanges()
  }

}
