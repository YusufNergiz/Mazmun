import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  images!: any;

  latestBooks!: Observable<any>;

  slides: any[] = new Array(3).fill({id: -1, src: '', title: '', subtitle: ''});
  bookSlides: any[] = new Array(1).fill({id: -1, src: '', title: ''});

  faArrowRight = faArrowRight;

  constructor(private bookService: BookService, private afs: AngularFirestore, private spinner: NgxSpinnerService) {
    spinner.show()
  }

  ngOnInit(): void {

    this.callAllFetchFunctions()

    this.slides[0] = {
      src: 'assets/images/mainCarousel.png',
      title: "Барлық оқырмандарға арналған мамандандырылған кітап дүкені"    };
    this.slides[1] = {
      src: 'assets/images/mainCarousel.png',
      title: "Барлық оқырмандарға арналған мамандандырылған кітап дүкені"
    }
    this.slides[2] = {
      src: 'assets/images/mainCarousel.png',
      title: "Барлық оқырмандарға арналған мамандандырылған кітап дүкені"
    }
  }

  onItemChange($event: any): void {
    console.log('Carousel onItemChange', $event);
  }

  // Fetching Data from Firestore

  async callAllFetchFunctions() {
    this.fetchLatestBooks()
  }

  async fetchLatestBooks() {
    this.latestBooks = this.afs.collection("books", ref => ref.orderBy("uploadDate", "desc").limit(3)).valueChanges()
  }
  // ----------------------------------------

}
