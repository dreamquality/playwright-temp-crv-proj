import { expect, Locator, Page, test } from '@playwright/test';
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
