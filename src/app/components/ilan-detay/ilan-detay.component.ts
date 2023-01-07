import { Component, OnInit } from '@angular/core';
import { FsApiService } from 'src/service/fs-api.service';
import { Category } from 'src/models/Category';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Modal } from 'bootstrap';
import * as bootstrap from 'bootstrap';
import { HotToastModule, HotToastService } from '@ngneat/hot-toast';
import { Ilanlar } from 'src/models/Ilanlar';
import { ActivatedRoute } from '@angular/router';





@Component({
  selector: 'app-ilan-detay',
  templateUrl: './ilan-detay.component.html',
  styleUrls: ['./ilan-detay.component.scss']
})
export class IlanDetayComponent implements OnInit {
  ilanDetay: Ilanlar = new Ilanlar();
  IlanId!: string;
  

  constructor(
    public afs: FsApiService,
    public route: ActivatedRoute
  ) { }


  ngOnInit() {
    
    // this.OdevId = this.route.snapshot.params['id'];
    this.route.params.subscribe((p: any) => {
        this.IlanId = p.id;
    });
    this.IlanListele();



  }
  
  IlanListele() {
    this.afs.DetayByIlanId(this.IlanId).subscribe(d =>{
      d.forEach((e: any) => {
        this.ilanDetay = {
          id: e.payload.doc.id,
          ...(e.payload.doc.data() as Ilanlar)
        } as Ilanlar;
      });
    });
    
  }
}


