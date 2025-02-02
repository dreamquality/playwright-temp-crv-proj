import { Page } from '@playwright/test';
import path from 'path';
import fs from 'fs';
import { Title } from '../page-factory/title';
import { capitalizeFirstLetter } from '../utils/generic';
import { BasePage } from './base-page';
import { Input } from '../page-factory/input';
import { P } from '../page-factory/p';
import { Button } from '../page-factory/button';
import { Span } from '../page-factory/span';
import { Link } from '../page-factory/link';
import { Div } from '../page-factory/div';



export class CvReformatterFormatPage extends BasePage {
  private readonly howWorksTitle: Title;
  private readonly hideInstructionsInput: Input;

  private readonly selectValidatedCv: Button;
  private readonly generateCvByTemplate: Button;
  private readonly formatButton: Button;
  private readonly deleteCv: Button;
  private readonly deleteFirstCv: Button;
  private readonly approveDeletingCv: Button;
  private readonly refuseDeletingCv: Button;
  private readonly myValidatedCvButton: Button;
  private readonly allValidatedCvButton: Button;
  private readonly successMessageOfDeletingCv: Div;
  private readonly cvUntilDeletedP: P;

  private readonly firstNameProfileP: P;
  private readonly cvsImportedTotalAmountP: P;
  private readonly cvsValidatedTotalAmountP: P;
  private readonly cvsReformattedTotalAmountP: P;
  private readonly removalQuestionP: P;
  private readonly serviceTermsLink: Link;
  private readonly standardClausesLink: Link;
  private readonly dataProcessingAgreementLink: Link;
  private readonly subProcessorsLink: Link;
  private readonly gdrpComplianceLink: Link;
  private readonly usePersonalDataLink: Link;

  constructor(public page: Page) {
    super(page);

    this.howWorksTitle = new Title({ page, locator: "//p[text()='How CV Reformatter works.']", name: 'How works' });
    this.hideInstructionsInput = new Input({ page, locator: "//p[text()='Hide these instructions']/preceding-sibling::input", name: 'Hide the instructions' });
    this.selectValidatedCv = new Button({ page, locator: `//div[text()='${this.createValidatedString()}']`, name: `${this.createValidatedString()}` });
    this.formatButton = new Button({ page, locator: "//button[text()='Format']", name: "Format" });
    this.deleteCv = new Button({ page, locator: "(//div[text()='{value}'] | //div[text()='Select to validate'])[1]/../..//following-sibling::div[@class='w-fit']//following-sibling::div", name: 'Delete CV' });
    this.deleteFirstCv = new Button({ page, locator: "((//div[text()='{value}'] | //div[text()='Select to validate'])[1]/../..//following-sibling::div[@class='w-fit']//following-sibling::div)[1]", name: 'Delete first CV' });
    this.approveDeletingCv = new Button({ page, locator: "//div[text()='Delete']/..", name: 'Approve deleting CV' });
    this.refuseDeletingCv = new Button({ page, locator: "//div[text()='Cancel']/..", name: 'Refuse deleting CV' });
    this.myValidatedCvButton = new Button({ page, locator: "//button[text()='My Validated CVs']", name: 'My Validated CVs' });
    this.allValidatedCvButton = new Button({ page, locator: "//button[text()='All Validated CVs']", name: 'All Validated CVs' });
    this.generateCvByTemplate = new Button({ page, locator: "(//div[text()='Generate CV using this Template']/..)[{index}]", name: 'Generate CV using this Template' });
    this.successMessageOfDeletingCv = new Div({ page, locator: "//div[text()='Profile deleted successfully']", name: 'Profile deleted successfully' });
    this.cvUntilDeletedP = new P({ page, locator: "//p[text()='CVs stay in the system until deleted.']", name: 'CV until deleted' });
    this.firstNameProfileP = new P({ page, locator: "//p[text()='{firstName}']", name: 'First name' });
    this.cvsImportedTotalAmountP = new P({ page, locator: "//p[text()='Imported']/following-sibling::p[1]", name: 'Imported note' });
    this.cvsValidatedTotalAmountP = new P({ page, locator: "//p[text()='Validated']/following-sibling::p[1]", name: 'Validated note' });
    this.cvsReformattedTotalAmountP = new P({ page, locator: "//p[text()='Reformatted']/following-sibling::p[1]", name: 'Reformatted note' });
    this.removalQuestionP = new P({ page, locator: "//p[text()='Are you sure to delete this profile ?']", name: 'Reformatted note' });
    this.serviceTermsLink = new Link({ page, locator: "[href='https://www.cvreformatter.com/legal-cvr/service-terms']", name: 'Service terms' });
    this.standardClausesLink = new Link({ page, locator: "[href='https://www.cvreformatter.com/legal-cvr/standard-contract-clauses']", name: 'Standard clauses' });
    this.dataProcessingAgreementLink = new Link({ page, locator: "[href='https://www.cvreformatter.com/legal-cvr/data-processing-agreement']", name: 'Data processing agreement' });
    this.subProcessorsLink = new Link({ page, locator: "[href='https://www.cvreformatter.com/legal-cvr/subprocessors']", name: 'Subprocessors' });
    this.gdrpComplianceLink = new Link({ page, locator: "[href='https://www.cvreformatter.com/legal-cvr/gdrp-compliance-analysis']", name: 'GDRP Compliance' });
    this.usePersonalDataLink = new Link({ page, locator: "[href='https://www.cvreformatter.com/legal-cvr/use-of-personal-data']", name: 'Use of personal data' });
  }

  async pageIsOpened(firstName:string): Promise<void> {
    await this.howWorksTitle.shouldBeVisible();
    await this.firstNameProfileP.shouldBeVisible({firstName});
    await this.cvsImportedTotalAmountP.shouldBeVisible();
    await this.cvsValidatedTotalAmountP.shouldBeVisible();
    await this.cvsReformattedTotalAmountP.shouldBeVisible();
    await this.serviceTermsLink.shouldBeClickable();
    await this.standardClausesLink.shouldBeClickable();
    await this.dataProcessingAgreementLink.shouldBeClickable();
    await this.subProcessorsLink.shouldBeClickable();
    await this.gdrpComplianceLink.shouldBeClickable();
    await this.usePersonalDataLink.shouldBeClickable();
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

  async downloadAndVerifySpecificFile(): Promise<void> {

    const downloadPath = path.resolve(process.env.GITHUB_WORKSPACE || __dirname, 'downloads');
    if (!fs.existsSync(downloadPath)) {
      fs.mkdirSync(downloadPath, { recursive: true });
  }


    this.page.on('download', (download) => {
      console.log(`Download started: ${download.url()}`);
    });
    

    await this.generateCvByTemplate.click({index: "1"}) 

    await this.page.waitForTimeout(5000);
    // await this.generateCvByTemplate.shouldExist(filePath)


  }

}
