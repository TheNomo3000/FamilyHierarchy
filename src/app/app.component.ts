import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FhUnion, FhNode, FhLink, FhData } from 'projects/family-hierarchy/src/lib/models/models';
import { FhConfig } from 'projects/family-hierarchy/src/public-api';
import { FamilyHierarchyService } from 'projects/family-hierarchy/src/lib/service/family-hierarchy.service';

const UNIONS: FhUnion [] = [
  {
    id: 1,
    components: [1, 2],
    data: {
      test: `I'm a test :D`
    }
  },
  {
    id: 2,
    components: [3, 4]
  },
  {
    id: 10,
    components: [88, 5]
  }
];

const LINKS: FhLink [] = [
  {
    id: 1,
    unionId: 1,
    nodeId: 3
  },
  {
    id: 2,
    unionId: 1,
    nodeId: 5
  },
  {
    id: 3,
    unionId: 2,
    nodeId: 90
  },
  {
    id: 4,
    unionId: 2,
    nodeId: 87
  }
];

const NODES: FhNode [] = [
  {
    id: 1,
    image: 'data:image/png;base64,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',
    label: 'Rodrigo',
    level: 1,
    data: {
      age: 25
    }
  },
  {
    id: 2,
    image: 'data:image/png;base64,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',
    label: 'Maria',
    level: 1,
    data: {
      age: 25
    },
  },
  {
    id: 3,
    label: 'Júlia',
    level: 2,
    data: {
      age: 1
    }
  },
  {
    id: 5,
    label: 'Marc',
    level: 2,
    data: {
      age: 1
    }
  },
  {
    id: 88,
    label: 'Raúl',
    level: 2,
    data: {
      age: 1
    }
  },
  {
    id: 4,
    label: 'Mario',
    level: 2,
    data: {
      age: 1
    }
  },
  {
    id: 90,
    label: 'Alexa',
    level: 3,
    data: {
      age: 1
    }
  },
  {
    id: 87,
    label: 'Pablo',
    level: 3,
    data: {
      age: 1
    }
  }
];

@Component({
  selector: 'root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  editMode = false;
  links = LINKS;
  unions = UNIONS;
  nodes = NODES;
  config: FhConfig = {
    links: {
      childrens: {
        styles: {
          color: '#848484'
        }
      }
    },
    nodes: {
      size: 10
    }
  };
  result;

  constructor(private fhService: FamilyHierarchyService) { }

  ngAfterViewInit(): void {
    const data: FhData = {
      nodes: NODES,
      links: LINKS,
      unions: UNIONS
    }
    this.fhService.initialize(data, this.config);
    this.fhService.clickNode.subscribe(
      (result) => {
        console.log('NODE: ', result);
      }
    );

    this.fhService.clickLink.subscribe(
      (result) => {
        console.log('LINK: ', result);

      }
    );

    this.fhService.clickUnion.subscribe(
      (result) => {
        console.log('UNION: ', result);

      }
    );
  }

  nodeSelected(node: FhNode | FhUnion): void {
    this.result = JSON.stringify(node);
  }

  createNode(): void {
    const n: FhNode = {
      id: 23,
      label: 'Rodrigo',
      level: 3,
      data: {
        age: 25
      }
    };
    this.fhService.addNode(n);
  }

  createUnion(): void {
    const n: FhUnion = {
      id: 20,
      components: [23, 1],
      data: {
        test: `I'm a test :D`
      }
    };
    this.fhService.addUnion(n);
  }

  createLink(): void {
    const l: FhLink = {
      id: 99,
      nodeId: 23,
      unionId: 2
    }
    this.editMode = true;
    this.fhService.addLink(l);
  }
}
