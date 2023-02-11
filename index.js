const fs = require('fs');
const { input: inputFile } = require('minimist')(process.argv.slice(2));

const { buildTree } = require('./utils');

/**
 * To rearrange the flat array of nodes into a sorted tree structure we'll create a hash table using the nodeId property as the key and the node object as the value.
 * Then, iterate over the nodes and use the parentId and previousSiblingId properties to build the tree structure, adding child nodes to their respective parent nodes.
 * If a node has no parent, we'll add it as a root-level node.
 * Finally, we filter out any nodes that were added as children to other nodes, since they are no longer root-level nodes.
 */
try {
  if (!inputFile) {
    console.log('Please provide correct input file path via --input flag');
    process.exit(1);
  }

  console.log(require('figlet').textSync('Hello, Measmerize!'));

  const nodes = JSON.parse(fs.readFileSync(inputFile, 'utf-8'));
  const tree = buildTree(nodes);

  console.log('Resulting tree:\n', JSON.stringify(tree, null, 2));
} catch (e) {
  console.error('Smth went wrong, check passed params or your JSON validity', e);
}
