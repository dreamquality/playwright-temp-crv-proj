import { expect, Locator, Page, test } from '@playwright/test';
import fs from 'fs';
import { ComponentProps, LocatorProps } from '../types/page-factory/component';
import { capitalizeFirstLetter } from '../utils/generic';
import { locatorTemplateFormat } from '../utils/page-factory';

export abstract class Component {
  page: Page;
  locator: string;
  private name: string | undefined;

  constructor({ page, locator, name }: ComponentProps) {
    this.page = page;
    this.locator = locator;
    this.name = name;
  }

  getLocator(props: LocatorProps = {}): Locator {
    const { locator, ...context } = props;
    const withTemplate = locatorTemplateFormat(locator || this.locator, context);

    return this.page.locator(withTemplate);
  }

  get typeOf(): string {
    return 'component';
  }

  get typeOfUpper(): string {
    return capitalizeFirstLetter(this.typeOf);
  }

  get componentName(): string {
    if (!this.name) {
      throw Error('Provide "name" property to use "componentName"');
    }

    return this.name;
  }

  private getErrorMessage(action: string): string {
    return `The ${this.typeOf} with name "${this.componentName}" and locator ${this.locator} ${action}`;
  }

  async shouldBeVisible(locatorProps: LocatorProps = {}): Promise<void> {
    await test.step(`${this.typeOfUpper} "${this.componentName}" should be visible on the page`, async () => {
      const locator = this.getLocator(locatorProps);
      await expect(locator, { message: this.getErrorMessage('is not visible') }).toBeVisible();
    });
  }

  async shouldNotBeVisible(locatorProps: LocatorProps = {}): Promise<void> {
    await test.step(`${this.typeOfUpper} "${this.componentName}" should not be visible on the page`, async () => {
      const locator = this.getLocator(locatorProps);
      await expect(locator, { message: this.getErrorMessage('is visible') }).not.toBeVisible();
    });
  }

  async isVisible(locatorProps: LocatorProps = {}): Promise<boolean> {
    return await test.step(`${this.typeOfUpper} "${this.componentName}" is visible on the page`, async () => {
      const locator = this.getLocator(locatorProps);
      try {
        await expect(locator).toBeVisible({ timeout: 5000 });
        return true;
      } catch {
        return false;
      }
    });
  }  

  async isEnabled(locatorProps: LocatorProps = {}): Promise<boolean> {
    return await test.step(`${this.typeOfUpper} "${this.componentName}" is enabled`, async () => {
      const locator = this.getLocator(locatorProps);
      try {
        await expect(locator).toBeEnabled({ timeout: 5000 });
        return true;
      } catch {
        return false;
      }
    });
  }
  

  async getLocatorCount(locatorProps: LocatorProps = {}): Promise<number> {
    return await test.step(`${this.typeOfUpper} "${this.componentName}" locator count`, async () => {
      const locator = this.getLocator(locatorProps);
  
      // Добавляем ожидание загрузки элементов
      await this.page.waitForTimeout(3000); // Ожидание 5 секунды для загрузки
  
      // Логирование для проверки локатора
      console.log(`Проверка локатора: ${locator.toString()}`);
  
      // Подсчет количества элементов
      const count = await locator.count();
      console.log(`Количество найденных элементов: ${count}`);
  
      return count;
    });
  }
  
  

  async shouldHaveText(text: string, locatorProps: LocatorProps = {}): Promise<void> {
    await test.step(`${this.typeOfUpper} "${this.componentName}" should have text "${text}"`, async () => {
      const locator = this.getLocator(locatorProps);
      await expect(locator, { message: this.getErrorMessage(`does not have text "${text}"`) }).toContainText(text);
    });
  }

  async click(locatorProps: LocatorProps = {}): Promise<void> {
    await test.step(`Clicking the ${this.typeOf} with name "${this.componentName}"`, async () => {
      const locator = this.getLocator(locatorProps);
      await locator.click();
    });
  }

  // New method to check if the file exists
  async shouldExist(filePath: string): Promise<void> {
    await test.step(`Checking if file exists at: ${filePath}`, async () => {
      const fileExists = fs.existsSync(filePath);
      if (!fileExists) {
        throw new Error(`File not found at: ${filePath}`);
      }
      console.log(`File found at: ${filePath}`);
    });
  }

  async shouldBeClickable(locatorProps: LocatorProps = {}): Promise<void> {
    await test.step(`${this.typeOfUpper} "${this.componentName}" should be clickable`, async () => {
      const locator = this.getLocator(locatorProps);
      await expect(locator, { message: this.getErrorMessage('is not clickable') }).toBeVisible();
      await expect(locator, { message: this.getErrorMessage('is not clickable') }).not.toBeDisabled();
    });
  }

    async scrollToElement(locatorProps: LocatorProps = {}): Promise<void> {
      await test.step(`Scrolling to ${this.typeOf} with name "${this.componentName}"`, async () => {
        const locator = this.getLocator(locatorProps);
        await locator.scrollIntoViewIfNeeded(); // Прокрутка до элемента
      });
    }

    async shouldHaveAttribute(attribute: string, value: string, locatorProps: LocatorProps = {}): Promise<void> {
      await test.step(`${this.typeOfUpper} "${this.componentName}" should have attribute "${attribute}" with value "${value}"`, async () => {
        const locator = this.getLocator(locatorProps);
        await expect(locator, { message: this.getErrorMessage(`does not have attribute "${attribute}" with value "${value}"`) }).toHaveAttribute(attribute, value);
      });
    }
  
    async shouldBeDisabled(locatorProps: LocatorProps = {}): Promise<void> {
      await test.step(`${this.typeOfUpper} "${this.componentName}" should be disabled`, async () => {
        const locator = this.getLocator(locatorProps);
        await expect(locator, { message: this.getErrorMessage('is not disabled') }).toBeDisabled();
      });
    }

    async shouldBeEnabled(locatorProps: LocatorProps = {}): Promise<void> {
      await test.step(`${this.typeOfUpper} "${this.componentName}" should be enabled`, async () => {
        const locator = this.getLocator(locatorProps);
        await expect(locator, { message: this.getErrorMessage('is disabled') }).not.toBeDisabled();
      });
    }

    async pauseTest(): Promise<void> {
      await test.step(`Pausing the test for ${this.typeOf} with name "${this.componentName}"`, async () => {
        await this.page.pause();  // Останавливает выполнение теста и открывает DevTools
      });
    }



}
