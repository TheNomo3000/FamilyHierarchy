import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FamilyHierarchyModule } from 'projects/family-hierarchy/src/public-api';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FamilyHierarchyModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
