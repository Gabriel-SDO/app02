import { Component, OnInit } from '@angular/core';

// Importa dependências
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.page.html',
  styleUrls: ['./delete.page.scss'],
})
export class DeletePage implements OnInit {

  // Atributos
  private id: string;
  public apiURL = 'http://localhost:3000/';
  public data: Array<any> = [];

  constructor(

    // Injeta dependências
    public activatedRoute: ActivatedRoute,
    public http: HttpClient,
    public router: Router,
    public alertController: AlertController
  ) { }

  ngOnInit() {

    // Obtém o ID do documento a ser apagado
    this.id = this.activatedRoute.snapshot.paramMap.get('id');

    // Obtem todos os documentos da API
    this.http.get(this.apiURL + `games/${this.id}`)
      .subscribe(
        (res: any) => {

          // Obtém a plataforma do game
          this.http.get(this.apiURL + 'platforms/' + res.platform)
            .subscribe(
              (platformData: any) => {
                res['platformName'] = platformData.name;
              }
            );

          // Obtém o tipo do game
          this.http.get(this.apiURL + 'types/' + res.type)
            .subscribe(
              (typeData: any) => {
                res['typeName'] = typeData.name;
              }
            );

          // Envia dados do documento obtido para a API
          this.data = res;
        },
        (error) => {

          // Retorna para a lista de games
          this.router.navigate(['/home/title/asc']);
        });
  }

  // Apaga documento de forma permanente
  delete(id: string) {

    this.http.delete(this.apiURL + `games/${this.id}`)
      .subscribe(
        () => {

          // Exibe feedback
          this.presentAlertConfirm();
        }
      )
  }

  // Caixa de alerta
  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: 'Concluído',
      message: 'Jogo apagado com sucesso!',
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            
            // Volta para a lista de jogos
            this.router.navigate(['/home/title/asc']);
          }
        }
      ]
    });

    await alert.present();
  }
}
