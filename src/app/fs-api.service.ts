import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Musteri} from "./models/musteri";
import {Borc} from "./models/borc";
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class FsApiService {

  constructor(
    private afs:AngularFirestore
  ) { }
  //#region Musteri
  MusterileriGetir = () => {
    return this.afs.collection('musteriler').snapshotChanges();
  }
  MusteriById = (MusteriId:string) => {
    return this.afs.collection('musteriler').doc("MusteriId").valueChanges();
  }
  MusteriEkle(musteri: Musteri){
    musteri.MusteriId = uuidv4();

    // delete musteri.MusteriId;
    console.log(musteri)
    return this.afs.collection('musteriler' ).doc(musteri.MusteriId).set(Object.assign({}, musteri));
  }
  MusteriDuzenle(musteri:Musteri){
    return this.afs.collection('musteriler').doc(musteri.MusteriId).update(musteri);
  }
  MusteriSil(MusteriId:string){
    return this.afs.collection('musteriler').doc(MusteriId).delete();
  }
  //#endregion
  //#region Borc
  BorcbyMusteriId(musteriId:string){
    return this.afs.collection('borclar', q=>q.where('MusteriId','==', musteriId)).snapshotChanges();
  }
  BorcEkle(borc:Borc){
    delete borc.BorcId
    borc.BorcId = uuidv4();
    return this.afs.collection('borclar').doc(borc.BorcId).set(Object.assign({}, borc));
  }
  BorcDuzenle(borc:Borc){
    return this.afs.collection('borclar').doc(borc.BorcId).update(borc);
  }
  BorcSil(borcId:string){
    return this.afs.collection('borclar').doc(borcId).delete();
  }
  //#endregion
}
