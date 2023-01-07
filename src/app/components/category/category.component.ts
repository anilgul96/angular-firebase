import { Component, OnInit } from '@angular/core';
import { FsApiService } from 'src/service/fs-api.service';
import { Category } from 'src/models/Category';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Modal } from 'bootstrap';
import * as bootstrap from 'bootstrap';
import { HotToastModule, HotToastService } from '@ngneat/hot-toast';
import { AuthService } from 'src/service/auth.service';





@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  kategoriler!: Category[];
  kategoriKayit!: Category;
  modal!: Modal;
  modalBaslik: string = "";
  secCategory!: Category;


  frm: FormGroup = new FormGroup({
    id: new FormControl(),
    kategoriadi: new FormControl(),
  });


  constructor(
    public formBuilder: FormBuilder,
    private afs: FsApiService,
    private authService: AuthService,
    private toastr: HotToastService
  ) { }

  ngOnInit(): void {

    this.CategoryGetir();

        //Sayfa Güvenligini burdda kontrol ediyoruz
        if (this.authService.OturumKontrol() == false) {
          location.href = "/giris";
        }
  }


  Ekle(el: HTMLElement) {
    this.frm.reset();
    this.modal = new bootstrap.Modal(el);
    this.modalBaslik = "Ders Ekle";
    this.modal.show();
  }
  Duzenle(kategori: Category, el: HTMLElement) {
    this.frm.patchValue(kategori);
    this.modalBaslik = "Kategori Düzenle";
    this.modal = new bootstrap.Modal(el);
    this.modal.show();
  }
  Sil(kategori: Category, el: HTMLElement) {
    this.secCategory = kategori;
    this.modalBaslik = "Ders Sil";
    this.modal = new bootstrap.Modal(el);
    this.modal.show();
  }

  categoryEkleDuzenle() {
    var kategori: Category = this.frm.value
    var tarih = new Date();

    if (!kategori.id) {
      kategori.kayittarihi = tarih.getTime().toString();
      kategori.duzenlenmetarihi = tarih.getTime().toString();
      this.afs.CategoryEkle(kategori).then(e => {
        this.CategoryGetir();
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
      kategori.duzenlenmetarihi = tarih.getTime().toString();
      this.afs.CategoryDuzenle(kategori).then(e => {
        this.CategoryGetir();
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


  CategorySil() {
    this.afs.CategorySil(this.secCategory.id!).then(e => {
      this.CategoryGetir();
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
