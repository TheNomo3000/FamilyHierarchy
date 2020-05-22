# FamilyHierarchy

A small library for **Angular 9+** that implements [vis-network](https://github.com/visjs/vis-network) to generate a hierarchy chart of a family.

![Example FamilyHierarchy](https://i.imgur.com/f54rxiV.png)

## Pre-requisites

[Demo](https://thenomo3000.github.io/FamilyHierarchy/)

We use ngx-vis, to generate the graph, and so we have to install some dependencies: 

```bash
npm install moment @egjs/hammerjs vis-data vis-util keycharm
```

## Installation

Just add the FamilyHierarchy for use the component

```typescript
import { FamilyHierarchy } from 'FamilyHierarchy';
import { AppComponent } from './app.component';

@NgModule({
 imports: [
  (...)
  FamilyHierarchy,
  (...)
 ],
 declarations: [AppComponent],
})
```

## Example

```html
<FamilyHierarchy
  [config]="config"
  [links]="links"
  [nodes]="nodes"
  [unions]="unions"
  (selected)="nodeSelected($event)">
</FamilyHierarchy>
```

## Documentation

### Configuration

```typescript
export const DEFAULT_CONFIG: FhConfig = {
  links: {
    childrens: {
     styles : {
      color: '#848484',
      highlight: '#848484',
      hover: '#848484'
     }
    },
    parents: {
      styles: {
        color: '#99004d',
        highlight: '#800040',
        hover: '#800040',
      }
    }
  },
  nodes : {
    images: DEFAULT_NODE_IMAGE,
    size: 20
  },
  union: {
    images: DEFAULT_UNION_IMAGE,
    size: 20
  }
}
```

### Nodes

```typescript
export interface FhNode {
  id: any;
  label: string;
  level: number;
  image?: string;
  data?: any;
  color ?: {};
}
```

### Links

```typescript
export interface FhLink {
  unionId: any;
  nodeId: any;
}
```

### Unions

```typescript
export interface FhUnion {
  id: any;
  components: any [];
  image?: string;
  data?: any;
}
```


## Errors

If there is an error with moment, it can be fixed by adding the following to the **compile options** in **tsconfig.app**

```json
(...)
"compilerOptions": {
  (...)
  "allowSyntheticDefaultImports": true,
}
(...)
```
