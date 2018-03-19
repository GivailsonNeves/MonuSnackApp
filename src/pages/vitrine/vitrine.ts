import { AuthProvider } from './../../providers/auth/auth';
import { VitrineProvider } from './../../providers/vitrine/vitrine';
import { ComprarPage } from './../comprar/comprar';
import { Categoria } from './../../models/categoria';
import { Snack } from './../../models/snack';
import { Component } from '@angular/core';
import { IonicPage, LoadingController, Refresher, ModalController, Modal, AlertController, Config, MenuController } from 'ionic-angular';
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
    private _vitrineProvider: VitrineProvider,
    private _menuCtrl: MenuController,
    private _http: HttpClient,
    private _config: Config,
    private _allertCtrl: AlertController,
    private _modalCtrl: ModalController
  ) {}

  ionViewDidLoad() {
    if(this._config.get(AuthProvider.ACCESS_TOKEN_KEY)){
      this._loadVitrine();
    }
  }

  private _loadVitrine(_refresher?: Refresher): void
  {
    let _loader = this._loaderCtrl.create({ content: 'carregando produtos' });
    _loader.present();   

    this._vitrineProvider.listarCategorias()
      .mergeMap( (categorias : Categoria[]) => {
        this.categorias = categorias;
        return this._vitrineProvider.listarProdutos();
      }) 
      .finally(() =>{
        _loader.dismiss(); 
        if (_refresher) 
          _refresher.complete();
       })
      .subscribe( 
        (_snacks: Snack[]) => this.snacks = _snacks,
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
        label: c.Nome,
        value: c.Nome,
        checked: this.filterSelect == c.Nome
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
