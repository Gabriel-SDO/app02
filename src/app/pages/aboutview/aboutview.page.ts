import { Component, OnInit } from '@angular/core';

// Importa dependências
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-aboutview',
  templateUrl: './aboutview.page.html',
  styleUrls: ['./aboutview.page.scss'],
})
export class AboutviewPage implements OnInit {

  // Atributos
  private id: string; // ID do documento
  private apiURL = 'http://localhost:3000/'; // URL da API
  private data: any; // Documento (null)

  constructor(

    // Injeta dependências
    public activatedRoute: ActivatedRoute,
    public http: HttpClient,
    public router: Router
  ) {

    // Obtém o ID do documento da rota
    this.id = this.activatedRoute.snapshot.paramMap.get('id');

    // Obter o documento
    this.http.get(this.apiURL + `abouts?id=${this.id}&status=true`).subscribe(
      (res: any) => {
        if (res.length === 0)
          this.router.navigate(['/about']);
        else
          this.data = res[0];
      },
      () => {
        this.router.navigate(['/about']);
      }
    )
  }

  ngOnInit() { }
}
