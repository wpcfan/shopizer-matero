import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileOverviewComponent } from './overview.component';

describe('ProfileOverviewComponent', () => {
  let component: ProfileOverviewComponent;
  let fixture: ComponentFixture<ProfileOverviewComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
