import test from '@playwright/test';
import { LocatorProps } from '../types/page-factory/component';
import { Component } from './component';

export class Checkbox extends Component {
  get typeOf(): string {
    return 'checkbox';
  }

  async hover(locatorProps: LocatorProps = {}): Promise<void> {
    await test.step(`Hovering the ${this.typeOf} with name "${this.componentName}"`, async () => {
      const locator = this.getLocator(locatorProps);
      await locator.hover();
    });
  }
 
}
