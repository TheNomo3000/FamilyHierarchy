import { Component } from '@angular/core';
import { IFamilyNode, IFamilyEdge } from 'projects/family-hierarchy/src/lib/models/interfaces';
import { EDGES_EXAMPLES, NODES_EXAMPLES } from './data';

@Component({
  selector: 'root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  edges: IFamilyEdge [] = EDGES_EXAMPLES;
  nodes: IFamilyNode [] = NODES_EXAMPLES;
  title = 'FamilyHierarchyDemo';
}
