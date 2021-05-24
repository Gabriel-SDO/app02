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

//
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-new',
  templateUrl: './new.page.html',
  styleUrls: ['./new.page.scss'],
})
export class NewPage implements OnInit {

  // Atributos
  public apiURL = 'http://localhost:3000/';
  public newForm: FormGroup;
  public pipe = new DatePipe('en_US');

  public types: any;
  public platforms: any;
  public medias: any;

  constructor(

    // Injeta dependências
    public activatedRoute: ActivatedRoute,
    public http: HttpClient,
    public router: Router,
    public alert: AlertController,
    public form: FormBuilder,
    public auth: AngularFireAuth
  ) {

    this.auth.onAuthStateChanged(
      (uData) => {
        this.newForm.controls.uid.setValue(uData.uid);
      }
    );

    // Cria os campos do formulário
    this.newFormCreate();

    // Obtém todos os documentos de "platforms"
    this.http.get(this.apiURL + 'types').subscribe(
      (data: any) => this.types = data
    );

    // Obtém todos os documentos de "platforms"
    this.http.get(this.apiURL + 'platforms').subscribe(
      (data: any) => this.platforms = data
    );

    // Obtém todos os documentos de "medias"
    this.http.get(this.apiURL + 'medias').subscribe(
      (data: any) => this.medias = data
    );


  }

  ngOnInit() { }

  // Cria os campos do formulário
  newFormCreate() {

    this.newForm = this.form.group({

      // Data de envio (date)
      date: [''],

      // Status do contato (status)
      status: ['true'],

      // Nome do remetente (name)
      title: [                      // Nome do campo
        '',                         // Valor inicial do campo
        Validators.compose([        // Valida o campo
          Validators.required,      // Campo é obrigatório
          Validators.minLength(3),  // Deve ter pelo menos 3 caracteres
          removeSpaces              // Remove espaços duplicados
        ])
      ],

      // Imagem da capa do jogo (cover)
      cover: [                    // Nome do campo
        '',                         // Valor inicial do campo
        Validators.compose([        // Valida o campo
          Validators.required,      // Campo é obrigatório
          Validators.pattern(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g),
          removeSpaces              // Remove espaços duplicados
        ])
      ],

      // Tipo de mídia do jogo (media)
      mediasId: [''],

      // Tipo de plataforma do jogo (platform) passa somente ID
      platformsId: [''],

      // Tipo de jogo (type) passa somente ID
      typesId: [''],

      // Descrição do jogo (description)
      description: [                    // Nome do campo
        '',                         // Valor inicial do campo
        Validators.compose([        // Valida o campo
          Validators.required,      // Campo é obrigatório
          Validators.minLength(5),  // Deve ter pelo menos 5 caracteres
          removeSpaces              // Remove espaços duplicados
        ])
      ],

      // Id do proprietário
      'uid': ['']
    });
  };

  // Permite busca de imagens no Google
  openGoogle(gameTitle: string) {
    window.open(`https://www.google.com/search?q=${gameTitle}+cover`);
    return false;
  }

  // Salva novo documento no banco de dados
  newSend() {

    this.http.post(this.apiURL + `games`, this.newForm.value).subscribe(
      (data: any) => {

        // Feedback
        this.feedback(this.newForm.controls.title.value);
      }
    );

  }

  // Popup de feedback
  async feedback(title: string) {

    const alert = await this.alert.create({
      header: `Oba!`,
      message: `O jogo foi cadastrado com sucesso.`,
      buttons: [

        // Botão [Ok]
        {
          text: 'Ok',
          handler: () => {

            // Reset do formulário
            this.newForm.reset();

            // Retorna para a home
            this.router.navigate(['/home/title/asc']);
          }
        }
      ]
    });

    await alert.present();
  }
}
