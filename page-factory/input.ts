import test, { expect } from '@playwright/test';
import { LocatorProps } from '../types/page-factory/component';
import { Component } from './component';
import path from 'path';


type FillProps = { validateValue?: boolean } & LocatorProps;

export class Input extends Component {
  get typeOf(): string {
    return 'input';
  }

  async fill(value: string, fillProps: FillProps = {}) {
    const { validateValue, ...locatorProps } = fillProps;

    await test.step(`Fill ${this.typeOf} "${this.componentName}" to value "${value}"`, async () => {
      const locator = this.getLocator(locatorProps);
      await locator.fill(value);

      if (validateValue) {
        await this.shouldHaveValue(value, locatorProps);
      }
    });
  }

  async uploadFile(filePath: string, locatorProps: LocatorProps = {}, validateValue: boolean = false) {
    await test.step(`Upload file to ${this.typeOf} "${this.componentName}" from "${filePath}"`, async () => {
      const locator = this.getLocator(locatorProps);
      const absolutePath = path.resolve(filePath); // Преобразуем путь к файлу в абсолютный

      await locator.setInputFiles(absolutePath);

      if (validateValue) {
        // Обычно в поле загрузки файла отображается имя файла
        await this.shouldHaveValue(path.basename(absolutePath), locatorProps);
      }
    });
  }

  async shouldHaveValue(value: string, locatorProps: LocatorProps = {}) {
    await test.step(`Checking that ${this.typeOf} "${this.componentName}" has a value "${value}"`, async () => {
      const locator = this.getLocator(locatorProps);
      await expect(locator).toHaveValue(value);
    });
  }
}
