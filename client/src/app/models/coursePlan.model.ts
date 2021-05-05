export class CoursePlan {
  id?: number;
  owner?: string;
  title?: string;
  courses?: number[];

  constructor(
    owner: string,
    title: string,
    courses: number[]
  ) {
    this.owner = owner;
    this.title = title;
    this.courses = courses;
  }
}
