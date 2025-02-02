import { searchTest as test } from './tests';
import path from 'path';
// import {  readCredentialsFromFile } from '../utils/jsonHelper';
import creds from './../test-data/credentials.json';
const filePath = path.join(__dirname, '..', 'test-data', 'test-cv.docx'); // change in future
const email = creds[creds.length - 1].email;
const password = creds[creds.length - 1].password;
const firstName = creds[creds.length - 1].firstName;


test.beforeEach(async ({ cvReformatterHomePage }) => {
  await cvReformatterHomePage.visit('https://cvreformatter.com');
});

test('Testing login on the cvreformatter page', async ({ cvReformatterHomePage, cvReformatterUploadPage }) => {
  await cvReformatterHomePage.navbar.visitLogin();
  await cvReformatterHomePage.navbar.loginModal.login({email:email, password:password});
  await cvReformatterUploadPage.pageIsOpened(firstName)
  await cvReformatterUploadPage.saveState()
});
