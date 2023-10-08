import { TestBed } from '@angular/core/testing';

import { FormControllerService } from './form-controller.service';

describe('FormControllerService', () => {
  let service: FormControllerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormControllerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
