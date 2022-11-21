import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent {
  @Input() title = '';
  @Input() value = false;
  @Input() disabled = false;
  @Input() indeterminate = false;
  @Input() color: 'primary' | 'accent' | 'warn' = 'primary';
  @Input() emphasis = false;
  @Input() readonly = false;
  @Input() dataTestId!: string;

  @Output() valueChanged = new EventEmitter<boolean>();

  onChange(value: MatCheckboxChange): void {
    if (this.disabled || this.readonly) {
      value.source.checked = this.value;
      return;
    }
    this.valueChanged.emit(value.checked);
  }
}
