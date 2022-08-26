import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Musteri} from "../../../models/musteri";

@Component({
  selector: 'app-musteri-dialog',
  templateUrl: './musteri-dialog.component.html',
  styleUrls: ['./musteri-dialog.component.scss']
})
export class MusteriDialogComponent implements OnInit {
  Baslik:any;
  musteriKayit: Musteri = new Musteri();
  form!: FormGroup;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public formBuilder: FormBuilder,
    public dialogRef:MatDialogRef<MusteriDialogComponent>,

  ) {
    if (this.data.islem=="Ekle") {
      this.musteriKayit = new Musteri();
    }else if (this.data.islem=="Düzenle"){
      this.musteriKayit = this.data.kayit;
    }
  }
  ngOnInit(): void {
    this.Baslik = this.data.islem;
    this.form = this.FormOlustur()
  }
  FormOlustur(){
    return this.formBuilder.group({
      MusteriId:[this.musteriKayit.MusteriId],
      MusteriAdi:[this.musteriKayit.MusteriAdi],
      MusteriAdres:[this.musteriKayit.MusteriAdres],
      MusteriTel:[this.musteriKayit.MusteriTel]
    })
  }
}
