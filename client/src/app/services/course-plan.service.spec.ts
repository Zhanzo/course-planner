import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { CoursePlanService } from './course-plan.service';

describe('CoursePlanService', () => {
  let service: CoursePlanService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
    });
    service = TestBed.inject(CoursePlanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
