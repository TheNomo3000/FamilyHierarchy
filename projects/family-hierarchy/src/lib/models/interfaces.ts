export interface IFamilyNode {
  id: any;
  label: string;
  color: string;
  shape: string;
  size: number;
  level: number;
  image: string;
}

export interface IFamilyEdge {
  from: any;
  to: any;
  arrows: string;
  physics: boolean;
  smooth: {
    type: string;
  };
  color: {
    color: string;
    highlight: string;
    hover: string;
    inherit: string;
    opacity: number;
  };
}

export interface IFamilyData {
  nodes: IFamilyNode [];
  edges: IFamilyEdge [];
}