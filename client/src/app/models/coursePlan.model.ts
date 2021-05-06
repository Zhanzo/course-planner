import { Course } from './course.model';

export class CoursePlan {
  id?: number;
  owner: string;
  title: string;
  courses: Course[];

  constructor(owner: string, title: string, courses: Course[]) {
    this.owner = owner;
    this.title = title;
    this.courses = courses;
  }
}
