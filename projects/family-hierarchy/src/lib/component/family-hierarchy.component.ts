import { Component, ElementRef, ViewChild, Input, ContentChild, TemplateRef, OnInit, Output, EventEmitter, OnDestroy, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import { OPTION_DEFAULT } from '../config/default';
import { FamilyHierarchyService } from '../service/family-hierarchy.service';
import { FhConfig } from '../models/models';
import { DataSet, Node, Edge, Network, Data } from 'vis-network/standalone';
import { Subscription } from 'rxjs';
import { EventsService } from '../service/events.service';

@Component({
  selector: 'FamilyHierarchy',
  templateUrl: './family-hierarchy.component.html',
  styleUrls: ['./family-hierarchy.component.scss']
})

export class FamilyHierarchyComponent implements  OnInit, OnDestroy, AfterViewInit {
  @ViewChild('box') el: ElementRef;
  @ContentChild('nodeTemplate') nodeTemplate: TemplateRef<any>;
  @ViewChild('contentNode') contentNode: ElementRef;


  @Input() class: string;
  @Input() editMode = false;

  config: FhConfig;
  dsNode: DataSet<Node>;
  dsEdge: DataSet<Edge>;

  visNetwork: Network;
  visNetworkData: Data;

  subs = new Subscription();


  constructor(private familyService: FamilyHierarchyService, private eventService: EventsService) {
    this.subs.add(this.familyService._config.subscribe((config: FhConfig) => this.config = config));
    this.subs.add(this.familyService.Edges.subscribe((edges: DataSet<Edge>) => this.dsEdge = edges));
    this.subs.add(this.familyService.Nodes.subscribe((nodes: DataSet<Node>) => this.dsNode = nodes));
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.createNetwork();
  }

  createNetwork(): void {
    this.visNetworkData = { nodes: this.dsNode , edges: this.dsEdge};
    console.log(this.visNetworkData);
    this.visNetwork = new Network(this.el.nativeElement, this.visNetworkData, OPTION_DEFAULT);

    this.visNetwork.on('click', (e) => {
        // this.familyService.clickNode.next(e);
      this.eventService.sendClickEvent(e);
    })
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
