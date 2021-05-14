import { Component, OnInit } from '@angular/core';

// Importa dependências
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

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

  constructor(

    // Injeta dependências
    public http: HttpClient,
    public activatedRoute: ActivatedRoute,
    public router: Router
  ) { }

  ngOnInit() { }

  ionViewWillEnter() {

    // Obtém valores das variáveis da URL (rota)
    this.sort = this.activatedRoute.snapshot.paramMap.get('sort');
    this.order = this.activatedRoute.snapshot.paramMap.get('order');

    // Obtem todos os documentos da API
    this.http.get(this.apiURL + `games?_sort=${this.sort}&_order=${this.order}&status=ativo`)
      .subscribe(
        (res: any) => {

          // Obtém cada documento de games
          res.forEach(
            (item: any, key: number) => {

              // Obtém a plataforma do game
              this.http.get(this.apiURL + 'platforms/' + item.platform)
                .subscribe(
                  (platformData: any) => {
                    res[key]['platformName'] = platformData.name;
                  }
                );

              // Obtém o tipo do game
              this.http.get(this.apiURL + 'types/' + item.type)
                .subscribe(
                  (typeData: any) => {
                    res[key]['typeName'] = typeData.name;
                  }
                );
            }
          );

          // Prepara dados para a view (HTML)
          this.data = res;
        }
      );
  }


  // Seleciona o campo de ordenação e a ordem (asc, desc)
  reOrder(order: string) {
    this.router.navigate([`/home/${this.sort}/${order}`]);
  }

}
