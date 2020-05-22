export class INode {
  id: any;
  label: string;
  color: string;
  shape = 'image';
  size: number;
  level: number;
  image: string;
}

export class IEdge {
  from: any;
  to: any;
  arrows?: string = 'from';
  physics: boolean;
  smooth = {
    enabled: true,
    type: 'dynamic'
  };
  color: {
    color?: string;
    highlight?: string;
    hover?: string;
    inherit?: string;
    opacity?: number;
  };
}

export class IData {
  nodes: INode [];
  edges: IEdge [];
}
