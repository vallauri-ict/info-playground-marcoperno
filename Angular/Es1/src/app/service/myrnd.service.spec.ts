import { TestBed } from '@angular/core/testing';

import { MyrndService } from './myrnd.service';

describe('MyrndService', () => {
  let service: MyrndService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyrndService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
