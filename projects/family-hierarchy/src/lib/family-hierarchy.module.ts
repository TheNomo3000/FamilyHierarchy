import { NgModule } from '@angular/core';
import { FamilyHierarchyComponent } from './family-hierarchy.component';
import { VisModule } from 'ngx-vis';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [FamilyHierarchyComponent],
  imports: [
    CommonModule,
    VisModule,
  ],
  exports: [FamilyHierarchyComponent]
})
export class FamilyHierarchyModule { }
