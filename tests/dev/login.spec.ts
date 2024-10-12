import { searchTest as test } from './../tests';
import path from 'path';
const filePath = path.join(__dirname, '../..', 'test-data', 'test-cv.docx'); // change in future

test.beforeEach(async ({ cvReformatterHomePage }) => {
  await cvReformatterHomePage.visit('/');
});

test.skip('Testing login on the cvreformatter page', async ({ cvReformatterHomePage, cvReformatterUploadPage, validationPage }) => {
  await cvReformatterHomePage.navbar.visitLogin();
  await cvReformatterHomePage.navbar.loginModal.login({email:"alexxldubwork@gmail.com", password:"Qwerty1997228!"});

  await cvReformatterUploadPage.uploadCV(filePath);
  await cvReformatterUploadPage.goToSelectAndValidate();
  await validationPage.isValidationPagePresent();
});
