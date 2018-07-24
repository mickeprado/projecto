export class AWSConstants {
  public static _AWS_REGION = 'us-east-1';
  public static _AWS_API_VERSION = '';
  public static _AWS_IDENTITY_POOL_ID = 'us-east-1:4d335717-e0f2-4a65-96a6-3c6a08d66502';
  public static _AWS_USERPOOL_ID = 'us-east-1_xkLauPpn9';
  public static _AWS_CLIENT_ID = '5rut4r0nlsdddf08028rlmvdfh';
  public static _AWS_FED_POOL_ID = 'us-east-1:4d335717-e0f2-4a65-96a6-3c6a08d66502';
  public static _AWS_CUSTOMDOMAIN = 'sklskt';
  public static _AWS_SIGNIN_ID = 'madskill-signin';
  public static _AWS_SIGNUP_ID = 'madskill-signup';
  public static _AWS_VALIDATE_CODE_ID = 'madskill-confirmUnauthenticatedUser';
}

export class SessionConstants {
  public static _USER = 'AWS_AUTH_USER';
  public static _SIGNUPSTATE = 'SIGNUP_STATE';
  public static _TOKEN = 'USER_TOKEN';
}

export enum DateTimeFormats {
  ShortDate,
  MediumDate,
  FullDate,
  ShortDateTime,
  MediumDateTime,
  FullDateTime,
  Time
}
