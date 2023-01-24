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

    input = process(input); // uses merge sort and remove duplicates from process module, returns sorted array with unique elements

    const root = buildTree(input, 0, input.length - 1); // recursively creates new tree given the processed array

    // insert and delete functions that accept a value to do the title functoin
    const insert = (val) => {
        let current = root;

        while(current.data !== val) {
            if (val > current.data){
                if(!current.right) {
                    current.right = Node(val);
                    console.log('successfully inserted');
                    return;
                }
                current = current.right;
            } else {
                if(!current.left) {
                    current.left = Node(val);
                    console.log('successfully inserted');
                    return;
                }
                current = current.left;
            }
        }

        console.log('that value is already in the tree');
    }
    // find() accapts a vlaue and returns the node
    const find = (val) => {
        let current = root;

        while (current.data !== val){
            if(val < current.data && current.left){
                current = current.left;
            }else if (val > current.data && current.right){
                current = current.right;
            } else {
                console.log(`there is no node with the value ${val}`);
                return null;
            }
        }
        return current;
        }
    
    const remove = (val) => {
        let parent = null;
        let leftChild = false;
        let current = root;
        
        // let current = find(val);
        // if (!current) {return};
        
        //goto requested node
        // how can i replace this block of code with let current = find(val)?
        // the problem is that i need leftChild
        
        while(current.data != val){
            parent = current;
            
            if(val < current.data && current.left){
                current = current.left;
                leftChild = true;
            } else if (val > current.data && current.right){
                current = current.right;
                leftChild = false;
            } else {
                console.log(`there is no node with the value ${val}`);
                return;
            }

        }
        
        // remove case varies based on number of children: 0, 1, or 2
        if(current.left && current.right){ 
            let replace = current.right;
            while (replace.left){
                replace = replace.left;
            }
            const temp = replace.data;
            remove(replace.data);
            current.data = temp;
        }else if (current.left){ 
            if(leftChild){
                parent.left = current.left;
            } else {
                parent.right = current.left;
            }
        }else if (current.right){
            if(leftChild){
                parent.left = current.right;
            } else {
                parent.right = current.right;
            }
        }else { 
            if(leftChild) {
                parent.left = null;
            } else {
                parent.right = null;
            }
        }
    }
    
    // levelOrder
    const levelOrder = (func) => {
        if(!root) { return };
        let current = root;
        let Q = [current];
        let output = [];
        while (Q[0]){
            if (current.left) {Q.push(current.left)};
            if (current.right) {Q.push(current.right)};
            Q.splice(0,1);

            if(func){ 
                func(current.data)
            }
            else {
                output.push(current.data);
            }
            
            current = Q[0];
        }
        if(!func){
            return output;
        }
    }
    // preOrder, inOrder, and postOrder
    const preOrder = (func) => {
        func(root.data);
    }
    
    const inOrder = (func) => {
        func(root.data);
    }
    
    const postOrder = (func) => {
        func(root.data);
    }
    // height
    // depth
    // isBalanced
    // rebalance
    // 'tie it all

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
        insert,
        find,
        remove,
        levelOrder,
        preOrder,
        inOrder,
        postOrder,
        prettyPrint
    }
}



const test = [30, 50, 50, 60, 100, 10, 50, 80, 90, 20, 50, 40, 50];
const myTree = Tree(test);
myTree.insert(45);
myTree.insert(12);
myTree.insert(7);
myTree.prettyPrint(myTree.root);
myTree.preOrder(console.log);