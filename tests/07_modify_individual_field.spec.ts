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

test('Modify text field', async ({ cvReformatterUploadPage, validationPage }) => {
  await cvReformatterUploadPage.clickOnSelectAndValidate("14.0%");
  await validationPage.isValidationPagePresent();
  await validationPage.fillAndValidateFirstNameField("14.0%");

});
