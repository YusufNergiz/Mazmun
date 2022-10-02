import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostSoldBooksCarouselComponent } from './most-sold-books-carousel.component';

describe('MostSoldBooksCarouselComponent', () => {
  let component: MostSoldBooksCarouselComponent;
  let fixture: ComponentFixture<MostSoldBooksCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MostSoldBooksCarouselComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MostSoldBooksCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
