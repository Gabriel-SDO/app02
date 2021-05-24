import { Component, OnInit } from '@angular/core';

import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {

  public apiURL = 'http://localhost:3000/'; // URL da API
  private data: any; // Documentos da coleção

  constructor(
    public http: HttpClient
  ) { }

  ngOnInit() {

    this.http.get(this.apiURL + 'abouts?status=true').subscribe(
      (res: any) => {
        if (res) this.data = res;
      }
    );
  }
}
