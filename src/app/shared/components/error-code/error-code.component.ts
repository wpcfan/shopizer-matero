import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'error-code',
  templateUrl: './error-code.component.html',
  styleUrls: ['./error-code.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorCodeComponent {
  @Input() code = '';
  @Input() title = '';
  @Input() message = '';
}
