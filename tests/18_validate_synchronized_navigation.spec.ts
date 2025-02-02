import { searchTest as test } from './tests';
import path from 'path';
const storageFilePath = path.resolve(__dirname, '..', 'storageState.json');


test.use({ storageState: storageFilePath });

test.beforeEach(async ({ cvReformatterHomePage }) => {
  await cvReformatterHomePage.visit('https://app.cvreformatter.com/tour/');
});

test('Validate synchronized navigation between three sections', async ({ cvReformatterUploadPage, cvReformatterHomePage,  validationPage }) => {
  await cvReformatterUploadPage.pageIsOpened("Alex")
  await cvReformatterUploadPage.checkSynchronizedNavigation()
});
