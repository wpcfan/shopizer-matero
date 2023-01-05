import { TestBed } from '@angular/core/testing';

import { ContentImageService } from './content-image.service';

describe('ContentImageService', () => {
  let service: ContentImageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContentImageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
