const Node = (data = 0, left = null, right = null) => {
    return { data, left, right }
}

const Tree = (input) => {

    const mergeSort = (arr) => {
        if (arr.length < 2) { return arr;} // array is already sorted, return
        let left = [];
        let right = [];
        let merged = [];
    
         left = mergeSort(arr.slice(0, Math.ceil(arr.length/2))); //sort the left half
         right = mergeSort(arr.slice(Math.ceil(arr.length/2), arr.length));//sort the right half
    
        //merge the two halves
       while (left.length > 0 && right.length > 0){
        if(left[0] >= right[0]){
            merged.push(right.shift());
        } else if (left[0] < right[0]){
            merged.push(left.shift());
        }
        
        if(left.length === 0){
            merged = merged.concat(right);
        } else if(right.length === 0){
            merged = merged.concat(left);
        }
        
    }
    
        return merged;
    }

    const removeDuplicates = (arr) => {
        for (let i = 0; i < arr.length; i++){
            while(arr[i] === arr[i+1]) {
                arr.splice(i + 1, 1);
            }
        }
        return arr;
    }
    
    const buildTree = (arr, start, end) => {
        if( start > end ) { return null };
        const mid = Math.ceil((start + end)/2);
        return Node(arr[mid], buildTree(arr, start, mid - 1), buildTree(arr, mid + 1, end));
    }

    input = removeDuplicates(mergeSort(input));

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