import { TestBed } from '@angular/core/testing';

import { CoursePlanService } from './course-plan.service';

describe('CoursePlanService', () => {
  let service: CoursePlanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoursePlanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
