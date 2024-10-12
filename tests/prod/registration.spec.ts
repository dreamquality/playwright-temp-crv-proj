import { searchTest as test } from './../tests';
import {generateTempEmail, getVerifyAccountLink} from './../../utils/mailsac'

test.beforeEach(async ({ cvReformatterHomePage }) => {
  await cvReformatterHomePage.visit('/');
});

test('As a new user signup for Trial', async ({ cvReformatterHomePage, cvReformatterUploadPage }) => {
  const email = generateTempEmail()

  await cvReformatterHomePage.navbar.visitSignUp();
  await cvReformatterHomePage.navbar.selectPlanModal.modalIsOpened()
  await cvReformatterHomePage.navbar.selectPlanModal.clickOnFreeTrialPlan()
  await cvReformatterHomePage.navbar.signUpModal.modalIsOpened()
  await cvReformatterHomePage.navbar.signUpModal.fillAllInputsAndContinue({firstName:"alex",lastName:"bobyr",email: email ,phone:"+380957675376",organization:"Dream co"})
  await cvReformatterHomePage.navbar.checkoutModal.modalIsOpened()
  await cvReformatterHomePage.navbar.checkoutModal.agreeWithTerms()
  await cvReformatterHomePage.navbar.checkoutModal.clickOnCompleteSignUpButton()

  const verificationLink =  await getVerifyAccountLink(email)

  await cvReformatterHomePage.visit(verificationLink)
  await cvReformatterHomePage.navbar.setPasswordModal.modalIsOpened();
  await cvReformatterHomePage.navbar.setPasswordModal.setPassword({password:"QxD2Aw7VeNdx72-"});
  await cvReformatterUploadPage.pageIsOpened()
});
