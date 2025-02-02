import { Fixtures } from '@playwright/test';
import { CvReformatterHomePage } from '../pages/cv-reformatter-home-page';
import { CvReformatterUploadPage } from '../pages/cv-reformatter-upload-page';
import { ValidationPage } from '../pages/cv-reformatter-validation-page';
import { CvReformatterFormatPage } from '../pages/cv-reformatter-format-page';
import { ContextPagesFixture } from './context-pages';

export type PagesFixture = {
  cvReformatterHomePage: CvReformatterHomePage;
  cvReformatterUploadPage: CvReformatterUploadPage;
  cvReformatterFormatPage: CvReformatterFormatPage;
  validationPage: ValidationPage;
};

export const pagesFixture: Fixtures<PagesFixture, ContextPagesFixture> = {
  cvReformatterHomePage: async ({ contextPage }, use) => {
    const cvReformatterHomePage = new CvReformatterHomePage(contextPage);

    await use(cvReformatterHomePage);
  },
  cvReformatterUploadPage: async ({ contextPage }, use) => {
    const cvReformatterUploadPage = new CvReformatterUploadPage(contextPage);

    await use(cvReformatterUploadPage);
  },
  validationPage: async ({ contextPage }, use) => {
    const validationPage = new ValidationPage(contextPage);

    await use(validationPage);
  },
  cvReformatterFormatPage: async ({ contextPage }, use) => {
    const cvReformatterFormatPage = new CvReformatterFormatPage(contextPage);

    await use(cvReformatterFormatPage);
  }
};
