import { Pipe, PipeTransform } from '@angular/core';
import { Course } from '../models/course.model';

@Pipe({
  name: 'coursefilter',
})
export class CourseFilterPipe implements PipeTransform {
  transform(courses: Course[], searchText: string): Course[] {
    if (!courses) {
      return [];
    }

    if (!searchText || searchText === '' ) {
      return courses;
    }

    searchText = searchText.toLowerCase();

    return courses.filter(
      (course) =>
        course.name.toLowerCase().includes(searchText) ||
        course.code.toLowerCase().includes(searchText)
    );
  }
}
