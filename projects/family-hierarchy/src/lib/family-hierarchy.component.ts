import { Component, ElementRef, ViewChild, AfterViewInit, Input, ContentChild, TemplateRef } from '@angular/core';
import { VisNetworkService } from 'ngx-vis';
import { OPTION_DEFAULT } from './config/default';
import { IFamilyNode, IFamilyEdge, IFamilyData } from './models/interfaces';

@Component({
  selector: 'FamilyHierarchy',
  templateUrl: './family-hierarchy.component.html',
  styleUrls: ['./family-hierarchy.component.scss']
})

export class FamilyHierarchyComponent implements AfterViewInit {
  @ViewChild('box') el: ElementRef;
  @ContentChild('nodeTemplate') nodeTemplate: TemplateRef<any>;
  @ViewChild('contentNode') contentNode: ElementRef;

  @Input() nodes: IFamilyNode [] = [];
  @Input() edges: IFamilyEdge [] = [];

  options = OPTION_DEFAULT;

  constructor(private visn: VisNetworkService) {
  }

  ngAfterViewInit(): void {
    if (this.nodeTemplate) {
      this.renderNodeTemplate();
    }
    const data: IFamilyData = {
      nodes: this.nodes,
      edges: this.edges
    };
    const a = this.visn.create('1', this.el.nativeElement, data as any, this.options);
  }

  cleanImage(data: string): string {
    const reBreak = /\r?\n|\r/g;
    const reStyles = /\_ngcontent.*?""/g;
    const regex = /<\!--.*?-->/g;

    return data.replace(reBreak, '').replace(reStyles, '').replace(regex, '');
  }

  renderNodeTemplate(): void {
    const nodeTemplate = this.contentNode.nativeElement.innerHTML;
    const url = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(this.cleanImage(nodeTemplate));
    this.nodes.forEach(node => {
      node.image = url;
    });
  }
}
