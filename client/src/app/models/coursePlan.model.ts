export class CoursePlan {
  name = '';
  courses: Array<string> = [];

  constructor(name: string) {
    this.name = name;
  }

  addCourse(course: string): void {
    this.courses.push(course);
  }
}
