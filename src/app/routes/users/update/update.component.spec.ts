import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersUpdateComponent } from './update.component';

describe('UsersUpdateComponent', () => {
  let component: UsersUpdateComponent;
  let fixture: ComponentFixture<UsersUpdateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
