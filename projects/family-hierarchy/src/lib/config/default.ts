
export const EDGE_CHILDREN = {
  color: '#848484',
  highlight: '#848484',
  hover: '#848484',
  inherit: 'from',
  opacity: 1.0
}

export const EDGE_PARENT = {
  color: '#99004d',
  highlight: '#800040',
  hover: '#800040',
  inherit: 'from',
  opacity: 1.0
}

export const NODE_CONFIG = {
  color: '#cc6699',
  shape: 'image',
  size: 20
}

export const NODE_PARENT_CONFIG = {
  color: '#660033',
  shape: 'box',
  size: 20
}

export const OPTION_DEFAULT = {
  layout: {
    hierarchical: {
      enabled: true,
      levelSeparation: 150,
      nodeSpacing: 200,
      treeSpacing: 200,
      blockShifting: true,
      edgeMinimization: true,
      parentCentralization: true,
      direction: 'UD',        // UD, DU, LR, RL
      sortMethod: 'directed',  // hubsize, directed
      shakeTowards: 'leaves'  // roots, leaves
    }
  },
  edges: {
    shadow: true
  },
  nodes: {
    shadow: true
  },
  interaction: {
    hover: true,
  },
  physics: {
    maxVelocity: 10,
    minVelocity: 0.1,
  }
}
