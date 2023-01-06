import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentUpdatePageComponent } from './update-page.component';

describe('UpdatePageComponent', () => {
  let component: ContentUpdatePageComponent;
  let fixture: ComponentFixture<ContentUpdatePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContentUpdatePageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ContentUpdatePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
