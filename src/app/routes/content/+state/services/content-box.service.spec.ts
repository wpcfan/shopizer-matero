import { TestBed } from '@angular/core/testing';

import { ContentBoxService } from './content-box.service';

describe('ContentBoxService', () => {
  let service: ContentBoxService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContentBoxService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
