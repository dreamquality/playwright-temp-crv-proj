import { Page } from '@playwright/test';
import path from 'path';
import fs from 'fs';
import { Title } from '../page-factory/title';
import { capitalizeFirstLetter } from '../utils/generic';
import { BasePage } from './base-page';
import { Input } from '../page-factory/input';
import { P } from '../page-factory/p';
import { Button } from '../page-factory/button';
import { Div } from '../page-factory/div';


export class ValidationPage extends BasePage {
  private readonly navigationLegendP: P;
  private readonly savingChangesP: P;
  private readonly validationCompletedP: P;
  private readonly congratulationsP: P;
  private readonly congratulationsMessageP: P;
  private readonly formatCVButton: Button;
  private readonly cvValidatedButton: Button;
  private readonly generateCvFirstButton: Button;
  private readonly validateAllCheckbox: Button;
  private readonly validateAllCheckerCheckbox: Button;
  private readonly validateAllCheckerByIndexCheckbox: Button;
  private readonly validationProgressBarValueDiv: Div;
  private readonly validationProgressBarValuePreviewDiv: Div;

  //NON_VALIDATED or VALIDATED value
  private readonly candidateInformationFirstNameDiv: Div;
  private readonly candidateInformationFirstNameButton: Button;
  private readonly candidateInformationFirstNameInput: Input;
  private readonly candidateInformationLastNameDiv: Div;
  private readonly candidateInformationLastNameButton: Button;
  private readonly candidateInformationLastNameInput: Input;
  private readonly firstLanguageCompetencyInput: Input;
  private readonly firstLanguageCompetencyLevelInput: Input;
  private readonly objectiveInput: Input;
  private readonly objectiveButton: Button;
  private readonly selectValidatedCv: Button;

  constructor(public page: Page) {
    super(page);

    this.savingChangesP = new P({ page, locator: "(//p[text()='Saving Changes...' and not(contains(@class, 'hidden'))])[1]", name: 'Saving Changes' });
    this.navigationLegendP = new P({ page, locator: "//p[text()='CV Navigation Legend']", name: 'Navigation legend' });
    this.validationCompletedP = new P({ page, locator: "//p[text()='Validation Completed']", name: 'Validation Completed' });
    this.congratulationsP = new P({ page, locator: "//p[contains(text(), 'Congratulations')]", name: 'Congratulations' });
    this.congratulationsMessageP = new P({ page, locator: "//p[text()='You successfully validated profile, now you can format it']", name: 'Congratulations message' });
    this.formatCVButton = new Button({ page, locator: "//div[contains(text(), 'Format CV')]/..", name: 'Format CV' });
    this.selectValidatedCv = new Button({ page, locator: `//div[text()='${this.createValidatedString()}']`, name: `${this.createValidatedString()}` });
    this.cvValidatedButton = new Button({ page, locator: "//div[contains(text(), 'Validated')]/..", name: 'Validated' });
    this.generateCvFirstButton = new Button({ page, locator: "(//div[contains(text(), 'Generate CV using this Template')]/..)[1]", name: 'Generate CV using this Template' });
    this.validateAllCheckbox = new Button({ page, locator: "(//p[text()='Validate all']/following-sibling::div)[{index}]", name: 'Validate checkbox {index}' });
    this.validateAllCheckerCheckbox = new Button({ page, locator: "//p[text()='Validate all']/following-sibling::div/*[contains(@style, 'background: rgb(216, 233, 252);')]", name: 'Validate checkbox container' });
    this.validateAllCheckerByIndexCheckbox = new Button({ page, locator: "(//*[contains(@style, 'background: rgb(216, 233, 252);')])[{index}]", name: 'Validate checkbox container' });
    this.validationProgressBarValuePreviewDiv = new Div({ page, locator: "//p[text()='Validation']/following-sibling::div[1]//div[1]", name: 'Select to validate' });
    this.validationProgressBarValueDiv = new Div({ page, locator: "//p[text()='Validation']/following-sibling::div[1]//div[2]", name: 'Validation progress bar' });
    this.candidateInformationFirstNameDiv = new Div({ page, locator: "[data-validation='v.contactInformation.candidateName.firstName-{validationStatus}']", name: 'First name validation status' });
    this.candidateInformationFirstNameButton = new Button({ page, locator: "//*[@data-validation='v.contactInformation.candidateName.firstName-{validationStatus}']//button", name: 'First name validation status' });
    this.candidateInformationFirstNameInput = new Input({ page, locator: "//input[@id='v.contactInformation.candidateName.firstName']", name: 'First name' });
    this.candidateInformationLastNameDiv = new Div({ page, locator: "[data-validation='v.contactInformation.candidateName.lastName-{validationStatus}']", name: 'Last name validation status' });
    this.candidateInformationLastNameButton = new Button({ page, locator: "//*[@data-validation='v.contactInformation.candidateName.lastName-{validationStatus}']//button", name: 'Last name validation status' });
    this.candidateInformationLastNameInput = new Input({ page, locator: "//input[@id='v.contactInformation.candidateName.lastName']", name: 'Last name' });
    this.firstLanguageCompetencyInput = new Input({ page, locator: "[id='v.languageCompetencies.[0].language']", name: 'language Competency' });
    this.firstLanguageCompetencyLevelInput = new Input({ page, locator: "[id='v.languageCompetencies.[0].level']", name: 'language Competency level' });
    this.objectiveInput = new Input({ page, locator: "//*[@id='v.objective']//p", name: 'Objective' });
    this.objectiveButton = new Button({ page, locator: "//*[@id='v.objective']/following-sibling::button[1]", name: 'Objective' });
  }

