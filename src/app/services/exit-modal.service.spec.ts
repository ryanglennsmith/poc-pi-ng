import { TestBed } from '@angular/core/testing';

import { ExitModalService } from './exit-modal.service';

describe('ExitModalService', () => {
  let service: ExitModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExitModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
