import { AuthProvider } from './../auth/auth';
import { Config } from 'ionic-angular';
import { HttpClient} from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/fromPromise';
import { catchError, tap, retry } from 'rxjs/operators';

/*
  Generated class for the ServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ServiceProvider {

  public static METHOD_POST: string = "post";
  public static METHOD_GET: string = "get";
  public static METHOD_DELETE: string = "delete";
  public static METHOD_PUT: string = "put";

  constructor(private _http: HttpClient, private _config: Config) {}

  public request(_method: string, _uri: string, _data?: any): Observable<any>
  {
    
    let _token = this._config.get(AuthProvider.ACCESS_TOKEN_KEY);
    let _url = `${this._config.get('web-api')}${_uri}`;
    let _options = {
        method: _method,
        headers: new HttpHeaders(
          {
            'Content-Type': 'application/json',            
            'Authorization': `Bearer ${_token}`
          }
        ),
        body: _data
     };
    

    return this._http.request<any>(_method, _url, _options)
     .pipe(
        retry(2),
        catchError(this.handleError(_uri, []))
     )
  }

  public requestNotLogged(_method: string, _uri: string, _data?: any): Observable<any> {
    
    let _url = `${this._config.get('web-api')}${_uri}`;
    let _options = {
      method: _method,
      headers:  new HttpHeaders(
        {
          'Content-Type': 'application/json'
        }
      ),
      body: _data
    };


    return this._http.request<any>(_method, _url, _options)
      .pipe(
        retry(2),
        catchError(this.handleError(_uri, []))
      )
  }

  private handleError<T>(operation = 'operation', result?: any) {
    return (error: any): Observable<T> => {      
      return Observable.create(observer => {
        observer.error(error);
        observer.complete();
      });
    };
  }


}