  async isValidationPagePresent(): Promise<void> {
    await this.navigationLegendP.shouldBeVisible();
  }

  async validateFirstNameField(progressBarInitialValue: string, progressBarModifiedValue: string ): Promise<void> {
      // await this.validationProgressBarValuePreviewDiv.shouldHaveText(progressBarInitialValue);
      await this.candidateInformationFirstNameButton.click({validationStatus: "NON_VALIDATED"});
      await this.candidateInformationFirstNameButton.shouldBeVisible({validationStatus: "VALIDATED"});
      await this.candidateInformationFirstNameDiv.shouldBeVisible({validationStatus: "VALIDATED"});
      await this.savingChangesP.shouldBeVisible();
      // await this.validationProgressBarValueDiv.shouldHaveText(progressBarModifiedValue);
      // await this.candidateInformationFirstNameButton.click({validationStatus: "VALIDATED"});
  }

  async validateLastNameField(text: string): Promise<void> {
      await this.candidateInformationLastNameButton.click({validationStatus: "VALIDATED"});
      await this.candidateInformationLastNameDiv.shouldBeVisible({validationStatus: "NON_VALIDATED"});
      await this.candidateInformationLastNameInput.fill(text)
      await this.candidateInformationLastNameButton.click({validationStatus: "NON_VALIDATED"});
      await this.candidateInformationLastNameDiv.shouldBeVisible({validationStatus: "VALIDATED"});
      await this.savingChangesP.shouldBeVisible();
  }

  async fillAndValidateFirstNameField(rate: string): Promise<void> {
    await this.candidateInformationFirstNameButton.click({validationStatus: "VALIDATED"});
    await this.candidateInformationFirstNameInput.fill("TEST")
    await this.candidateInformationFirstNameButton.click({validationStatus: "NON_VALIDATED"});
      await this.candidateInformationFirstNameButton.shouldBeVisible({validationStatus: "VALIDATED"});
      await this.candidateInformationFirstNameDiv.shouldBeVisible({validationStatus: "VALIDATED"});
      await this.savingChangesP.shouldBeVisible();
      await this.validationProgressBarValueDiv.shouldHaveText(rate);
    }
    
    async clickOnTheFirstLanguageCompetencyAndFillIt(value: string): Promise<void> {
      await this.firstLanguageCompetencyLevelInput.click();
      await this.firstLanguageCompetencyLevelInput.fill(value);
      await this.firstLanguageCompetencyInput.click();
      await this.savingChangesP.shouldBeVisible();
  }
    
    async clickOnTheObjectiveTextareaAndFillIt(value: string): Promise<void> {
      await this.objectiveInput.click();
      await this.objectiveInput.fill(value);
      await this.objectiveButton.click();
      await this.savingChangesP.shouldBeVisible();
  }

  async clickOnTheFirstValidateCheckbox(): Promise<void> {
      await this.validateAllCheckbox.click({ index: 1 });
      await this.savingChangesP.shouldBeVisible();
  }
  
  async clickOnAllValidateCheckboxes(): Promise<void> {
    let initialTotalElements = await this.validateAllCheckerCheckbox.getLocatorCount();
    let isSelectButtonVisible = false;
  
    while (!isSelectButtonVisible) {
      for (let index = 0; index < initialTotalElements; index++) {
        console.log(`Clicking on element with index ${index + 1}`);
        await this.validateAllCheckbox.click({ index: `${index + 1}` });
  
        isSelectButtonVisible = await this.selectValidatedCv.isVisible();
        if (isSelectButtonVisible) {
          console.log('Button selectValidatedCv is visible. Stopping clicks.');
          break; 
        }
      }
  
      const currentTotalElements = await this.validateAllCheckerCheckbox.getLocatorCount();
      if (currentTotalElements !== initialTotalElements) {
        console.log(`Number of elements changed from ${initialTotalElements} to ${currentTotalElements}. Restarting iteration.`);
        initialTotalElements = currentTotalElements; 
      }
  
      if (!isSelectButtonVisible) {
        console.log('All elements were clicked, but selectValidatedCv is not visible. Restarting...');
      }
    }
  
    await this.selectValidatedCv.shouldBeVisible()
    await this.formatCVButton.shouldBeClickable();
    await this.validationCompletedP.shouldBeVisible();
    await this.congratulationsP.shouldBeVisible();
    await this.congratulationsMessageP.shouldBeVisible();
  }
  
  
  

  async saveState(): Promise<void> {
    const dirPath = path.resolve(__dirname, '..');
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
    await this.page.context().storageState({ path: path.resolve(__dirname, '..', 'storageState.json') });
    console.log(`Checking if storage state exists at: ${dirPath}`);
    console.log(`File exists: ${fs.existsSync(dirPath)}`);
  }

}
