import { BooleanAttributeValue } from "aws-sdk/clients/clouddirectory";

export class UserSigninModel {
  username: string;
  password: string;
  alias: string;
  appUserId: number;
  picture: string;
  familyGroupCode: string;
  familyGroupId: number;
  isfamilygroup: boolean;
  accessToken: string;
  idToken: string;
  firstName : string;
  lastName : string;
  isCoach : boolean;
  isPlayer : boolean;
  isParent : boolean;
  isGroupOwner : boolean;
  isOwner : boolean;
}
