import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoresUpdateComponent } from './update.component';

describe('StoresUpdateComponent', () => {
  let component: StoresUpdateComponent;
  let fixture: ComponentFixture<StoresUpdateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ StoresUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoresUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
