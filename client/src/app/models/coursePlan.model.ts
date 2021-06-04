import { Course } from './course.model';

export interface CoursePlan {
  id: number;
  owner: string;
  title: string;
  courses: Course[];
}
