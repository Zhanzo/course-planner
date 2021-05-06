export class User {
  email: string;
  coursePlans: number[] = [];

  constructor(email: string, coursePlans: number[]) {
    this.email = email;
    this.coursePlans = coursePlans;
  }
}
