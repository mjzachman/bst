import { process } from './process.mjs'

const Node = (data = 0, left = null, right = null) => {
    return { data, left, right }
}

const Tree = (input) => {
    
    const buildTree = (arr, start, end) => {
        if( start > end ) { return null };
        const mid = Math.ceil((start + end)/2);
        return Node(arr[mid], buildTree(arr, start, mid - 1), buildTree(arr, mid + 1, end));
    }

    input = process(input);

    const root = buildTree(input, 0, input.length - 1);

    const prettyPrint = (node, prefix = '', isLeft = true) => {
        if (node.right !== null) {
          prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
        }
        console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
        if (node.left !== null) {
          prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
        }
      }


    return {
        root,
        prettyPrint
    }
}



const test = [3, 5, 7, 5, 10, 1, 5, 8, 9, 2, 5, 4, 5];
const myTree = Tree(test);
myTree.prettyPrint(myTree.root);

// insert and delete functions that accept a value to do the title functoin
// find() accapts a vlaue and returns the node
// levelOrder
// inOrder
// preOrder
// postOrder
// height
// depth
// isBalanced
// rebalance
// 'tie it all