import { Auth } from './../../models/auth';
import { ServiceProvider } from './../service/service';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/fromPromise';
import { Config } from 'ionic-angular';
/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {

  constructor(private _service: ServiceProvider, private _config:Config, private _storage: Storage) {}

  public static readonly ACCESS_TOKEN_KEY: string = "access_token";

  public login(_credentials:any):Observable<any>{

    return this._service.requestNotLogged(ServiceProvider.METHOD_POST,'api/login', _credentials)
      .map( (auth: Auth) => {
        this._config.set(AuthProvider.ACCESS_TOKEN_KEY, auth.access_token);
        this._storage.set(AuthProvider.ACCESS_TOKEN_KEY, auth.access_token);
      });

  }

  public logOut():void{
    this._config.set(AuthProvider.ACCESS_TOKEN_KEY, null);
    this._storage.remove(AuthProvider.ACCESS_TOKEN_KEY);
  }

  public checkLogged(): Observable<boolean>
  {
    return Observable.fromPromise(this._storage.get(AuthProvider.ACCESS_TOKEN_KEY) )
      .map( data => {
        if(data){
          this._config.set(AuthProvider.ACCESS_TOKEN_KEY, data);
          console.log( this._config.get(AuthProvider.ACCESS_TOKEN_KEY, data) ); 
          return true;
        }
        return false;
      })
  }
}
