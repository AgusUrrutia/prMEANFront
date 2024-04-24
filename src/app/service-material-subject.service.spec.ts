import { TestBed } from '@angular/core/testing';

import { ServiceMaterialSubjectService } from './service-material-subject.service';

describe('ServiceMaterialSubjectService', () => {
  let service: ServiceMaterialSubjectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceMaterialSubjectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
