/* eslint-disable class-methods-use-this */
import mergeSort from "./mergeSort";
import Node from "./node";

const Tree = class{
    constructor(){
        this.root = null;
    }

    buildTree(arr, start = 0 , end = arr.length-1){// creates and branches node and returns the main node
        if (start > end) return null;
    
        const mid = parseInt((start + end) / 2, 10);
        const node = new Node(arr[mid],this.buildTree(arr, start, mid - 1),
                            this.buildTree(arr, mid + 1, end));
        return node;
    }

    prettyPrint(node, prefix = "", isLeft = true){// visual representation of thr binary tree
        if (node.right !== null) {
          this.prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
        }
        console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
        if (node.left !== null) {
          this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
        }
    }
    
    preOrder(node){
        if (node == null) return;
        console.log(`${node.data}`);
        this.preOrder(node.left);
        this.preOrder(node.right);
    }
    
    inOrder(node){
        if (node == null) return;
        this.preOrder(node.left);
        console.log(`${node.data}`);
        this.preOrder(node.right);
    }
    
    postOrder(node){
        if (node == null) return;
        this.preOrder(node.left);
        this.preOrder(node.right);
        console.log(`${node.data}`);
    }

    sort(arr){
        const noDuplicates = [...new Set(arr)];
        const sortedArray = mergeSort(noDuplicates);
        return sortedArray;
    }
}

const binaryTree = new Tree();
const sortedArray = binaryTree.sort([1, 7, 4, 8, 4, 3, 5, 7, 9, 2, 6]);
const tree = binaryTree.buildTree(sortedArray);
binaryTree.prettyPrint(tree);
console.log(tree)
binaryTree.inOrder(tree)
