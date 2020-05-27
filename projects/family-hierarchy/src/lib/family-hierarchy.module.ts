import { NgModule } from '@angular/core';
import { FamilyHierarchyComponent } from './component/family-hierarchy.component';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [FamilyHierarchyComponent],
  imports: [
    CommonModule,
  ],
  exports: [FamilyHierarchyComponent]
})
export class FamilyHierarchyModule { }
