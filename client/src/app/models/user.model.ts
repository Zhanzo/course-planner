export class User {
  email?: string;
  token?: string;
  isLoggedIn?: boolean;

  // coursePlans: Array<CoursePlan> = [new CoursePlan('Fall semester'), new CoursePlan('Spring semester')];

  constructor(email: string, token: string, isLoggedIn: boolean) {
    this.email = email;
    this.token = token;
    this.isLoggedIn = isLoggedIn;
  }

  /*
  getCoursePlan(name: string): CoursePlan | null {
    for (const coursePlan of this.coursePlans) {
      if (coursePlan.name === name) {
        return coursePlan;
      }
    }

    return null;
  }
   */
}
