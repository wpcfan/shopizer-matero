import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoresCreateComponent } from './create.component';

describe('StoresCreateComponent', () => {
  let component: StoresCreateComponent;
  let fixture: ComponentFixture<StoresCreateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ StoresCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoresCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
