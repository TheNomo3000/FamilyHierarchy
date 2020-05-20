# FamilyHierarchy

### Description :
A small library for **Angular 9+** that implements [vis-network](https://github.com/visjs/vis-network) to generate a hierarchy chart of a family.

![Example FamilyHierarchy](https://i.imgur.com/f54rxiV.png)

### Installation :
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

### Example

```html
<family-hierarchy [edges]="edges" [nodes]="nodes">
	<ng-template  #nodeTemplate>
		<svg>
		(...)
		</svg>
	</ng-template>
</family-hierarchy>
```
