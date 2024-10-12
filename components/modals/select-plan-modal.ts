import { Page } from '@playwright/test';
import { ListItem } from '../../page-factory/list-item';
import { Title } from '../../page-factory/title';

export class SelectPlanModal {
  private readonly modalTitle: Title;
  private readonly freeTrialItem: ListItem;
  private readonly tenPlanItem: ListItem;
  private readonly fiftyPlanItem: ListItem;

  constructor(public page: Page) {
    this.modalTitle = new Title({ page, locator: "div.o--selectPlan > div:first-child > h1", name: 'Select Plan' });
    this.freeTrialItem = new ListItem({ page, locator: "[class='o--PlanSelector--planListItem planUid--j9bnok9n']", name: 'Free Trial' });
    this.tenPlanItem = new ListItem({ page, locator: "[class='o--PlanSelector--planListItem planUid--wQX86aQK']", name: '10 CV Reformats' });
    this.fiftyPlanItem = new ListItem({ page, locator: "[class='o--PlanSelector--planListItem planUid--yWoybXQD']", name: '50 CV Reformats' });
  }

  async modalIsOpened(): Promise<void> {
    await this.modalTitle.shouldBeVisible();
    await this.modalTitle.shouldHaveText('Select Plan');
    await this.freeTrialItem.shouldBeVisible();
    await this.tenPlanItem.shouldBeVisible();
    await this.fiftyPlanItem.shouldBeVisible();
  }

  async clickOnFreeTrialPlan(): Promise<void>  {
    await this.freeTrialItem.click()
  }
}
