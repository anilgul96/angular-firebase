import { Ilanlar } from './../models/Ilanlar';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Category } from 'src/models/Category';

@Injectable({
  providedIn: 'root'
})
export class FsApiService {
  OturumKontrol() {
    throw new Error("Method not implemented.");
  }

  constructor(
    private afs: AngularFirestore
  ) { }

  //#region Ders
  CategoryGetir() {
    return this.afs.collection("kategoriler").snapshotChanges();
  }
  CategoryByIdGetir(id: string) {
    return this.afs.collection("kategoriler").doc(id).valueChanges();
  }
  CategoryEkle(Kategori: Category) {
    delete Kategori.id // burdasın
    return this.afs.collection("kategoriler").add(Kategori);
  }
  CategoryDuzenle(Kategori: Category) {
    return this.afs.collection("kategoriler").doc(Kategori.id).update(Kategori);
  }
  CategorySil(id: string) {
    return this.afs.collection("kategoriler").doc(id).delete();
  }

  //#region Odev
  IlanGetir() {
    return this.afs.collection("ilanlar").snapshotChanges();
  }
  IlanByIdGetir(id: string) {
    return this.afs.collection("ilanlar", q => q.where("categoryId", "==", id)).snapshotChanges();
  }
  IlanEkle(Ilanlar: Ilanlar) {
    delete Ilanlar.id
    return this.afs.collection("ilanlar").add(Ilanlar);
  }
  IlanDuzenle(Ilanlar: Ilanlar) {
    return this.afs.collection("ilanlar").doc(Ilanlar.id).update(Ilanlar);
  }
  IlanSil(id: string) {
    return this.afs.collection("ilanlar").doc(id).delete();
  }

  //Odev Detay
  DetayByIlanId(IlanId: string){
    return this.afs.collection("ilanlar", q => q.where("id", "==", IlanId)).snapshotChanges();
  }



}
