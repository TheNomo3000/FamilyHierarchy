export interface FhNode {
  id: any;
  label: string;
  level: number;
  image?: string;
  data?: any;
  color ?: {};
}

export interface FhLink {
  unionId: any;
  nodeId: any;
}

export interface FhUnion {
  id: any;
  components: any [];
  image?: string;
  data?: any;
}

export interface FhConfig {
  links?: LinksConfig;
  nodes?: NodeConfig;
  union?: UnionConfig;
}

export interface LinksConfig {
  parents?: ParentsConfig;
  childrens?: ChildrenConfig;
}

export interface ParentsConfig {
  styles?: StylesConfig;
}

export interface ChildrenConfig {
  styles?: StylesConfig;
}

export interface ChildrenConfig {
  styles?: StylesConfig;
}

export interface StylesConfig {
  color?: string;
  highlight?: string;
  hover?: string;
}

export interface NodeConfig {
  images?: string;
  size?: number;
}

export interface UnionConfig {
  images?: string;
  size?: number;
}