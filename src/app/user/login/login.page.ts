import { Component, OnInit } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import firebase from 'firebase/app';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    public auth: AngularFireAuth,
    public alert: AlertController,
    private router: Router
  ) { }

  ngOnInit() { }

  login() {
    this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(
        (data) => {

          // Feedback
          this.feedback(data.user);
        }
      )
      .catch(
        (error) => {
          console.error('Falha de login no Firebase: ' + error);
        }
      );
  }

  // Popup de feedback
  async feedback(user: any) {

    const alert = await this.alert.create({
      header: `Olá ${user.displayName}!`,
      message: 'Você já pode gereniciar sua coleção de games.',
      buttons: [

        // Botão [Ok]
        {
          text: 'Ok',
          handler: () => {

            // Redireciona para   'inicio'
            this.router.navigate(['/home/title/asc']);
          }
        }
      ]
    });

    await alert.present();
  }

}
