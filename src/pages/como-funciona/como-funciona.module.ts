import { ComponentsModule } from './../../components/components.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ComoFuncionaPage } from './como-funciona';

@NgModule({
  declarations: [
    ComoFuncionaPage,
  ],
  imports: [
    IonicPageModule.forChild(ComoFuncionaPage),
    ComponentsModule
  ],
})
export class ComoFuncionaPageModule {}
