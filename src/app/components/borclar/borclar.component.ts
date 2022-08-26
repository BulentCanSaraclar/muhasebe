import { Component, OnInit } from '@angular/core';
import {BorcDialogComponent} from "../dialogs/borc-dialog/borc-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {FsApiService} from "../../fs-api.service";
import {ActivatedRoute} from "@angular/router";
import {Musteri} from "../../models/musteri";
import {Borc} from "../../models/borc";
import {MatTableDataSource} from "@angular/material/table";
import { v4 as uuid } from 'uuid';
@Component({
  selector: 'app-borclar',
  templateUrl: './borclar.component.html',
  styleUrls: ['./borclar.component.scss']
})
export class BorclarComponent implements OnInit {
  borclar: any[] = [];
  musteri: Musteri = new Musteri()
  dataSource: any;
  toplam: number = 0;
  displayColumns = ['Aciklama', 'BorcTutari', 'Islemler'];
  musteriId= "";


  constructor(
    private matDialog: MatDialog,
    private afs: FsApiService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.musteriId = this.route.snapshot.params['MusteriId']
    this.BorcByMusteri()
  }

  BorcByMusteri = () => {
    this.afs.BorcbyMusteriId(this.musteriId).subscribe((data: any) => {
      this.borclar = data.map((a: any) => {
        console.log(a)
        return {
          BorclarId: a.payload.doc.id.toString(),
          ...a.payload.doc.data()
        } as Borc
      })
      this.dataSource = new MatTableDataSource(this.borclar);
      this.toplam = 0;
      this.borclar.forEach(borc => {
        this.toplam += borc.BorcTutari
      })
    })
  }
  MusteriGetir = () => {
    this.afs.MusteriById(this.musteriId).subscribe((data: any) => {
      this.musteri = data;
    });
  }
  BorcEkle = () => {
    const dialogRef = this.matDialog.open(BorcDialogComponent, {
      width: "400px",
      data: {islem: "Ekle"}
    });
      dialogRef.afterClosed().subscribe((data: Borc) => {
      if (data) {
        data.MusteriId = this.musteriId
        this.afs.BorcEkle(data).then(e => {
          this.BorcByMusteri()
        })
      }
    })
  }

  BorcDuzenle(borc: Borc) {
    const dialogRef = this.matDialog.open(BorcDialogComponent, {
      width: "400px",
      data: {
        islem: "Düzenle",
        kayit: borc
      }
    })
    dialogRef.afterClosed().subscribe((data: Borc) => {
      if (data) {
        this.afs.BorcDuzenle(data).then(e => {
          this.BorcByMusteri()
        })
      }
    })
  }

  BorcSil(borcId: string) {
    this.afs.BorcSil(borcId).then(e => {
      this.BorcByMusteri()
    });
  }
}
