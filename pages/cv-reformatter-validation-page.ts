import { Page } from '@playwright/test';
import { Title } from '../page-factory/title';
import { capitalizeFirstLetter } from '../utils/generic';
import { BasePage } from './base-page';
import { Input } from '../page-factory/input';
import { P } from '../page-factory/p';
import { Button } from '../page-factory/button';


export class ValidationPage extends BasePage {
  private readonly navigationLegendP: P;

  constructor(public page: Page) {
    super(page);

    this.navigationLegendP = new P({ page, locator: "//p[text()='CV Navigation Legend']", name: 'Navigation legend' });
  }

  async isValidationPagePresent(): Promise<void> {
    await this.navigationLegendP.shouldBeVisible();
  }

}
