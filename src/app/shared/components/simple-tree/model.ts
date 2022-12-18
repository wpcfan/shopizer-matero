export interface SimpleTreeNode {
  id: string;
  name: string;
  value: any;
  children: SimpleTreeNode[];
}

export interface AncestorsTreeNode {
  id: string;
  name: string;
  ancestors: { id: string; name: string }[];
  parentId: string;
}

export interface FlatNode {
  node: SimpleTreeNode;
  expand: boolean;
}

export const getFlatNodeStates = (nodes: SimpleTreeNode[]): { [id: string]: boolean } => {
  return nodes.reduce((acc, curr) => {
    const flatNodes = getFlatNodeStates(curr.children);
    return {
      ...acc,
      ...flatNodes,
      [curr.id]: false,
    };
  }, {});
};

export const getFlatNodes = (nodes: SimpleTreeNode[]): { [id: string]: FlatNode } => {
  return nodes.reduce((acc, curr) => {
    const flatNodes = getFlatNodes(curr.children);
    return {
      ...acc,
      ...flatNodes,
      [curr.id]: { node: curr, expand: false },
    };
  }, {});
};

export const appendChildrenToNode = (
  ancestorNode: AncestorsTreeNode,
  descenants: AncestorsTreeNode[]
): SimpleTreeNode => {
  return {
    ...ancestorNode,
    value: { ...ancestorNode },
    children: descenants
      .filter(node => node.parentId === ancestorNode.id)
      .map(node =>
        appendChildrenToNode(
          node,
          descenants.filter(descenant => descenant.ancestors.some(a => a.id === node.id))
        )
      ),
  };
};

export const convertToSimpleNodes = (nodes: AncestorsTreeNode[]): SimpleTreeNode[] => {
  return nodes
    .filter(node => !!node && !!node.parentId === false)
    .map(node =>
      appendChildrenToNode(
        node,
        nodes.filter(n => !!n.ancestors && n.ancestors.some(val => val.id === node.id))
      )
    );
};
