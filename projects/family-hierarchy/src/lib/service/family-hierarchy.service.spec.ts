import { TestBed } from '@angular/core/testing';

import { FamilyHierarchyService } from './family-hierarchy.service';

describe('FamilyHierarchyService', () => {
  let service: FamilyHierarchyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FamilyHierarchyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
