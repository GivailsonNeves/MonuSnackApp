import { Snack } from './../../models/snack';
import { Component, Input } from '@angular/core';

/**
 * Generated class for the SnackItemComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'snack-item',
  templateUrl: 'snack-item.html'
})
export class SnackItemComponent {

  @Input() public snack: Snack;
  constructor() {}

}
