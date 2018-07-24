export class SignUpProfileModel {
  cognitoId: string
  firstName: string
  lastName : string
  alias: string
  birthDate: Date
  email: string
  skillLevelId: number
}

export class SkillLevelItem {
  skillLevelId: number
  name: string
}
