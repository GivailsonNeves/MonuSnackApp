import { NgModule } from '@angular/core';
import { SnackItemComponent } from './snack-item/snack-item';
import { SaldoComponent } from './saldo/saldo';
@NgModule({
	declarations: [SnackItemComponent,
    SaldoComponent],
	imports: [],
	exports: [SnackItemComponent,
    SaldoComponent]
})
export class ComponentsModule {}
