import { AuthProvider } from './../../providers/auth/auth';
import { Auth } from './../../models/auth';
import { HttpClient } from '@angular/common/http';
import { VitrinePage } from './../vitrine/vitrine';
import { RecuperarSenhaPage } from './../recuperar-senha/recuperar-senha';
import { Component } from '@angular/core';
import { IonicPage, NavController, ModalController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  private formLogin: FormGroup;

  constructor(private _navCtrl: NavController, 
    private _auth: AuthProvider,
    private _modalCtrl: ModalController,
    private _http: HttpClient,
    private _formBuilder: FormBuilder) {

    this._prepareForm();
  }

  private _prepareForm():void
  {
    this.formLogin = this._formBuilder.group(
      {
        username: ['gneves@monumenta.com.br', [Validators.required, Validators.email]],
        password: ['123456', Validators.required]        
      }
    );
  }

  login()
  { 
    this._auth.login(this.formLogin.value)    
      .subscribe(
        res => {                    
          this._navCtrl.setRoot(VitrinePage.name, { nome: 'zé'}, 
             { animation: "ios-transition", direction: "forward"}
          );
        },
        error => console.log(error)
      );
  }

  recovery()
  {
    this._modalCtrl
      .create(RecuperarSenhaPage.name, {}, 
          { showBackdrop: false, cssClass: 'modalTransparent' })
        .present();
  }

}
