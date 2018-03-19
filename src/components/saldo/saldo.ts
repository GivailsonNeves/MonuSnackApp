import { MenuController, Events } from 'ionic-angular';
import { Component } from '@angular/core';

/**
 * Generated class for the SaldoComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'saldo',
  templateUrl: 'saldo.html'
})
export class SaldoComponent {  

  public saldo: number = 0;

  constructor(private _menuCtrl: MenuController,
  _events: Events) {
    _events.subscribe("ATUALIZAR_SALDO", data => this._atualizarSaldo(data));
  }

  abrirHistorico():void
  {
    this._menuCtrl.open('right');
  }
  private _atualizarSaldo(_data: any)
  {
    this.saldo = _data.saldo;
  }

}
