import { TestBed } from '@angular/core/testing';

import { FormContextService } from './form-context.service';

describe('FormContextService', () => {
  let service: FormContextService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormContextService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
