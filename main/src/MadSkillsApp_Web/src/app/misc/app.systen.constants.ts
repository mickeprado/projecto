export class AWSConstants {
  public static _AWS_REGION = 'us-east-1';
  public static _AWS_API_VERSION = '';
  public static _AWS_BUCKET_PICTURES = 'getmadskills-photos';
  public static _AWS_BUCKET_PICTURES_URL = 'https://getmadskills-photos.s3.amazonaws.com/';
  public static _AWS_IDENTITY_POOL_ID = 'us-east-1:4d335717-e0f2-4a65-96a6-3c6a08d66502';
  public static _AWS_USERPOOL_ID = 'us-east-1_xkLauPpn9';
  public static _AWS_CLIENT_ID = '5rut4r0nlsdddf08028rlmvdfh';
  public static _AWS_FED_POOL_ID = 'us-east-1:4d335717-e0f2-4a65-96a6-3c6a08d66502';
  public static _AWS_CUSTOMDOMAIN = 'sklskt';
  public static _AWS_SIGNIN_ID = 'madskill-signin';
  public static _AWS_SIGNUP_ID = 'madskill-signup';
  public static _AWS_VALIDATE_CODE_ID = 'madskill-signup-confirmUnauthenticatedUser';
  public static _AWS_RESEND_VALIDATE_CODE = 'madskill-signup-resendConfirmationCode';
  public static _AWS_DBMNG_SKILLLEVEL = 'madskill-dbMng-skillLevel';
  public static _AWS_DBMNG_APPUSER = 'madskill-dbMng-appuser';
  public static _AWS_DBMNG_FAMGROUP = 'madskill-dbMng-familyGroup';
  public static _AWS_SIGNUP_PROFILE = 'madskill-signup-createProfile';
  public static _AWS_SIGNUP_FAMILYMEMBER = 'madskill-signup-familyMember';  
  public static _AWS_UPDATE_PROFILE = 'madskill-user-updateProfile';
  public static _AWS_APPUSER_GETBYID = 'GET_BY_APPUSERID';
}

export class AppConstants {
  public static _APP_ROLE_COACH = 1;
  public static _APP_ROLE_PARENT = 2;
  public static _APP_ROLE_PLAYER = 3;  

  public static _APP_USR_TYPE_OWNER = 'Owner';
  public static _APP_USR_TYPE_FAM_MEMBER = 'FamilyMember';
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
