import { Snack } from './../../models/snack';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the ComprarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-comprar',
  templateUrl: 'comprar.html',
})
export class ComprarPage {

  public snack: Snack;

  constructor(
    private _viewCtrl: ViewController,
    private _navCtrl: NavController, 
    _navParams: NavParams) {
      this.snack = _navParams.get('snack');
  }

  public close():void{
    this._viewCtrl.dismiss();
  }

  ionViewDidLoad() {
    console.log(this.snack);
  }

}
