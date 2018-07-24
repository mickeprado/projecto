class SessionClass {
  constructor() {
      this.user = {
        username:'devtest',
        alias:'Mr T',
        appUserId:'N0923',
        firstName:'Developer',
        lastName : 'Test'        
      };
      this.accessToken='LKDDFJ0UOASKFL233KJ3-4324L32OI5U4KLSDK';
      this.idToken='LKDDFJ0UOASKFL233KJ3-4324L32OI5U4KLSDK';

  }

  isValid(){
    if(this.idToken && this.accessToken) return true;
    return false;
  }
}

export default new SessionClass();