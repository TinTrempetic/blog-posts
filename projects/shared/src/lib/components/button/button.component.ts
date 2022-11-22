import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  @Input() label = '';
  @Input() type = 'button';
  @Input() buttonClass = 'btn btn-primary';

  @Output() onClick = new EventEmitter<void>();

  buttonClickHandler(): void {
    this.onClick.emit();
  }
}
