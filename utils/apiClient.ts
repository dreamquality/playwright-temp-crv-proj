import { request, APIRequestContext } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

const OUTSETA_API_URL = 'https://cvreformatter.outseta.com/api/v1';
const CVR_API_URL = 'https://api.cvreformatter.com/graphql';

let apiContext: APIRequestContext;

export async function initializeApiContext() {
  apiContext = await request.newContext();
}

export async function fetchUserCredits(email: string, password: string): Promise<number | null> {
  try {
    // Step 1: Authenticate

    const formData = new URLSearchParams();
    formData.append('username', process.env.OUTSETA_ADMIN_USERNAME || email);
    formData.append('password', process.env.OUTSETA_ADMIN_PASSWORD || password);

    const authResponse = await apiContext.post(`${OUTSETA_API_URL}/tokens`, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: formData.toString(),
    });

    if (!authResponse.ok()) {
      throw new Error(`Error authenticating with Outseta: ${authResponse.statusText()}`);
    }

    const { access_token } = await authResponse.json();

    // Step 2: Get User Info
    const userQuery = `
      query user {
        user {
          id
        }
      }
    `;

    const userResponse = await apiContext.post(CVR_API_URL, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${access_token}`,
      },
      data: { query: userQuery },
    });

    if (!userResponse.ok()) {
      throw new Error(`Error fetching user information: ${userResponse.statusText()}`);
    }

    const userId = (await userResponse.json()).data.user.id;

    // Step 3: Get User Profile with Credits
    const profileQuery = `
      query userStats($userId: ID!) {
        userStats(userId: $userId) {
          remainingCredits
        }
      }
    `;

    const profileResponse = await apiContext.post(CVR_API_URL, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${access_token}`,
      },
      data: {
        query: profileQuery,
        variables: { userId },
      },
    });

    if (!profileResponse.ok()) {
      throw new Error(`Error fetching user profile: ${profileResponse.statusText()}`);
    }

    const remainingCredits = (await profileResponse.json()).data.userStats.remainingCredits;
    return remainingCredits;

  } catch (error) {
    console.error('Error fetching user credits:', error);
    return null;
  }
}
