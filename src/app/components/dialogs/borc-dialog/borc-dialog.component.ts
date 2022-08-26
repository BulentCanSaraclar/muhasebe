import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder} from "@angular/forms";
import {Borc} from "../../../models/borc";

@Component({
  selector: 'app-borc-dialog',
  templateUrl: './borc-dialog.component.html',
  styleUrls: ['./borc-dialog.component.scss']
})
export class BorcDialogComponent implements OnInit {
  yeniKayit: any = new Borc();
  Baslik= "";
  form: any;
  constructor(
    public dialogRef:MatDialogRef<BorcDialogComponent>,
    public formBuilder:FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data:any
  ) {
  if (data.islem === "Ekle"){
    this.yeniKayit = new Borc();
  }else {
    this.yeniKayit = data.kayit;
  }
}

  ngOnInit(): void {
    this.Baslik = this.data.islem
    this.form = this.FormOlustur()
  }
  FormOlustur(){
    return this.formBuilder.group({
      BorcId:[this.yeniKayit.BorcId],
      MusteriId:[this.yeniKayit.MusteriId],
      Aciklama:[this.yeniKayit.Aciklama],
      BorcTutari:[this.yeniKayit.BorcTutari]
    })
  }
}
