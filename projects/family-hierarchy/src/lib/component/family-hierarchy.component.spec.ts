import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilyHierarchyComponent } from './family-hierarchy.component';

describe('FamilyHierarchyComponent', () => {
  let component: FamilyHierarchyComponent;
  let fixture: ComponentFixture<FamilyHierarchyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FamilyHierarchyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FamilyHierarchyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
