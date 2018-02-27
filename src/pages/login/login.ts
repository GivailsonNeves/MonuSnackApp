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
    private _modalCtrl: ModalController,
    private _formBuilder: FormBuilder) {

    this._prepareForm();
  }

  private _prepareForm():void
  {
    this.formLogin = this._formBuilder.group(
      {
        login: ['afdsf', Validators.required],
        senha: ['', Validators.required]        
      }
    );
  }

  login()
  {    
    /** Todo -> login de usuário */
    this._navCtrl.setRoot(VitrinePage.name, { nome: 'zé'}, 
      { animation: "ios-transition", direction: "forward"}
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
