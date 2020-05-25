import { Injectable, EventEmitter } from '@angular/core';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { FhNode, FhUnion, FhLink, FhConfig } from '../models/models';
import { DataSet, Node, Edge } from 'vis-network/standalone';
import { DEFAULT_CONFIG } from '../config/default';
import { isObject } from 'util';

/* tslint:disable */

@Injectable({
  providedIn: 'root'
})
export class FamilyHierarchyService {
  private currentEdges = new BehaviorSubject<DataSet<Edge>>(new DataSet<Edge>());
  private _Edges : Observable<DataSet<Edge>> = this.currentEdges.asObservable();

  public get Edges(): Observable<DataSet<Edge>> {
    return this._Edges;
  }
  
  private currentNodes = new BehaviorSubject<DataSet<Node>>(new DataSet<Node>());
  private _Nodes : Observable<DataSet<Node>> = this.currentNodes.asObservable();

  public get Nodes(): Observable<DataSet<Node>> {
    return this._Nodes;
  }

  private currentFhNodes = new BehaviorSubject<FhNode []>([]);
  public _fhNodes: Observable<FhNode []> = this.currentFhNodes.asObservable();
  public setFhNodes(nodes: FhNode []) {
    this.currentNodes.next(this.generateNodes(nodes));
    this.currentFhNodes.next(nodes);
  }
  public get FhNodes(): Observable<FhNode []> {
    return this._fhNodes;
  }

  private currentFhUnions = new BehaviorSubject<FhUnion []>([]);
  public _fhUnions: Observable<FhUnion []> = this.currentFhUnions.asObservable();
  public setFhUnions(unions: FhUnion []) {
    this.generateUnions(unions);
    this.currentFhUnions.next(unions);
  }
  public get FhUnions(): Observable<FhUnion []> {
    return this._fhUnions;
  }

  private currentFhLinks = new BehaviorSubject<FhLink []>([]);
  public _fhLinks: Observable<FhLink []> = this.currentFhLinks.asObservable();
  public setFhLinks(links: FhLink []) {
    this.currentEdges.next(this.generateEdges(links))
    this.currentFhLinks.next(links);
  }
  get FhLinks(): Observable<FhLink []> {
    return this._fhLinks;
  }

 
  private currentConfig = new BehaviorSubject<FhConfig>(DEFAULT_CONFIG);
  public _config: Observable<FhConfig> = this.currentConfig.asObservable();
  public setConfig(config: FhConfig) {
    this.currentConfig.next(this.mergeDeep(this.currentConfig.getValue(), config));
  }
  public get config(): Observable<FhConfig> {
    return this._config;
  }

  /*
  * Evento de click sobre un nodo, devuelve el dato del nodo
  */
  private _clickNode = new Subject<any>();
  public clickNode = this._clickNode.asObservable();

  private _clickUnion = new Subject<any>();
  public clickUnion = this._clickUnion.asObservable();

  private _clickLink = new Subject<any>();
  public clickLink = this._clickLink.asObservable();
  
  public sendClickEvent(e: any, type?: string): void {
    if (type === 'node') {
      const node = this.currentFhNodes.getValue().find( el => el.id === e.nodes[0]);
      if (node) {
        this._clickNode.next(node);
      } else { 
        const id = e.nodes[0].replace('u','');
        const union = this.currentFhUnions.getValue().find( el => el.id == id)
        this._clickUnion.next(union);
      }
    } else {
      const link  = this.currentFhLinks.getValue().find( el => el.id == e.edges[0]);
      if (link) {
        this._clickLink.next(link);
      } else {
        const regex = /(?<=l)(.*?)(?=_)/;
        const id: string = e.edges[0].toString().match(regex)[0];
        this._clickLink.next(this.currentFhUnions.getValue().find( o => o.id == id) )
      }
    }
  }
  
  constructor() { }

  public initialize(nodes: FhNode [], links: FhLink [], unions: FhUnion [], config?: FhConfig): void {
    this.setFhNodes(nodes);
    this.setFhLinks(links);
    this.setFhUnions(unions);
    if (config) {
      this.setConfig(config);
    }
  }

  private mergeDeep(target, ...sources) {
    if (!sources.length) { return target; }
    const source = sources.shift();
    if (isObject(target) && isObject(source)) {
      for (const key in source) {
        if (isObject(source[key])) {
          if (!target[key]) {
            Object.assign(target, { [key]: {} });
          } else {
            target[key] = Object.assign({}, target[key]);
          }
          this.mergeDeep(target[key], source[key]);
        } else {
          Object.assign(target, { [key]: source[key] });
        }
      }
    }
    return this.mergeDeep(target, ...sources);
  }

  private generateNodes(nodes: FhNode []): DataSet<Node> {
    return new DataSet<Node> (
      nodes.map(
        (o: FhNode) => {
          return this.createNode(o);
        }
      )
    );
  }

  private createNode(o: FhNode): Node {
    return {
      id : o.id,
      image : o.image ? o.image : this.currentConfig.getValue().nodes.images,
      shape: 'image',
      size : this.currentConfig.getValue().nodes.size,
      level : (o.level * 2) - 1,
      label : o.label
    };
  }

  private createEdge(o: FhLink): Edge {
   return {
      id: o.id,
      from: o.nodeId,
      to: `u${o.unionId}`,
      color: this.currentConfig.getValue().links.childrens.styles
    };
  }

  private generateEdges(links: FhLink []): DataSet<Edge> {
    return new DataSet<Edge> (
      links.map(
        (o: FhLink) => {
          return this.createEdge(o);
        }
      )
    );
  }

  private generateUnions(unions: FhUnion []): void {
    unions.forEach((u: FhUnion) => {
      this.createUnion(u);
    });
  }

  private createUnion(u: FhUnion): void {
    let level;
    const node: Node = {
      id: `u${u.id}`,
      image: this.currentConfig.getValue().union.images,
      shape: 'image',
      size: this.currentConfig.getValue().union.size,
    };
    u.components.forEach((e:number | string) => {
      const edge: Edge = {
        id: `l${u.id}_${node.id}-${e}`,
        from: node.id,
        to: e,
        color: this.currentConfig.getValue().links.parents.styles,
      };
      level = this.currentFhNodes.getValue().filter( n => n.id === e)[0].level;
      this.currentEdges.getValue().add(edge);
    });
    node.level = (level * 2);
    this.currentNodes.getValue().add(node);
  }

}
