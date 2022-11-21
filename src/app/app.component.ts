import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'valde-material';
  allSelected = false;
  someSelected = false;

  checkboxes: any[] = [
    {
      title: 'Primary',
      color: 'primary',
      key: 'primary',
      disabled: false,
      selected: false,
      emphasis: false,
    },
    {
      title: 'Accent',
      color: 'accent',
      key: 'accent',
      disabled: false,
      selected: true,
      emphasis: false,
    },
    {
      title: 'Warn',
      color: 'warn',
      key: 'warn',
      disabled: false,
      selected: true,
      emphasis: false,
    },
    {
      title: 'Bold',
      color: 'primary',
      key: 'emphasis',
      disabled: false,
      selected: false,
      emphasis: true,
    },
  ];

  ngOnInit(): void {
    this.allSelected = !this.checkboxes.some(item => item.selected === false);
    this.someSelected = !this.allSelected && this.checkboxes.some(item => item.selected === true);
  }

  onChangeValue(checkboxKey: string, value: boolean): void {
    console.warn(`${checkboxKey} - ${value}`);
  }

  onChangeValue2(checkboxKey: string, value: boolean): void {
    const itemChanged = this.checkboxes.find(item => item.key === checkboxKey);
    if (itemChanged) {
      itemChanged.selected = value;
    }
    this.allSelected = !this.checkboxes.some(item => item.selected === false);
    this.someSelected = !this.allSelected && this.checkboxes.some(item => item.selected === true);
  }

  toggleAll(): void {
    this.checkboxes = [...this.checkboxes.map(item => item.selected = !this.allSelected)];
    this.allSelected = !this.checkboxes.some(item => item.selected === false);
    this.someSelected = !this.allSelected && this.checkboxes.some(item => item.selected === true);
  }
}
