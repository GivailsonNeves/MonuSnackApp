import { ComprarPage } from './../comprar/comprar';
import { Categoria } from './../../models/categoria';
import { Snack } from './../../models/snack';
import { Component } from '@angular/core';
import { IonicPage, LoadingController, Refresher, ModalController, Modal, AlertController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

@IonicPage()
@Component({
  selector: 'page-vitrine',
  templateUrl: 'vitrine.html',
})
export class VitrinePage {

  public snacks: Snack[];
  public categorias: Categoria[];
  public filterSelect: string = 'Todos';

  constructor(private _loaderCtrl: LoadingController,
    private _http: HttpClient,
    private _allertCtrl: AlertController,
    private _modalCtrl: ModalController
  ) {}

  ionViewDidLoad() {
    this._loadVitrine();
  }

  private _loadVitrine(_refresher?: Refresher): void
  {
    let _loader = this._loaderCtrl.create({ content: 'carregando produtos' });
    _loader.present();
    this._http.get<any>('http://localhost:8101/mock/categorias.json')
      .mergeMap(res => { 
        this.categorias = res.data;        
        return this._http.get<any>('http://localhost:8101/mock/listagem.json');
      })    
      .finally(() =>{
        _loader.dismiss(); 
        if (_refresher) 
          _refresher.complete();
       })
      .subscribe( 
        res => this.snacks = res.data,
        error => console.log(error)        
       );
  }

  public filtrar():void
  {
    let alert = this._allertCtrl.create();
    alert.setTitle("Selecione a categoria");
    
    alert.addInput({
      type: 'radio',
      label: 'Todos',
      value: 'Todos',
      checked: this.filterSelect == 'Todos'
    })
    for( let i = 0; i < this.categorias.length; i++)
    {
      let c = this.categorias[i];
      alert.addInput({
        type: 'radio',
        label: c.nome,
        value: c.nome,
        checked: this.filterSelect == c.nome
      });
    }
    alert.addButton('cancelar');
    alert.addButton({
      text: 'selecionar',
      handler: (data: any) => {
        this.filterSelect = data;        
      }
    });
    alert.present();
    
  }

  public doRefresh(_refresher: Refresher): void {
    this._loadVitrine(_refresher);
  }

  public mostrarHistorico():void{
    alert('xii')
  }

  public modalComprar(_snack: Snack):void{
    
    let _modal: Modal = this._modalCtrl.create(ComprarPage.name, 
        { 'snack': _snack}, 
        { showBackdrop: false, cssClass: 'modalTransparent' });
    _modal.onDidDismiss( data => {
      console.log(data);
    });
    _modal.present();
  }

}
