import { Component, OnInit } from '@angular/core';
import {FsApiService} from "../../fs-api.service";
import {Musteri} from "../../models/musteri";
import {MatTableDataSource} from "@angular/material/table";
import {MatDialog} from "@angular/material/dialog";
import {MusteriDialogComponent} from "../dialogs/musteri-dialog/musteri-dialog.component";

@Component({
  selector: 'app-musteriler',
  templateUrl: './musteriler.component.html',
  styleUrls: ['./musteriler.component.scss']
})
export class MusterilerComponent implements OnInit {
  musteriler: Musteri[] | undefined;
  dataSource: any;
  displayedColumns = ["MusteriAdi","MusteriTel","Islemler"];

  constructor(
    private afs: FsApiService,
    private matDialog:MatDialog
  ) { }

  ngOnInit(): void {
    this.musteriGetir();
  }
  musteriGetir = () => {
    this.afs.MusterileriGetir().subscribe((data:any)=>{
      this.musteriler = data.map((a:any)=>{
        // console.log(a.payload.doc.id)
        return{
          MusteriId:a.payload.doc.id.toString(),
          ...a.payload.doc.data()
        } as Musteri
      })
      this.dataSource = new MatTableDataSource(this.musteriler)
    })
  }
  musteriEkle = () => {
   const dialogRef = this.matDialog.open(MusteriDialogComponent, {
      width: "500px",
      data:{islem:"Ekle"}
    });
     dialogRef.afterClosed().subscribe((data: Musteri)=>{
       if (data) {

         this.afs.MusteriEkle(data).then((e: any)=>{
           this.musteriGetir();

           this.afs.MusteriById("1").subscribe((f: any)=>{
             console.log(f);
           });
      });}
    })
  }
  musteriDuzenle = (musteri:Musteri) => {
    const dialogRef = this.matDialog.open(MusteriDialogComponent,{
      width: "500px",
      data: {islem:"Düzenle", kayit:musteri},
    });
    dialogRef.afterClosed().subscribe((data: Musteri)=>{
      if (data) {
        this.afs.MusteriDuzenle(data).then((e: any)=>{
          this.musteriGetir();
        });}
    })
  }
  musteriSil = (musteri:Musteri) => {
    this.afs.MusteriSil(musteri.MusteriId).then((e: any)=>{
      this.musteriGetir();
    });
  }
}
