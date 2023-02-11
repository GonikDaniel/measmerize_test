function buildTree(nodes) {
  // Create hash table for nodes using nodeId as key
  const nodeMap = {};
  nodes.forEach(node => {
    node.children = [];
    nodeMap[node.nodeId] = node;
  });

  // Build tree structure
  nodes.forEach(node => {
    const parentId = node.parentId;

    if (parentId) {
      const parent = nodeMap[parentId];

      if (parent) {
        parent.children.splice(
          node.previousSiblingId ? findIndex(parent.children, node.previousSiblingId) + 1 : 0,
          0,
          node,
        );
      }
    }
  });

  // Filter out child nodes and return root-level nodes
  return nodes.filter(node => !node.parentId);
}

function findIndex(arr, id) {
  return arr.findIndex(node => node.nodeId === id);
}

module.exports = { buildTree };
