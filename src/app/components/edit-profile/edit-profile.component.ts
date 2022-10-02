import { Component, OnInit } from '@angular/core';
import { UserServiceService } from 'src/app/services/user-service.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastService } from 'angular-toastify';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { from } from 'rxjs';
import { doc, updateDoc } from 'firebase/firestore';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Firestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { faDownload } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  // Font Awesome Icons
  faDownload = faDownload;
  // 

  userData: any;
  userName!: string;
  userEmail!: string;
  userId!: string;
  userImage!: string;
  userPhone!: string;
  userCity!: string;
  userCountry!: string;
  userStreet!: string;
  userHome!: string;
  userEnterance!: string;
  userApartment!: string;
  userPostalCode!: string;

  newUserImage: any;

  currentUserImage: any;

  profileForm = new FormGroup({
    userName: new FormControl(''),
    userEmail: new FormControl(''),
    userPhone: new FormControl('', [Validators.required]),
    userCity: new FormControl('', [Validators.required]),
    userCountry: new FormControl('', [Validators.required]),
    userStreet: new FormControl('', [Validators.required]),
    userHome: new FormControl('', [Validators.required]),
    userEnterance: new FormControl('', [Validators.required]),
    userApartment: new FormControl('', [Validators.required]),
    userPostalCode: new FormControl('', [Validators.required])
  })

  constructor(private userService: UserServiceService, private spinner: NgxSpinnerService, private toast: ToastService, private afs: AngularFirestore, private firestore: Firestore, private router: Router) {
    spinner.show()
   }

  ngOnInit(): void {
   this.fetchUserData()
  }

  async fetchUserData() {
    this.userService.fetchUserData().then((data) => {
      this.userData = data
      this.userName = this.userData.name
      this.userEmail = this.userData.email
      this.userImage = this.userData.profileImage
      this.userId = this.userData.uid
      this.userPhone = this.userData.phone,
      this.userCity = this.userData.userCity,
      this.userCountry = this.userData.userCountry,
      this.userStreet = this.userData.userStreet,
      this.userHome = this.userData.userHome,
      this.userEnterance = this.userData.userEnterance,
      this.userApartment = this.userData.userApartment,
      this.userPostalCode = this.userData.userPostalCode,
  
      this.profileForm.patchValue({
        userName: this.userName,
        userEmail: this.userEmail,
        userPhone: this.userPhone,
        userCity: this.userCity,
        userCountry: this.userCountry,
        userStreet: this.userStreet,
        userHome: this.userHome,
        userEnterance: this.userEnterance,
        userApartment: this.userApartment,
        userPostalCode: this.userPostalCode
      })
      this.spinner.hide()
     })
  }

  chooseCurrentUserImage(event: any) {
    this.currentUserImage = event.target.files[0];
  }

  selectNewImage(event: any) {
    if (!event.target.files[0] || event.target.files[0].length == 0) {
      this.toast.error("Please Select an Image!")
      return
    }

    var mimeType = event.target.files[0].type;

    if (mimeType.match(/image\/*/) == null) {
      this.toast.error("Only Images are supported!")
			return;
		}

    var reader = new FileReader();
		reader.readAsDataURL(event.target.files[0]);

    reader.onload = (_event) => {
			this.newUserImage = reader.result; 
		}
  }

  updateUserData() {
    this.spinner.show()
    const storage = getStorage();

    const metadata = {
      contentType: 'image/jpeg'
    };

    // Upload file and metadata to the object 'images/mountains.jpg'
    const storageRef = ref(storage, 'userProfileImages/' + this.userName);
    const uploadTask = uploadBytesResumable(storageRef, this.currentUserImage, metadata);

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on('state_changed',
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      }, 
      (error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case 'storage/unauthorized':
            // User doesn't have permission to access the object
            break;
          case 'storage/canceled':
            // User canceled the upload
            break;

          // ...

          case 'storage/unknown':
            // Unknown error occurred, inspect error.serverResponse
            break;
        }
      }, 
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          const ref = doc(this.firestore, 'users', this.userId)
          console.log(this.userId, this.userEmail)
          return from(updateDoc(ref, {
            email: this.profileForm.get('userEmail')?.value,
            name: this.profileForm.get('userName')?.value,
            profileImage: downloadURL,
            uid: this.userId,
            phone: this.profileForm.get('userPhone')?.value,
            userCity: this.profileForm.get('userCity')?.value,
            userCountry: this.profileForm.get('userCountry')?.value,
            userStreet: this.profileForm.get('userStreet')?.value,
            userHome: this.profileForm.get('userHome')?.value,
            userEnterance: this.profileForm.get('userEnterance')?.value,
            userApartment: this.profileForm.get('userApartment')?.value,
            userPostalCode: this.profileForm.get('userPostalCode')?.value
          }))
        });
        this.spinner.hide()
        this.router.navigate(['/'])
        this.toast.success("Profile Successfully Updated")
      }
    );
  }

}
