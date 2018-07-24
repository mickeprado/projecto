export class AppUserProfileModel {
    AppUserId : number
    CognitoId: string
    FirstName: string
    LastName : string
    Alias: string
    BirthDate: Date
    Email: string
    Picture : string
    SkillLevelId: number
    FamilyGroupId : number
    Created : Date
    LastUpdateDate : Date
    LastLogin : Date   
    Roles : AppUserRoleModel[] 
    GroupOwner : number
    UserName : string
  }

  export class AppUserRoleModel {
    AppUsersByRoleId : number
    AppUserId : number
    RoleId : number    
    Created : Date
    
  }