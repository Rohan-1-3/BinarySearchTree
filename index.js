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
        const node = new Node(arr[mid]);
        node.left = this.buildTree(arr, start, mid - 1);
        node.right = this.buildTree(arr, mid + 1, end);
        this.root = node;
        return node;
    }

    prettyPrint(node = this.root, prefix = "", isLeft = true){// visual representation of thr binary tree
        if (node.right !== null) {
          this.prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
        }
        console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
        if (node.left !== null) {
          this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
        }
    }

    insert(data, currentNode = this.root) {
        if (currentNode === null) return new Node(data);
        if (currentNode.data === data) return false;
    
        if (currentNode.data < data) {
          currentNode.right = this.insert(data, currentNode.right);
        } else {
          currentNode.left = this.insert(data, currentNode.left);
        }
        return currentNode;
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
const sortedArray = binaryTree.sort([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
binaryTree.buildTree(sortedArray);

binaryTree.prettyPrint();
binaryTree.insert(69);
binaryTree.insert(20);
binaryTree.prettyPrint();