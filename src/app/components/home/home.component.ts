import { Component, OnInit } from '@angular/core';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthService } from 'src/service/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(    private authService: AuthService,    private toastr: HotToastService) { }

  ngOnInit(): void {
    localStorage.setItem('one', "0");

    this.toastr.success('Başarılı Bir Şekilde Giriş Yapıldı', {
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
  }

}
