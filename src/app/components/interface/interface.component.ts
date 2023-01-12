import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';
import { Category } from 'src/models/Category';
import { Ilanlar } from 'src/models/Ilanlar';
import { AuthService } from 'src/service/auth.service';
import { FsApiService } from 'src/service/fs-api.service';

@Component({
  selector: 'app-interface',
  templateUrl: './interface.component.html',
  styleUrls: ['./interface.component.scss']
})
export class InterfaceComponent implements OnInit {
  ilanlar!: Ilanlar[];
  categoryId: string = "";
  kategoriler!: Category[];




  constructor(
    public formBuilder: FormBuilder,
    private afs: FsApiService,
    private authService: AuthService,
    private toastr: HotToastService
  ) { }

  ngOnInit(): void {

    this.CategoryGetir();
    this.IlanGetir();
  }


  CategorySec(categoryId: string) {
    this.categoryId = categoryId;
    this.IlanGetir();
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

}
