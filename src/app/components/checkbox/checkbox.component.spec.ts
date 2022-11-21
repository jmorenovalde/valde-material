import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCheckboxChange, MatCheckboxModule } from '@angular/material/checkbox';
import { By } from '@angular/platform-browser';
import { jest } from '@jest/globals';

import { CheckboxComponent } from './checkbox.component';

describe('CheckboxComponent', () => {
  let component: CheckboxComponent;
  let fixture: ComponentFixture<CheckboxComponent>;
  let el: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckboxComponent ],
      imports: [MatCheckboxModule],
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckboxComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    fixture.detectChanges();
  });

  describe('WHEN the checkbox does not have color parameter', () => {
    it('THEN the style of the checkbox should be `primary`', () => {
      const checkbox = el.query(By.css('.mat-checkbox.mat-primary'));
      expect(checkbox).toBeTruthy();
    });
  });

  describe('WHEN color parameter is `accent`', () => {
    beforeEach(() => {
      component.color = 'accent';
      fixture.detectChanges();
    });

    it('THEN the style of the checkbox should be `accent`', () => {
      const checkbox = el.query(By.css('.mat-checkbox.mat-accent'));
      expect(checkbox).toBeTruthy();
    });
  });

  describe('WHEN color parameter is `warn`', () => {
    beforeEach(() => {
      component.color = 'warn';
      fixture.detectChanges();
    });

    it('THEN the style of the checkbox should be `warn`.', () => {
      const checkbox = el.query(By.css('.mat-checkbox.mat-warn'));
      expect(checkbox).toBeTruthy();
    });
  });

  describe('WHEN disabled parameter is `true`', () => {
    beforeEach(() => {
      component.disabled = true;
      fixture.detectChanges();
    });

    it('THEN the checkbox should be `disabled`', () => {
      const checkbox = el.query(By.css('.mat-checkbox.mat-checkbox-disabled'));
      expect(checkbox).toBeTruthy();
    });
  });

  describe('WHEN value is true', () => {
    beforeEach(() => {
      component.value = true;
      fixture.detectChanges();
    });

    it('THEN the style of the checkbox should be `selected`', () => {
      const checkbox = el.query(By.css('.mat-checkbox.mat-checkbox-checked'));
      expect(checkbox).toBeTruthy();
    });
  });

  describe('When `emphasis` is true', () => {
    beforeEach(() => {
      component.emphasis = true;
      component.title = 'test'
      fixture.detectChanges();
    });

    it('Then `title` should have `emphasis` style', () => {
      const label = el.query(By.css('.checkbox__label.emphasis'));
      expect(label).toBeTruthy();
    });
  });

  describe('WHEN `title` has value', () => {
    describe('AND value is empty', () => {
      beforeEach(() => {
        component.title = '';
        fixture.detectChanges();
      });

      it('THEN no text should be shown', () => {
        const label = el.query(By.css('.checkbox__label'));
        expect(label).toBeTruthy();
        expect((label.nativeElement as HTMLElement).textContent?.trim()).toBe('');
      })
    });

    describe('AND value is not empty', () => {
      beforeEach(() => {
        component.title = 'test';
        fixture.detectChanges();
      });

      it('THEN text should be shown', () => {
        const label = el.query(By.css('.checkbox__label'));
        expect(label).toBeTruthy();
        expect((label.nativeElement as HTMLElement).textContent?.trim()).toBe('test');
      })
    });
  });

  describe('WHEN `dataTestId` has value', () => {
    beforeEach(() => {
      component.dataTestId = 'test-element';
      fixture.detectChanges();
    });

    it('THEN attribute `data-testid` should be present at the view', () => {
      const checkbox = el.query(By.css('[data-testid="test-element"]'));
      expect(checkbox).toBeTruthy();
    })
  });

  describe('WHEN change the value', () => {
    beforeEach(() => {
      component.dataTestId = 'test-element';
      fixture.detectChanges();
    });

    it('THEN component should emit the `valueChanged` output', async () => {
      const spyValueChanged = jest.spyOn(component.valueChanged, 'emit');
        const checkbox = el.query(By.css('[data-testid="test-element"]'));
        expect(checkbox).toBeTruthy();
        const event: MatCheckboxChange = {
          source: checkbox.nativeElement,
          checked: true,
        };
        await checkbox.triggerEventHandler('change', event);
        fixture.detectChanges();

        expect(spyValueChanged).toHaveBeenCalled();
    });

    describe('AND the `readonly` parameter is `true`', () => {
      beforeEach(() => {
        component.readonly = true;
        fixture.detectChanges();
      });

      it('THEN component should not emit the `valueChanged` output', () => {
        const spyValueChanged = jest.spyOn(component.valueChanged, 'emit');
        const checkbox = el.query(By.css('[data-testid="test-element"]'));
        expect(checkbox).toBeTruthy();
        const event = {
          source: checkbox.nativeElement,
          checked: true,
        };
        checkbox.triggerEventHandler('change', event);
        expect(spyValueChanged).not.toHaveBeenCalled();
      });
    });

    describe('AND the `disabled` parameter is `true`', () => {
      beforeEach(() => {
        component.disabled = true;
        fixture.detectChanges();
      });

      it('THEN component should not emit the `valueChanged` output', () => {
        const spyValueChanged = jest.spyOn(component.valueChanged, 'emit');
        const checkbox = el.query(By.css('[data-testid="test-element"]'));
        expect(checkbox).toBeTruthy();
        const event = {
          source: checkbox.nativeElement,
          checked: true,
        };
        checkbox.triggerEventHandler('change', event);
        expect(spyValueChanged).not.toHaveBeenCalled();
      });
    });
  });
});
