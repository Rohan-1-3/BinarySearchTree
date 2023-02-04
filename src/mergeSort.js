const merge = (firstHalf, secondHalf)=>{
    const mergedArray = [];

    let i=0;
    let j=0;
    while(i < firstHalf.length && j < secondHalf.length){
        (firstHalf[i] < secondHalf[j]) ? mergedArray.push(firstHalf[i++]) 
        : mergedArray.push(secondHalf[j++])
    }
    while(i < firstHalf.length){
        mergedArray.push(firstHalf[i]);
        i+=1;
    }

    while(j < secondHalf.length){
        mergedArray.push(secondHalf[j]);
        j+=1;
    }

    // console.log(mergedArray);
    return mergedArray;

}

const mergeSort = (someArray)=>{
    if(someArray.length === 0) return false;
    if(someArray.length === 1) return someArray;

    const mid = Math.round(someArray.length/2);
    const firstHalf = someArray.slice(0, mid)
    const secondHalf = someArray.slice(mid);

    return merge(mergeSort(firstHalf), mergeSort(secondHalf));
}

export default mergeSort