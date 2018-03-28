import { DiaDaCervejaPage } from './../pages/dia-da-cerveja/dia-da-cerveja';
import { AuthProvider } from './../providers/auth/auth';
import { VitrinePage } from './../pages/vitrine/vitrine';
import { LoginPage } from './../pages/login/login';
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, Slides, MenuController, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import 'rxjs/add/operator/finally';
import { ComoFuncionaPage } from '../pages/como-funciona/como-funciona';
import { Push, PushObject, PushOptions } from '@ionic-native/push';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage.name;

  /** Definição do array utilizado para a composição do site menu */
  pages: Array<{title: string, component: any, icon: string}>;

  private reverseAnimate: boolean = false;
  public saldo: number = 0;  

  constructor(public platform: Platform, 
    private push: Push,
    _events: Events,
    private _auth: AuthProvider,
    public statusBar: StatusBar,     
    private _menuCtrl: MenuController,
    public splashScreen: SplashScreen) {
    this.initializeApp();
    
    _events.subscribe("ATUALIZAR_SALDO", data => this._atualizarSaldo(data));
    /** Lista de páginas, tal qual um sistema de rotas */
    this.pages = [
      { title: 'Saldo e extrato', component: 'SaldoExtrato', icon: 'monueda_amarela.png' },
      { title: 'Vitrine', component: VitrinePage.name, icon: 'vitrine.png' },
      { title: 'Como funciona', component: ComoFuncionaPage.name, icon: 'duvida.png' },
      { title: 'O dia da serveja', component: DiaDaCervejaPage.name, icon: 'cerveja.png' },
    ];

  }

  public statusMenu(_status: boolean)
  {
    console.log(_status);
  }

  initializeApp() {
    this.platform.ready().then(() => {      
      this._iniciarPush();
      this._auth.checkLogged()
        .finally(() => {
          this.statusBar.styleDefault();
          this.splashScreen.hide();
        })
        .subscribe( logged => {
          if (logged){
            this.nav.setRoot(VitrinePage.name);
          }else{
            this.nav.setRoot(LoginPage.name);
          }
        });
    });
    
  }

  private _iniciarPush():void
  {
    const options: PushOptions = {
      android: {        
        senderID: '785091263013',
        topics: ['all']
      },
      ios: {        
        alert: 'true',
        badge: true,
        sound: 'false',
        topics: ['all']
      }
    };

    const pushObject: PushObject = this.push.init(options);


    pushObject.on('notification').subscribe((notification: any) => console.log('Received a notification', notification));

    pushObject.on('registration').subscribe((registration: any) => console.log('Device registered', registration));

    pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));
  }
  public logout()
  {
    this._auth.logOut();
    this.closeMenu();
    this.nav.setRoot(LoginPage.name);
  }

  public openPage(page) {    
    if (page.component == "SaldoExtrato"){
      this._menuCtrl.open('right');
    }else{
      this.nav.setRoot(page.component);
    }
    this.closeMenu();
  }

  public closeHistorico():void{
    this._menuCtrl.close('right');    
  }

  public closeMenu(): void
  {
    this.reverseAnimate = true;
    this._menuCtrl.close('left');
    setTimeout(() => {      
      this.reverseAnimate = false;
    }, 250);
  }

  private _atualizarSaldo(_data: any):void
  {
    this.saldo = _data.saldo;
  }
}
