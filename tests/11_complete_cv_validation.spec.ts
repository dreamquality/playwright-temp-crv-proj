import { searchTest as test } from './tests';
import path from 'path';
import creds from '../test-data/credentials.json';
const filePath = path.join(__dirname, '..', 'test-data', 'test-cv.docx'); // change in future
const firstName = creds[creds.length - 1].firstName;
const storageFilePath = path.resolve(__dirname, '..', 'storageState.json');


test.use({ storageState: storageFilePath });

test.beforeEach(async ({ cvReformatterHomePage }) => {
  await cvReformatterHomePage.visit('https://app.cvreformatter.com/tour/');
});

test('Complete full CV validation', async ({ cvReformatterUploadPage, validationPage }) => {
  await cvReformatterUploadPage.clickOnSelectAndValidate("25.0%");
  await validationPage.clickOnAllValidateCheckboxes();

});
