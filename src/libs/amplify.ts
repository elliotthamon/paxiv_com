import { Amplify, Auth } from 'aws-amplify';
import { config } from 'process';
import { v4 as uuidv4 } from 'uuid';
import { Hub, Logger } from 'aws-amplify';

// const logger = new Logger('My-Logger');



const CONFIG = {
  aws_cognito_region: process.env.NEXT_PUBLIC_REGION || 'us-east-2',
  aws_user_pools_id: process.env.NEXT_PUBLIC_USERPOOL_ID,
  aws_user_pools_web_client_id: process.env.NEXT_PUBLIC_CLIENT_ID,
  aws_mandatory_sign_in: 'enable'
};

/*
    const appDomain = window.location.hostname; // === 'localhost' ? 'localhost' : window.location.hostname.substr(4);
    Amplify.configure({
      aws_project_region: appConfig.amplifyRegion,
      aws_cognito_identity_pool_id: appConfig.amplifyIdentityPoolId,
      aws_cognito_region: appConfig.amplifyRegion,
      aws_user_pools_id: appConfig.amplifyUserPoolId,
      aws_user_pools_web_client_id: appConfig.amplifyWebClientId,
      Auth: {
        identityPoolId: appConfig.amplifyIdentityPoolId,
        region: appConfig.amplifyRegion,
        identityPoolRegion: appConfig.amplifyRegion,
        userPoolId: appConfig.amplifyUserPoolId,
        userPoolWebClientId: appConfig.amplifyWebClientId,
        cookieStorage: {
          domain: appDomain,
          path: '/',
          expires: 365,
          sameSite: 'lax',
          secure: appDomain !== 'localhost',
        },
        oauth: {
          domain: appConfig.amplifyOauthDomain,
          scope: ['email', 'profile', 'openid', 'aws.cognito.signin.user.admin'],
          redirectSignIn: `${appConfig.appUrl}/auth/login`,
          redirectSignOut: `${appConfig.appUrl}/auth/login`,
          responseType: 'token',
        },
      },
*/

const logger = {
  error: (msg: string) => console.log("ERROR: ", msg),
  info: (msg: string) => console.log("INFO: ", msg),
};


if (CONFIG.aws_user_pools_id) {
  try {
    Amplify.configure(CONFIG);
    getCurrentUser();  // prime for already logged in cases  
  } catch (e: any) {
    console.log(`Could not init amplify Cognito - ${e.message}`, CONFIG);
  };
}



const listener = (data: any) => {
  switch (data?.payload?.event) {
    case 'configured':
      logger.info('the Auth module is configured');
      break;
    case 'signIn':
      logger.info('user signed in');
      break;
    case 'signIn_failure':
      logger.error('user sign in failed');
      break;
    case 'signUp':
      logger.info('user signed up');
      break;
    case 'signUp_failure':
      logger.error('user sign up failed');
      break;
    case 'confirmSignUp':
      logger.info('user confirmation successful');
      break;
    case 'completeNewPassword_failure':
      logger.error('user did not complete new password flow');
      break;
    case 'autoSignIn':
      logger.info('auto sign in successful');
      break;
    case 'autoSignIn_failure':
      logger.error('auto sign in failed');
      break;
    case 'forgotPassword':
      logger.info('password recovery initiated');
      break;
    case 'forgotPassword_failure':
      logger.error('password recovery failed');
      break;
    case 'forgotPasswordSubmit':
      logger.info('password confirmation successful');
      break;
    case 'forgotPasswordSubmit_failure':
      logger.error('password confirmation failed');
      break;
    case 'verify':
      logger.info('TOTP token verification successful');
      break;
    case 'tokenRefresh':
      logger.info('token refresh succeeded');
      break;
    case 'tokenRefresh_failure':
      logger.error('token refresh failed');
      break;
    case 'cognitoHostedUI':
      logger.info('Cognito Hosted UI sign in successful');
      break;
    case 'cognitoHostedUI_failure':
      logger.error('Cognito Hosted UI sign in failed');
      break;
    case 'customOAuthState':
      logger.info('custom state returned from CognitoHosted UI');
      break;
    case 'customState_failure':
      logger.error('custom state failure');
      break;
    case 'parsingCallbackUrl':
      logger.info('Cognito Hosted UI OAuth url parsing initiated');
      break;
    case 'userDeleted':
      logger.info('user deletion successful');
      break;
    case 'updateUserAttributes':
      logger.info('user attributes update successful');
      break;
    case 'updateUserAttributes_failure':
      logger.info('user attributes update failed');
      break;
    case 'signOut':
      logger.info('user signed out');
      break;
    default:
      logger.info('unknown event type');
      break;
  }
};


