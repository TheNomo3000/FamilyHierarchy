import { NODE_CONFIG, NODE_PARENT_CONFIG, EDGE_PARENT, EDGE_CHILDREN } from '../../projects/family-hierarchy/src/lib/config/default';

const nodeTemplate = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" viewBox="0 -256 1792 1792">' +
'<g transform="matrix(1,0,0,-1,197.42373,1300.6102)">' +
'<path d="M 1408,131 Q 1408,11 1335,-58.5 1262,-128 1141,-128 H 267 Q 146,-128 73,-58.5 0,11 0,131 0,184 3.5,234.5 7,285 17.5,343.5 28,402 44,452 q 16,50 43,97.5 27,47.5 62,81 35,33.5 85.5,53.5 50.5,20 111.5,20 9,0 42,-21.5 33,-21.5 74.5,-48 41.5,-26.5 108,-48 Q 637,565 704,565 q 67,0 133.5,21.5 66.5,21.5 108,48 41.5,26.5 74.5,48 33,21.5 42,21.5 61,0 111.5,-20 50.5,-20 85.5,-53.5 35,-33.5 62,-81 27,-47.5 43,-97.5 16,-50 26.5,-108.5 10.5,-58.5 14,-109 Q 1408,184 1408,131 z m -320,893 Q 1088,865 975.5,752.5 863,640 704,640 545,640 432.5,752.5 320,865 320,1024 320,1183 432.5,1295.5 545,1408 704,1408 863,1408 975.5,1295.5 1088,1183 1088,1024 z"/>' +
'</g>' +
'</svg>';

const url = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(nodeTemplate);


export const NODES_EXAMPLES = [
  {id: '1', label: 'JUAN', ...NODE_CONFIG, level: 1, image: url},
  {id: 'u2', label: '', ...NODE_PARENT_CONFIG, level: 2, image: url},
  {id: '3', label: 'CARMEN', ...NODE_CONFIG, level: 1, image: url},
  {id: '4', label: 'PABLO', ...NODE_CONFIG, level: 3, image: url},
  {id: 'u5', label: '', ...NODE_CONFIG, level: 4, image: url},
  {id: '6', label: 'ROBERTA', ...NODE_CONFIG, level: 3, image: url},
  {id: '7', label: 'CARLOS', ...NODE_CONFIG, level: 3 , image: url},
  {id: 'u8', label: '', ...NODE_PARENT_CONFIG, level: 4, image: url},
  {id: '9', label: 'ANTONIA', ...NODE_CONFIG, level: 3, image: url},
  {id: '10', label: 'Pablo Jr.', ...NODE_CONFIG, level: 5, image: url},
];

export const EDGES_EXAMPLES = [
    {from: '1', to: 'u2', arrows: 'to', physics: false, smooth: {type: 'cubicBezier'}, color: EDGE_PARENT},
    {from: '3', to: 'u2', arrows: 'to', physics: false, smooth: {type: 'cubicBezier'}, color: EDGE_PARENT},
    {from: 'u2', to: '4', arrows: 'to', physics: false, smooth: {type: 'cubicBezier'}, color: EDGE_CHILDREN},
    {from: '4', to: 'u5', arrows: 'to', physics: false, smooth: {type: 'cubicBezier'}, color: EDGE_PARENT},
    {from: '6', to: 'u5', arrows: 'to', physics: false, smooth: {type: 'cubicBezier'}, color: EDGE_PARENT},
    {from: 'u2', to: '7', arrows: 'to', physics: false, smooth: {type: 'cubicBezier'}, color: EDGE_CHILDREN},
    {from: '7', to: 'u8', arrows: 'to', physics: false, smooth: {type: 'cubicBezier'}, color: EDGE_PARENT},
    {from: '9', to: 'u8', arrows: 'to', physics: false, smooth: {type: 'cubicBezier'}, color: EDGE_PARENT},
    {from: 'u8', to: '10', arrows: 'to', physics: false, smooth: {type: 'cubicBezier'}, color: EDGE_CHILDREN},
]