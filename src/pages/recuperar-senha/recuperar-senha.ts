import { Component } from '@angular/core';
import { IonicPage, ViewController } from 'ionic-angular';

/**
 * Generated class for the RecuperarSenhaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-recuperar-senha',
  templateUrl: 'recuperar-senha.html',
})
export class RecuperarSenhaPage {

  constructor(private _viewCtrl:ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RecuperarSenhaPage');
  }

  public close():void
  {
    this._viewCtrl.dismiss();
  }

}
