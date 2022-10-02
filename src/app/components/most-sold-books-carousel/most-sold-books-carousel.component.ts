import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

import SwiperCore, { Navigation, Pagination, Scrollbar, A11y, SwiperOptions, Autoplay } from 'swiper';

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, Autoplay]);

@Component({
  selector: 'app-most-sold-books-carousel',
  templateUrl: './most-sold-books-carousel.component.html',
  styleUrls: ['./most-sold-books-carousel.component.css']
})
export class MostSoldBooksCarouselComponent implements OnInit {

  allBooks!: Observable<any>;

  swiperConfig: SwiperOptions = {
    pagination: {
      clickable: true
    },
    autoplay: { disableOnInteraction: false },
    breakpoints: {
      1300: {
        slidesPerView: 4,
        spaceBetween: 30,
        pagination: {
          clickable: true
        }
      },
      1000: {
        slidesPerView: 2,
        spaceBetween: 20,
        pagination: {
          clickable: true
        }
      },
      600: {
        slidesPerView: 1,
        spaceBetween: 0,
        pagination: {
          clickable: true
        }
      }
    }
  }

  constructor(private afs: AngularFirestore) { }

  ngOnInit(): void {
    this.fetchMostSoldBooks()
  }

  async fetchMostSoldBooks() {
    this.allBooks = this.afs.collection("books", ref => ref.orderBy("numberOfSales", "desc").limit(5)).valueChanges()
  }

}
