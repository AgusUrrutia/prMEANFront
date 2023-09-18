import { TestBed } from '@angular/core/testing';

import { ServicePeopleService } from './service-people.service';

describe('ServicePeopleService', () => {
  let service: ServicePeopleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicePeopleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
