import { Component, OnInit } from '@angular/core';
import { FsApiService } from 'src/service/fs-api.service';
import { Category } from 'src/models/Category';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Modal } from 'bootstrap';
import * as bootstrap from 'bootstrap';
import { HotToastModule, HotToastService } from '@ngneat/hot-toast';
import { Ilanlar } from 'src/models/Ilanlar';
import { AuthService } from 'src/service/auth.service';





@Component({
  selector: 'app-ilanlar',
  templateUrl: './ilanlar.component.html',
  styleUrls: ['./ilanlar.component.scss']
})
export class IlanlarComponent implements OnInit {
  ilanlar!: Ilanlar[];
  kategoriler!: Category[];
  ilanKayit!: Ilanlar;
  modal!: Modal;
  modalBaslik: string = "";
  secIlan!: Ilanlar;
  categoryId: string = "";


  frm: FormGroup = new FormGroup({
    id: new FormControl(),
    ilanadi: new FormControl(),
    detail: new FormControl(),
    resim: new FormControl(),
    odasayisi: new FormControl(),
    adres: new FormControl(),
    categoryId: new FormControl(),
  });
  route: any;


  constructor(
    public formBuilder: FormBuilder,
    private afs: FsApiService,
    private authService: AuthService,
    private toastr: HotToastService



  ) { }

  ngOnInit(): void {
    if (this.categoryId != "") {
      this.route.params.subscribe((p: any) => {
        if (p.katId) {
          this.categoryId = p.categoryId;
          this.CategoryGetir();
        }
      });
    }
    //Sayfa Güvenligini burdda kontrol ediyoruz
    if (this.authService.OturumKontrol() == false) {
      location.href = "/giris";
    }
    this.CategoryGetir();
    this.IlanGetir();
  }


  Ekle(el: HTMLElement) {
    this.frm.reset();
    this.modal = new bootstrap.Modal(el);
    this.modalBaslik = "Odev Ekle";
    this.modal.show();
  }
  Duzenle(ilan: Ilanlar, el: HTMLElement) {
    this.frm.patchValue(ilan);
    this.modalBaslik = "Odev Düzenle";
    this.modal = new bootstrap.Modal(el);
    this.modal.show();
  }
  Sil(ilan: Ilanlar, el: HTMLElement) {
    this.secIlan = ilan;
    this.modalBaslik = "İlan Sil";
    this.modal = new bootstrap.Modal(el);
    this.modal.show();
  }

  ilanEkleDuzenle() {
    var ilan: Ilanlar = this.frm.value
    var tarih = new Date();
    if (!ilan.id) {
      ilan.kayittarihi = tarih.getTime().toString();
      ilan.duzenlenmetarihi = tarih.getTime().toString();
      this.afs.IlanEkle(ilan).then(e => {
        this.IlanGetir();
        this.modal.toggle();
        this.toastr.success('Başarılı Bir Şekilde Eklendi', {
          duration: 2000,
          style: {
            border: '1px solid #00ff22',
            padding: '16px',
            color: '#00ff22',
          },
          iconTheme: {
            primary: '#00ff22',
            secondary: '#FFFAEE',
          },
        });
      });
    }
    else {
      ilan.duzenlenmetarihi = tarih.getTime().toString();
      this.afs.IlanDuzenle(ilan).then(e => {
        this.IlanGetir();
        this.modal.toggle();
        this.toastr.success('Başarılı Bir Şekilde Güncellendi', {
          duration: 2000,
          style: {
            border: '1px solid #00ff22',
            padding: '16px',
            color: '#00ff22',
          },
          iconTheme: {
            primary: '#00ff22',
            secondary: '#FFFAEE',
          },
        });
      });
    }
  }


  IlanSil() {
    this.afs.IlanSil(this.secIlan.id!).then(e => {
      this.IlanGetir();
      this.modal.toggle();
      this.toastr.success('Başarılı Bir Şekilde Silin', {
        duration: 2000,
        style: {
          border: '1px solid #00ff22',
          padding: '16px',
          color: '#00ff22',
        },
        iconTheme: {
          primary: '#00ff22',
          secondary: '#FFFAEE',
        },
      });
    });
  }




  CategorySec(categoryId: string) {
    this.categoryId = categoryId;
    this.IlanGetir();
  }



  IlanGetir() {
    if (this.categoryId != "" && this.categoryId != "Tüm Kategoriler") {
      this.afs.IlanByIdGetir(this.categoryId).subscribe((data: any) => {
        this.ilanlar = data.map((e: any) => {
          return {
            id: e.payload.doc.id,
            ilanadi: e.payload.doc.data().ilanadi,
            resim: e.payload.doc.data().resim,
            detail: e.payload.doc.data().detail,
            odasayisi: e.payload.doc.data().odasayisi,
            adres: e.payload.doc.data().adres,
            ...e.payload.doc.data()

          } as Category 
        });
      })
    }
    else {
      this.afs.IlanGetir().subscribe((data: any) => {
        this.ilanlar = data.map((e: any) => {
          return {
            id: e.payload.doc.id,
            ilanadi: e.payload.doc.data().ilanadi,
            detail: e.payload.doc.data().detail,
            resim: e.payload.doc.data().resim,
            odasayisi: e.payload.doc.data().odasayisi,
            adres: e.payload.doc.data().adres,
            ...e.payload.doc.data()

          } as Category
        });
      })
    }

  }

  CategoryGetir() {
    this.afs.CategoryGetir().subscribe((data: any) => {
      this.kategoriler = data.map((e: any) => {
        return {
          id: e.payload.doc.id,
          kategoriadi: e.payload.doc.data().kategoriadi,
          ...e.payload.doc.data()

        } as Category
      });
    })
  }

}
