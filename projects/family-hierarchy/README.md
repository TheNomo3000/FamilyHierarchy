# FamilyHierarchy

### Description :

A small library for **Angular 9+** that implements [vis-network](https://github.com/visjs/vis-network) to generate a hierarchy chart of a family.

![Example FamilyHierarchy](https://i.imgur.com/f54rxiV.png)
### Pre-requisites: 
We use ngx-vis, to generate the graph, and so we have to install some dependencies: 


```
npm install moment @egjs/hammerjs vis-data vis-util keycharm
```


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
### Errors :

If there is an error with moment, it can be fixed by adding the following to the **compile options** in **tsconfig.app**

```json
(...)
"compilerOptions": {
	(...)
	"allowSyntheticDefaultImports": true,
}
(...)
```