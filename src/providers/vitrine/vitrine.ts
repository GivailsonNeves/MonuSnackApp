import { Categoria } from './../../models/categoria';
import { Observable } from 'rxjs/Observable';
import { ServiceProvider } from './../service/service';
import { Injectable } from '@angular/core';
import { Snack } from '../../models/snack';

/*
  Generated class for the VitrineProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class VitrineProvider {

  constructor(private _service: ServiceProvider) {}

  public listarProdutos(): Observable<Snack[]> {

    return this._service.request(ServiceProvider.METHOD_GET, 'api/produto/listar')
      .map((res: any) => {        
        return <Snack[]> res.data;
      });

  }

  public buscarProduto(code:string):Observable<Snack>
  {
    return this._service.request(ServiceProvider.METHOD_GET, 'api/produto');
  }

  public listarCategorias(): Observable<Categoria[]> {

    return this._service.request(ServiceProvider.METHOD_GET, 'api/produto/categorias')
      .map((res: any) => {
        return <Categoria[]>res.data;
      });

  }

}
