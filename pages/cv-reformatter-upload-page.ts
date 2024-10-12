import { Page } from '@playwright/test';
import { Title } from '../page-factory/title';
import { capitalizeFirstLetter } from '../utils/generic';
import { BasePage } from './base-page';
import { Input } from '../page-factory/input';
import { P } from '../page-factory/p';
import { Button } from '../page-factory/button';


export class CvReformatterUploadPage extends BasePage {
  private readonly howWorksTitle: Title;
  private readonly hideInstructionsInput: Input;
  private readonly uploadInput: Input;
  private readonly selectAndValidate: Button;
  private readonly cvUntilDeletedP: P;

  constructor(public page: Page) {
    super(page);

    this.howWorksTitle = new Title({ page, locator: "//p[text()='How CV Reformatter works.']", name: 'How works' });
    this.hideInstructionsInput = new Input({ page, locator: "//p[text()='Hide these instructions']/preceding-sibling::input", name: 'Hide the instructions' });
    this.uploadInput = new Input({ page, locator: "[name=upload]", name: 'Upload' });
    this.selectAndValidate = new Button({ page, locator: "(//div[text()='Select to validate'])[1]/..", name: 'Select and validate' });
    this.cvUntilDeletedP = new P({ page, locator: "//p[text()='CVs stay in the system until deleted.']", name: 'CV until deleted' });
  }

  async pageIsOpened(): Promise<void> {
    await this.howWorksTitle.shouldBeVisible();
  
  }

  async uploadCV(filePath): Promise<void> {
    await this.uploadInput.uploadFile(filePath);
  
  }

  async goToSelectAndValidate(): Promise<void> {
    await this.selectAndValidate.click();
  }
}
