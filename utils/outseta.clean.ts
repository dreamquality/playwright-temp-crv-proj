require('dotenv').config();
const axios = require('axios'); 

// Base URL and Authentication details for Outseta API
const OUTSETA_API_URL = 'https://cvreformatter.outseta.com/api/v1';
const AUTH = {
  apiKey: process.env.OUTSETA_API_KEY, // Ваш API-ключ Outsetа
  apiSecret: process.env.OUTSETA_API_SECRET // Ваш секрет Outsetа
};

// Helper constant to get headers with the token
const getHeaders = () => ({
  'Authorization': `Outseta ${AUTH.apiKey}:${AUTH.apiSecret}`,
  'Content-Type': 'application/json'
});

async function deleteAccountsByDomain(domain: string): Promise<void> {
  try {
    let page = 0;
    const limit = 5;
    let hasMoreAccounts = true;
    const allAccounts: any[] = [];

    while (hasMoreAccounts) {
      const response = await axios.get(`${OUTSETA_API_URL}/crm/accounts?fields=Uid,Name,PrimaryContact.Email,PrimaryContact.Uid&limit=${limit}&offset=${page}`, {
        headers: getHeaders()
      });

      const accounts = response.data;
      allAccounts.push(...accounts.items);

      page++;
      hasMoreAccounts = accounts.metadata.offset * limit < accounts.metadata.total;
    }

    const filteredAccounts = allAccounts.filter((account: any) =>
      account.PrimaryContact && account.PrimaryContact.Email && account.PrimaryContact.Email.endsWith(domain)
    );

    if (filteredAccounts.length === 0) {
      console.log(`No accounts found with email domain: ${domain}`);
    } else {
      for (const account of filteredAccounts) {
        try {
          await deleteAccount(account.Uid);
          console.log(`Deleted account with UID: ${account.Uid} and email: ${account.PrimaryContact.Email}`);

          if (account.PrimaryContact && account.PrimaryContact.Uid) {
            await deletePerson(account.PrimaryContact.Uid);
            console.log(`Deleted person with UID: ${account.PrimaryContact.Uid} and email: ${account.PrimaryContact.Email}`);
          }
        } catch (error) {
          console.error(`Error deleting account with UID ${account.Uid}:`, error);
        }
      }
    }
  } catch (error) {
    console.error('Error fetching accounts:', error);
  }
}

async function deletePersonsByDomain(domain: string): Promise<void> {
  try {
    let page = 0;
    const limit = 5;
    let hasMorePersons = true;
    const allPersons: any[] = [];

    while (hasMorePersons) {
      const response = await axios.get(`${OUTSETA_API_URL}/crm/people?fields=Uid,Email&limit=${limit}&offset=${page}`, {
        headers: getHeaders()
      });

      const persons = response.data;
      allPersons.push(...persons.items);

      page++;
      hasMorePersons = persons.metadata.offset * limit < persons.metadata.total;
    }

    const filteredPersons = allPersons.filter((person: any) =>
      person.Email && person.Email.endsWith(domain)
    );

    if (filteredPersons.length === 0) {
      console.log(`No persons found with email domain: ${domain}`);
    } else {
      for (const person of filteredPersons) {
        try {
          await deletePerson(person.Uid);
          console.log(`Deleted person with UID: ${person.Uid} and email: ${person.Email}`);
        } catch (error) {
          console.error(`Error deleting person with UID ${person.Uid}:`, error);
        }
      }
    }
  } catch (error) {
    console.error('Error fetching persons:', error);
  }
}

// Helper function to delete an account
async function deleteAccount(accountUid: string): Promise<void> {
  try {
    const response = await axios.delete(`${OUTSETA_API_URL}/crm/accounts/${accountUid}`, {
      headers: getHeaders()
    });

    if (response.status !== 204) {
      throw new Error(`Error deleting account with UID ${accountUid}`);
    }
  } catch (error) {
    console.error(`Error deleting account with UID ${accountUid}:`, error);
  }
}

// Helper function to delete a person
async function deletePerson(personUid: string): Promise<void> {
  try {
    const response = await axios.delete(`${OUTSETA_API_URL}/crm/people/${personUid}`, {
      headers: getHeaders()
    });

    if (response.status !== 204) {
      const errorResponse = response.data;
      logValidationErrors(errorResponse);
      throw new Error(`Error deleting person with UID ${personUid}`);
    }
  } catch (error) {
    console.error(`Error deleting person with UID ${personUid}:`, error);
  }
}

// Helper function to log validation errors
function logValidationErrors(errorResponse: any): void {
  if (errorResponse.ErrorMessage) {
    console.error(`Error: ${errorResponse.ErrorMessage}`);
  }
  if (errorResponse.EntityValidationErrors) {
    for (const validationError of errorResponse.EntityValidationErrors) {
      if (validationError.ValidationErrors) {
        for (const error of validationError.ValidationErrors) {
          console.error(`Validation Error: ${error.ErrorMessage}`);
        }
      }
    }
  }
}

(async () => {
  const domain = '@mailsac.com';
  await deleteAccountsByDomain(domain);
  await deletePersonsByDomain(domain);
  // Указываем, что выполнение завершено успешно
  process.exit(0);
})();
