import { Component, OnInit } from '@angular/core';

// Importa dependências
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { DatePipe } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl
} from '@angular/forms';

// Validação (filtro) personalizado
// Não permite compos somente com espaços
export function removeSpaces(control: AbstractControl) {
  if (control && control.value && !control.value.replace(/\s/g, '').length) {
    control.setValue('');
  }
  return null;
}

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {

  // Atributos
  private id: string;
  public apiURL = 'http://localhost:3000/';
  public data: Array<any> = [];
  public editForm: FormGroup;        // Cria o formulário
  public pipe = new DatePipe('en_US');  // Formatador de datas

  constructor(

    // Injeta dependências
    public activatedRoute: ActivatedRoute,
    public http: HttpClient,
    public router: Router,
    public alertController: AlertController,
    public form: FormBuilder
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

          // Cria os campos do formulário
          this.editFormCreate();

        },
        (error) => {

          // Retorna para a lista de games
          this.router.navigate(['/home/title/asc']);
        });
  }

/////////////////////////////////////////////////////////////////

  // Cria os campos do formulário
  editFormCreate() {

    this.editForm = this.form.group({

      // Data de envio (date)
      date: [''],

      // Status do contato (status)
      status: ['Enviado'],

      // Nome do remetente (name)
      title: [                       // Nome do campo
        '',                         // Valor inicial do campo
        Validators.compose([        // Valida o campo
          Validators.required,      // Campo é obrigatório
          Validators.minLength(3),  // Deve ter pelo menos 3 caracteres
          removeSpaces              // Remove espaços duplicados
        ])
      ],

      // E-mail do remetente (email)
      email: [                      // Nome do campo
        '',                         // Valor inicial do campo
        Validators.compose([        // Valida o campo
          Validators.required,      // Campo é obrigatório
          Validators.email,         // Deve ser um e-mail válido
          removeSpaces              // Remove espaços duplicados
        ])
      ],

      // Assunto do contato (subject)
      subject: [                    // Nome do campo
        '',                         // Valor inicial do campo
        Validators.compose([        // Valida o campo
          Validators.required,      // Campo é obrigatório
          Validators.minLength(5),  // Deve ter pelo menos 5 caracteres
          removeSpaces              // Remove espaços duplicados
        ])
      ],

      // Mensagem do contato (message)
      message: [                    // Nome do campo
        '',                         // Valor inicial do campo
        Validators.compose([        // Valida o campo
          Validators.required,      // Campo é obrigatório
          Validators.minLength(5),  // Deve ter pelo menos 5 caracteres
          removeSpaces              // Remove espaços duplicados
        ])
      ]
    });
  };

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
