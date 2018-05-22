export interface Roles {
    reader: boolean;
    author?: boolean;
    admin?:  boolean;
  }

  export class User {
    uid: string;
    email:    string;
    displayName: string;
    photoURL?: string;
    roles?:    Roles;

    constructor(authData) {
      this.uid    = authData.uid
      this.email    = authData.email
      this.photoURL = authData.photoURL
    //   this.roles    = { reader: true }
    }
  }