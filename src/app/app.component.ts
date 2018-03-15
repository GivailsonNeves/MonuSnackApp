import { AuthProvider } from './../providers/auth/auth';
import { VitrinePage } from './../pages/vitrine/vitrine';
import { LoginPage } from './../pages/login/login';
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import 'rxjs/add/operator/finally';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage.name;

  /** Definição do array utilizado para a composição do site menu */
  pages: Array<{title: string, component: any, icon: string}>;

  private reverseAnimate: boolean = false;

  constructor(public platform: Platform, 
    private _auth: AuthProvider,
    public statusBar: StatusBar, 
    private _menuCtrl: MenuController,
    public splashScreen: SplashScreen) {
    this.initializeApp();
    
    /** Lista de páginas, tal qual um sistema de rotas */
    this.pages = [
      { title: 'Saldo e extrato', component: VitrinePage.name, icon: 'monueda_amarela.png' },
      { title: 'Vitrine', component: VitrinePage.name, icon: 'vitrine.png' },
      { title: 'Como funciona', component: VitrinePage.name, icon: 'duvida.png' },
      { title: 'O dia da serveja', component: VitrinePage.name, icon: 'cerveja.png' },
    ];

  }

  public statusMenu(_status: boolean)
  {
    console.log(_status);
  }

  initializeApp() {
    this.platform.ready().then(() => {      
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

  public logout()
  {
    this._auth.logOut();
    this.closeMenu();
    this.nav.setRoot(LoginPage.name);
  }

  public openPage(page) {    
    this.nav.setRoot(page.component);
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
}
