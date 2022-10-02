import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ToastService, AngularToastifyModule } from 'angular-toastify'; 
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxSpinnerModule } from "ngx-spinner";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CarouselModule } from '@coreui/angular';
import {AccordionModule} from 'primeng/accordion';
import { SwiperModule } from 'swiper/angular';

import { AppComponent } from './app.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './components/header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { UserServiceService } from './services/user-service.service';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { FooterComponent } from './components/footer/footer.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { MainComponent } from './pages/main/main.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { AddProductComponent } from './pages/add-product/add-product.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ProfileNavbarComponent } from './components/profile-navbar/profile-navbar.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { SignOutComponent } from './components/sign-out/sign-out.component';
import { AuthService } from './services/auth.service';
import { BooksCarouselComponent } from './components/books-carousel/books-carousel.component';
import { SpecialOfferComponent } from './components/special-offer/special-offer.component';
import { MostSoldBooksCarouselComponent } from './components/most-sold-books-carousel/most-sold-books-carousel.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SignUpComponent,
    MainComponent,
    SignInComponent,
    AddProductComponent,
    ProfileComponent,
    ProfileNavbarComponent,
    EditProfileComponent,
    HeaderComponent,
    SignOutComponent,
    BooksCarouselComponent,
    SpecialOfferComponent,
    MostSoldBooksCarouselComponent
  ],
  imports: [
    BrowserModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    NgbModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    AngularToastifyModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    NgxSpinnerModule.forRoot({ type: 'fire' }),
    CarouselModule,
    AccordionModule,
    SwiperModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [UserServiceService, {provide: FIREBASE_OPTIONS, useValue: environment.firebase}, ToastService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