export function registerAuthListener(listener: ((data: any)=>void), name:string = 'auth-listener'):(()=>void) {
  return Hub.listen('auth', listener, name);
}


export function mapError(err: any) {
  switch (err.constructor.name) {
    case 'LimitExceededException':
    default:
      return err.message;
  }
};

export async function getCurrentUser() {
  try {
    const user = await Auth.currentAuthenticatedUser();
    return user.attributes;
  } catch (e: any) { return null; }
}

export async function getSession() {
  return Auth.currentSession();
}

export async function signUp(email: string, password: string) {
  try {
    const { user } = await Auth.signUp({
      username: uuidv4(),
      password,
      attributes: {
        email, // optional
      },
      autoSignIn: {
        // optional - enables auto sign in after user is confirmed
        enabled: true,
      },
    });
  } catch (error) {
    console.log('error signing up:', error);
  }
}

export async function signUpWithEmail(email: string, password: string) {
  return signUp(email, password);
}

export async function verifyCode(email: string, code: string) {
  const username = email; // possibly need a lookup here?
  return await Auth.confirmSignUp(username, code);
}

enum LoginStatus {
  OK = 'OK',
  NEW_PASSWORD_REQUIRED = 'NEW_PASSWORD_REQUIRED',
  // FIRST_PASSWORD = 'FIAST_PASSWORD',
  SMS_MFA = 'SMS_MFA',
  SOFTWARE_TOKEN_MFA = 'SOFTWARE_TOKEN_MFA',
};

export async function signInWithEmail(email: string, password: string, code?: string): Promise<any> {
  const user = await Auth.signIn(email, password);
  if (
    user.challengeName === 'SMS_MFA' ||
    user.challengeName === 'SOFTWARE_TOKEN_MFA'
  ) {
    const mfaType = user.challengeName;
    if (code) {
      await Auth.confirmSignIn(user, code, mfaType);
    } else {
      return mfaType === 'SMS_MFA' ? LoginStatus.SMS_MFA : LoginStatus.SOFTWARE_TOKEN_MFA;
    }
  }
  else if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
    if (code) {
      await Auth.completeNewPassword(user, code);
    } else {
      return LoginStatus.NEW_PASSWORD_REQUIRED;
    }
  }
  return LoginStatus.OK;
}

export async function signOut() {
  return Auth.signOut();
}

export async function getAttributes() {
  try {
    const userInfo = await Auth.currentUserInfo();
    return userInfo.getAttributes();
  } catch (e: any) {
    // console.log('getAttributes(): ', e.message);
    return {};
  }
}

export async function sendCode(email: string) {
  return Auth.forgotPassword(email);
}

export async function forgotPassword(
  email: string,
  code: string,
  password: string
) {
  return Auth.forgotPasswordSubmit(email, code, password);
}

export async function setInitialPassword(email: string, oldPassword: string, newPassword: string): Promise<any> {
  try {
    const user = await Auth.signIn(email, oldPassword);
    return Auth.completeNewPassword(user, newPassword);
  } catch (e: any) {
    console.log(`setInitialPassword: `, e);
    return Promise.reject();
  }

}

export async function changePassword(oldPassword: string, newPassword: string): Promise<"SUCCESS"> {
  try {
    const user = await Auth.currentAuthenticatedUser();
    return Auth.changePassword(user, oldPassword, newPassword);
  } catch (e: any) {
    console.log(`changePassword: `, e);
    return Promise.reject();
  }
}

