import { IonicModule } from 'ionic-angular';
import { NgModule } from '@angular/core';
import { SnackItemComponent } from './snack-item/snack-item';
import { SaldoComponent } from './saldo/saldo';
import { HistoricoComponent } from './historico/historico';
import { CommonModule } from '@angular/common';
@NgModule({    
	declarations: [SnackItemComponent,
    SaldoComponent,
    HistoricoComponent],
	imports: [
        IonicModule,
        CommonModule,
    ],
	exports: [SnackItemComponent,
    SaldoComponent, HistoricoComponent]
})
export class ComponentsModule {}
