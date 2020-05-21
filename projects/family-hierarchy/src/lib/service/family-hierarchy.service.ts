import { Injectable } from '@angular/core';
import { FhNode, FhLink, FhUnion, FhConfig} from '../models/models';
import { IData, INode, IEdge } from '../models/_models';
@Injectable({
  providedIn: 'root'
})
export class FamilyHierarchyService {
  private data = new IData();
  private nodes: FhNode [];
  private links: FhLink [] = [];
  private unions: FhUnion [] = [];
  private config: FhConfig;

  n = 0;
  constructor() { }

  transformData(nodes: FhNode [], links: FhLink [], unions: FhUnion [], config: FhConfig): IData {
    this.config = config;
    this.nodes = nodes;
    this.links = links;
    this.unions = unions;
    this.data.nodes = this.nodes.map(
      (o: FhNode) => {
        const node = new INode();
        node.id = o.id;
        node.image = o.image ? o.image : this.config.nodes.images;
        node.size = this.config.nodes.size;
        node.level = (o.level * 2) - 1;
        console.log(node.level);
        node.label = o.label;
        return node;
      }
    );

    // Generate links with union nodes
    this.data.edges = links.map(
      (o: FhLink) => {
        const link = new IEdge();
        link.from = o.nodeId;
        link.to = `u${o.unionId}`;
        link.arrows = 'from';
        return link;
      }
    );

    // Generate union nodes
    this.generateUnion(unions);
    return this.data;
  }

  getFamilyNode(nodeId: any): FhNode | FhUnion {
    if (typeof(nodeId) === 'string' && nodeId.charAt(0) === 'u') {
      const id = nodeId.substr(1);
      return this.unions.filter( n => n.id == id)[0];
    } else {
      return this.nodes.filter( n => n.id === nodeId)[0];
    }
  }

  generateUnion(unions: FhUnion []): void {
    let level;
    unions.map(
      (u: FhUnion) => {
        const node = new INode();
        node.id = `u${u.id}`;
        node.image = this.config.union.images;
        node.size = this.config.union.size;
        u.components.forEach(e => {
          const edge = new IEdge();
          edge.from = node.id;
          edge.to = e;
          level = this.nodes.filter( n => n.id === e)[0].level;
          this.data.edges.push(edge);
        });
        node.level = (level * 2);
        this.data.nodes.push(node);
      }
    );
  }
}
