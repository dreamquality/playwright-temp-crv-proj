import { searchTest as test } from './tests';
import path from 'path';
import creds from '../test-data/credentials.json';
import {generateTempEmail, getVerifyAccountLink} from '../utils/mailsac'
import { saveCredentialsToFile, readCredentialsFromFile } from '../utils/jsonHelper';
const filePath = path.join(__dirname, '..', 'test-data', 'test-cv.docx'); // change in future
const storageFilePath = path.resolve(__dirname, '..', 'storageState.json');

let email: string = generateTempEmail();
let password: string = 'QxD2Aw7VeNdx72-';
let firstName: string = 'John';
let lastName: string = 'Week';
let phone: string = '+380953333333';

test.use({ storageState: storageFilePath });

test.beforeEach(async ({ cvReformatterHomePage }) => {
  await cvReformatterHomePage.visit('https://app.cvreformatter.com/tour/');
});

test('Validate visibility of CVs within organization', async ({ cvReformatterUploadPage, cvReformatterHomePage,  validationPage }) => {
  await cvReformatterUploadPage.openProfileModal("Alex");
  await cvReformatterUploadPage.navbar.profileModal.inviteNewTeamMember(email, firstName, lastName);


  const verificationLink =  await getVerifyAccountLink(email)

  await cvReformatterHomePage.visit(verificationLink)
  await cvReformatterHomePage.navbar.setPasswordModal.modalIsOpened();
  await cvReformatterHomePage.navbar.setPasswordModal.setPassword({password:password});
  await cvReformatterUploadPage.pageIsOpened(firstName)
  await cvReformatterUploadPage.checkVisibilityInOrganization()
});
