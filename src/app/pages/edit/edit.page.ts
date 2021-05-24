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
  public editForm: FormGroup;
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
    public form: FormBuilder
  ) {

    // Obtém o ID do documento da rota
    this.id = this.activatedRoute.snapshot.paramMap.get('id');

    // Cria os campos do formulário
    this.editFormCreate();

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

  ngOnInit() {

    // Obtem o documento da API
    this.http.get(this.apiURL + `games/${this.id}`)
      .subscribe(
        (res: any) => {

          // Preenche os campos do formulário com os dados do documento
          this.editForm.controls.id.setValue(res.id);
          this.editForm.controls.title.setValue(res.title);
          this.editForm.controls.cover.setValue(res.cover);
          this.editForm.controls.date.setValue(res.date);
          this.editForm.controls.typesId.setValue(res.typesId);
          this.editForm.controls.platformsId.setValue(res.platformsId);
          this.editForm.controls.description.setValue(res.description);
          this.editForm.controls.mediasId.setValue(res.mediasId);
          this.editForm.controls.status.setValue(res.status);
          this.editForm.controls.uid.setValue(res.uid);
        },
        (error) => {

          // Retorna para a lista de games
          this.router.navigate(['/home/title/asc']);
        });
  }

  // Cria os campos do formulário
  editFormCreate() {

    this.editForm = this.form.group({

      // Id do documento (id)
      id: [''],

      // Data de envio (date)
      date: [''],

      // Status do contato (status)
      status: [''],

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
      uid: ['']
    });
  };

  // Permite busca de imagens no Google
  openGoogle(gameTitle: string) {
    window.open(`https://www.google.com/search?q=${gameTitle}+cover`);
    return false;
  }

  // Salva alterações no banco de dados
  editSend() {

    this.http.put(this.apiURL + `games/${this.id}`, this.editForm.value).subscribe(
      (data: any) => {

        // Reset do formulário
        this.editForm.reset({});

        // Feedback
        this.feedback(this.editForm.controls.title.value);
      }
    );

  }

  // Popup de feedback
  async feedback(title: string) {

    const alert = await this.alert.create({
      header: `Oba!`,
      message: `O jogo foi atualizado com sucesso.`,
      buttons: [

        // Botão [Ok]
        {
          text: 'Ok',
          handler: () => {

            // Reset do formulário
            this.editForm.reset();

            // Retorna para a home
            this.router.navigate(['/home/title/asc']);

          }
        }
      ]
    });

    await alert.present();
  }

}
