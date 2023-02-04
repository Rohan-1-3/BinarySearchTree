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

    remove(data, currentNode = this.root){
        if(currentNode === null) return currentNode;

        if (currentNode.data < data) {
            currentNode.right = this.remove(data, currentNode.right);
        } else {
            currentNode.left = this.remove(data, currentNode.left);
        }

        if(currentNode.data === data){
            if(currentNode.left===null && currentNode.right === null){
                return null;
            }
            if(currentNode.left === null){
                return currentNode.right;
            }
            if(currentNode.right === null){
                return currentNode.left;
            }
            currentNode.data =  this.minValue(currentNode.right);

            currentNode.right = this.remove(currentNode.data, currentNode.right);
        }

        return currentNode;
    }

    minValue(node){
        if(node.left === null) return node.data;
        
        node = this.minValue(node.left);

        return node;
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

// const randomArray = (size) => Array.from({ length: size }, () => Math.floor(Math.random() * 100))
// console.log(randomArray(30));
const binaryTree = new Tree();
const sortedArray = binaryTree.sort([68, 36, 80, 90, 34, 59, 50, 2, 71, 65, 18, 23, 76, 38, 68, 47, 61, 57, 62, 24, 1, 83, 41, 60, 89, 28, 34, 9, 94, 18]);
binaryTree.buildTree(sortedArray);

binaryTree.prettyPrint();
binaryTree.insert(69);
// binaryTree.insert(68);
// binaryTree.insert(20);
// binaryTree.insert(6346);
// binaryTree.insert(6350);
// binaryTree.prettyPrint();
binaryTree.remove(28);
binaryTree.prettyPrint();