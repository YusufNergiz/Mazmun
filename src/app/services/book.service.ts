import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { query, orderBy, limit, collection } from "firebase/firestore";  

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private afs: AngularFirestore) { }

  async fetchAllBooks() {
    return this.afs.collection("users", ref => ref.orderBy("uploadDate")).valueChanges()
  }
}
