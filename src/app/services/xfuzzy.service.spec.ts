import { TestBed } from '@angular/core/testing';

import { XfuzzyService } from './xfuzzy.service';

describe('XfuzzyService', () => {
  let service: XfuzzyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(XfuzzyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
