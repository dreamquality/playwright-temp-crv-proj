import { test as base } from '@playwright/test';
import { ContextPagesFixture, contextPagesFixture } from '../fixtures/context-pages';
import { PagesFixture, pagesFixture } from '../fixtures/pages-fixture';
import { combineFixtures } from '../utils/fixtures';

export const searchTest = base.extend<ContextPagesFixture, PagesFixture>(
  combineFixtures(contextPagesFixture, pagesFixture)
);
