export class User {
  email: string;
  coursePlanIds: number[] = [];

  constructor(email: string, coursePlanIds: number[]) {
    this.email = email;
    this.coursePlanIds = coursePlanIds;
  }
}
