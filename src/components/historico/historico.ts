import { Component, ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';

@Component({
  selector: 'historico',
  templateUrl: 'historico.html'
})
export class HistoricoComponent {

  public mes: string = "1";
  @ViewChild('sldHistorico') sldsHistorico: Slides;

  constructor() {}

  public trocaAba(): void {    
    this.sldsHistorico.slideTo(parseInt(this.mes), 500);
    //this.slides.slideTo(this.mes);
  }

}
