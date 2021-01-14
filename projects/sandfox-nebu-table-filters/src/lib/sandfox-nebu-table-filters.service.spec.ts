import { TestBed } from '@angular/core/testing';

import { SandfoxNebuTableFiltersService } from './sandfox-nebu-table-filters.service';

describe('SandfoxNebuTableFiltersService', () => {
  let service: SandfoxNebuTableFiltersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SandfoxNebuTableFiltersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
