import { Component, ElementRef, ViewChild, Input, ContentChild, TemplateRef, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { VisNetworkService, Options } from 'ngx-vis';
import { OPTION_DEFAULT, DEFAULT_CONFIG } from '../config/default';
import { FamilyHierarchyService } from '../service/family-hierarchy.service';
import { FhNode, FhUnion, FhConfig } from '../models/models';
import { IData } from '../models/_models';
import { isObject } from 'util';

@Component({
  selector: 'FamilyHierarchy',
  templateUrl: './family-hierarchy.component.html',
  styleUrls: ['./family-hierarchy.component.scss']
})

export class FamilyHierarchyComponent implements  OnInit, OnDestroy {
  @ViewChild('box') el: ElementRef;
  @ContentChild('nodeTemplate') nodeTemplate: TemplateRef<any>;
  @ViewChild('contentNode') contentNode: ElementRef;

  @Input() nodes: any [] = [];
  @Input() links: any [] = [];
  @Input() unions: any [] = [];
  @Input() config: FhConfig;

  @Output() selected = new EventEmitter<FhNode | FhUnion>();

  public visNetwork = 'networkId1';
  public visNetworkData: IData;
  public visNetworkOptions: Options = OPTION_DEFAULT;

  constructor(private visNetworkService: VisNetworkService, private familyService: FamilyHierarchyService) {
  }

  ngOnInit(): void {
    this.visNetworkData = { nodes: this.nodes, edges: this.links };
    const config = this.mergeDeep(DEFAULT_CONFIG, this.config)
    this.visNetworkData = this.familyService.transformData(this.nodes, this.links, this.unions, config);
  }

  public networkInitialized(): void {
    this.visNetworkService.on(this.visNetwork, 'click');

    this.visNetworkService.click.subscribe((eventData: any[]) => {
      if ( eventData[1].nodes.length > 0 ) {
        this.selected.emit(this.familyService.getFamilyNode(eventData[1].nodes[0]));
      }
    });
  }

  mergeDeep(target, ...sources) {
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

  ngOnDestroy(): void {
    this.visNetworkService.off(this.visNetwork, 'click');
  }
}
