import { ComponentsModule } from './../../components/components.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DiaDaCervejaPage } from './dia-da-cerveja';

@NgModule({
  declarations: [
    DiaDaCervejaPage,
  ],
  imports: [
    IonicPageModule.forChild(DiaDaCervejaPage),
    ComponentsModule
  ],
})
export class DiaDaCervejaPageModule {}
