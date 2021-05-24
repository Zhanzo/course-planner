import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursePlanDetailsComponent } from './course-plan-details.component';

describe('CoursePlanDetailsComponent', () => {
  let component: CoursePlanDetailsComponent;
  let fixture: ComponentFixture<CoursePlanDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CoursePlanDetailsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursePlanDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /*
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  */
});
