import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SandfoxNebuTableFiltersComponent } from './sandfox-nebu-table-filters.component';

describe('SandfoxNebuTableFiltersComponent', () => {
  let component: SandfoxNebuTableFiltersComponent;
  let fixture: ComponentFixture<SandfoxNebuTableFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SandfoxNebuTableFiltersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SandfoxNebuTableFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
