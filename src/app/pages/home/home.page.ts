import { Component, OnInit } from '@angular/core';

// Importa dependências
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

//
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  // Atributos
  public apiURL = 'http://localhost:3000/';
  public data: Array<any> = [];
  public sort = 'title';
  public order = 'asc';
  public uid: string;

  constructor(

    // Injeta dependências
    public http: HttpClient,
    public activatedRoute: ActivatedRoute,
    public router: Router,

    //
    public auth: AngularFireAuth
  ) {

    this.auth.onAuthStateChanged(
      (uData) => {
        this.uid = uData.uid;
      }
    );
  }

  ngOnInit() { }

  ionViewWillEnter() {

    // Obtém valores das variáveis da URL (rota)
    this.sort = this.activatedRoute.snapshot.paramMap.get('sort');
    this.order = this.activatedRoute.snapshot.paramMap.get('order');

    // Obtém dados do usuário logado

    if (this.uid) {

      // Obtem todos os documentos da API
      this.http.get(
        this.apiURL
        + `games?uid=${this.uid}&_expand=medias&_expand=platforms&_expand=types&_sort=${this.sort}&_order=${this.order}`)
        .subscribe(
          (res: any) => {

            // Prepara dados para a view (HTML)
            this.data = res;
          }
        );
    }
  }

  // Seleciona o campo de ordenação e a ordem (asc, desc)
  reOrder(order: string) {
    this.router.navigate([`/home/${this.sort}/${order}`]);
  }

}
