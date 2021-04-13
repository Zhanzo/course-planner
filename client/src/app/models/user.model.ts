import {CoursePlan} from './coursePlan.model';

export class User {
  email = '';
  token = '';
  isLoggedIn = false;
  coursePlans: Array<CoursePlan> = [new CoursePlan('Fall semester'), new CoursePlan('Spring semester')];

  constructor(email: string, token: string) {
    this.email = email;
    this.token = token;
  }

  getCoursePlan(name: string): CoursePlan | null {
    for (const coursePlan of this.coursePlans) {
      if (coursePlan.name === name) {
        return coursePlan;
      }
    }

    return null;
  }
}
