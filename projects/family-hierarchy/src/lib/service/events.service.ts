import { Injectable } from '@angular/core';
import { FamilyHierarchyService } from './family-hierarchy.service';

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  constructor(private fhService: FamilyHierarchyService) { }

  public sendClickEvent(e: any): void {
    if (e.nodes.length > 0 ) {
      this.fhService.clickNode.next(e);
    }
  }
}
