import { Course } from './course.model';

export interface CoursePlan {
  id?: string;
  owner: string;
  title: string;
  courses: Course[];
}
