import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { uuidv4 } from '@firebase/util';
import { ToastService } from 'angular-toastify';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  url: any;


  bookForm = new FormGroup({
    price: new FormControl('', [Validators.required]),
    discount: new FormControl(false, [Validators.required]),
    discountedPrice: new FormControl({value: '', disabled: true}),
    description: new FormControl('', [Validators.required]),
    yearOfIssue: new FormControl('', [Validators.required]),
    delivery: new FormControl('', [Validators.required]),
    bookName: new FormControl('', [Validators.required]),
    author: new FormControl('', [Validators.required]),
    publisher: new FormControl('', [Validators.required]),
    series: new FormControl('', [Validators.required]),
    pages: new FormControl('', [Validators.required]),
    isbn: new FormControl('', [Validators.required]),
    availability: new FormControl(true, [Validators.required]),
    cover: new FormControl(''),
    coverImage: new FormControl('', [Validators.required]),
    coverImageSource: new FormControl('', [Validators.required])
  })

  constructor(private afs: AngularFirestore, private toast: ToastService, private route: Router) { }

  ngOnInit(): void {
  }

  toggleDiscount() {
    console.log(this.bookForm.get('yearOfIssue')?.value)
    this.bookForm.patchValue({
      discount: !this.bookForm.get('discount')?.value
    })
    if (this.bookForm.controls['discountedPrice'].disabled) {
      this.bookForm.controls['discountedPrice'].enable()
      document.getElementById("discountedPrice")?.classList.remove("discountedPriceEnabled")
    }
    else {
      this.bookForm.controls['discountedPrice'].disable()
      document.getElementById("discountedPrice")?.classList.add("discountedPriceEnabled")
    }
  }

  getBookCoverImage(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.bookForm.patchValue({
        coverImageSource: file
      })
    }
  }

  uploadImage(fileName: any, file: any) {
    const storage = getStorage();

// Create the file metadata
/** @type {any} */
const metadata = {
  contentType: 'image/jpeg'
};

// Upload file and metadata to the object 'images/mountains.jpg'
const storageRef = ref(storage, 'bookCovers/' + fileName);
const uploadTask = uploadBytesResumable(storageRef, file, metadata);

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
      this.afs.collection('books').doc(uuidv4()).set({
        bookName: this.bookForm.get("bookName")?.value,
        price: this.bookForm.get("price")?.value,
        discount: this.bookForm.get("discount")?.value,
        discountedPrice: this.bookForm.get("discountedPrice")?.value,
        description: this.bookForm.get("description")?.value,
        yearOfIssue: this.bookForm.get("yearOfIssue")?.value,
        delivery: this.bookForm.get("delivery")?.value,
        author: this.bookForm.get("author")?.value,
        publisher: this.bookForm.get("publisher")?.value,
        series: this.bookForm.get("series")?.value,
        pages: this.bookForm.get("pages")?.value,
        isbn: this.bookForm.get("isbn")?.value,
        availability: this.bookForm.get("availability")?.value,
        cover: this.bookForm.get("cover")?.value,
        coverImage: downloadURL
      })
    });
  }
);
  }

  saveBookToFirestore() {
    this.uploadImage(this.bookForm.get("bookName")?.value, this.bookForm.get("coverImageSource")?.value)
    this.toast.success("Book Successfully Added!")
    this.route.navigate(['/'])
  }

  selectFile(event: any) {
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
			this.url = reader.result; 
		}
  }

}
