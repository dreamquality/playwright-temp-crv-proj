import path from 'path';
import { expect } from '@playwright/test';
import { searchTest as test } from './tests';
import { initializeApiContext, fetchUserCredits } from '../utils/apiClient';
import {generateTempEmail, getVerifyAccountLink} from '../utils/mailsac'
import { saveCredentialsToFile, readCredentialsFromFile } from '../utils/jsonHelper';
const filePath = path.join(__dirname, '..', 'test-data', 'test-cv.docx');
let email: string = generateTempEmail();
let password: string = 'QxD2Aw7VeNdx72-';
let firstName: string = 'Alex';
let lastName: string = 'Flex';
let phone: string = '+380957676576';
let organization: string = 'Dream Ltd.';

test.beforeEach(async ({ cvReformatterHomePage }) => {
  await initializeApiContext();
  await cvReformatterHomePage.visit('https://cvreformatter.com');
});

test('As a new user signup for Trial', async ({ cvReformatterHomePage, cvReformatterUploadPage, validationPage }) => {

  await cvReformatterHomePage.navbar.visitSignUp();
  await cvReformatterHomePage.navbar.selectPlanModal.modalIsOpened()
  await cvReformatterHomePage.navbar.selectPlanModal.clickOnFreeTrialPlan()
  await cvReformatterHomePage.navbar.signUpModal.modalIsOpened()
  await cvReformatterHomePage.navbar.signUpModal.fillAllInputsAndContinue({
    firstName,
    lastName,
    email,
    phone,
    organization
  })
  await cvReformatterHomePage.navbar.checkoutModal.modalIsOpened()
  await cvReformatterHomePage.navbar.checkoutModal.agreeWithTerms()
  await cvReformatterHomePage.navbar.checkoutModal.clickOnCompleteSignUpButton()

  const verificationLink =  await getVerifyAccountLink(email)

  await cvReformatterHomePage.visit(verificationLink)
  await cvReformatterHomePage.navbar.setPasswordModal.modalIsOpened();
  await cvReformatterHomePage.navbar.setPasswordModal.setPassword({password:password});
  await cvReformatterUploadPage.pageIsOpened(firstName)

// *


    // const remainingCredits = await fetchUserCredits(email, password);
    // expect(remainingCredits).not.toBeNull();
    // expect(remainingCredits).toBeGreaterThan(8);
  // await cvReformatterUploadPage.openProfileModal(firstName);
  // await cvReformatterUploadPage.navbar.profileModal.inviteNewTeamMember("qweqew@qwe.qwe","qwe","eqwe");
  // await cvReformatterUploadPage.clickOnSelectAndValidate("");
  // await validationPage.clickOnAllValidateCheckboxes();


// *
  saveCredentialsToFile(email, password, firstName, lastName, phone, organization);

});
