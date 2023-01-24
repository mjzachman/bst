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

const process = (arr) => {
    return removeDuplicates(mergeSort(arr));
}

export { process };