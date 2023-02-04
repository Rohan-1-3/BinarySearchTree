/* eslint-disable no-param-reassign */
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
        if (currentNode === null) return new Node(data);// creates new node at the end
        if (currentNode.data === data) return false;// no dupes
    
        if (currentNode.data < data) {// newData greater than current nodeData then node changes to node's right side
          currentNode.right = this.insert(data, currentNode.right);
        } else {
          currentNode.left = this.insert(data, currentNode.left);
        }
        return currentNode;
    }

    remove(data, currentNode = this.root){
        if(currentNode === null) return currentNode;

        if (currentNode.data < data) {// comparing the removed data in the tree and finding its position
            currentNode.right = this.remove(data, currentNode.right);
        } else {
            currentNode.left = this.remove(data, currentNode.left);
        }

        if(currentNode.data === data){// data mathces in tree
            if(currentNode.left===null && currentNode.right === null){
                return null;// removes the leaf of the tree
            }
            if(currentNode.left === null){// if has one child makes the child the parent
                return currentNode.right;
            }
            if(currentNode.right === null){
                return currentNode.left;
            }
            // function for a parent having both children
            currentNode.data =  this.minValue(currentNode.right);// changes the removed nodeData to the next biggest number
            // removing the sucessor after replacement
            currentNode.right = this.remove(currentNode.data, currentNode.right);
        }

        return currentNode;
    }

    minValue(node){// returns the least value when a removed node has both side
        if(node.left === null) return node.data;
        
        node = this.minValue(node.left);

        return node;
    }
    
    levelOrder(){
        const queue = [this.root];
        const levelOrderList = [];
        // console.log(queue)
        while(queue.length>0){
            const currentNode = queue.shift();
            levelOrderList.push(currentNode.data)
            // console.log(currentNode.data);

            const enqueueList = [
                currentNode.left,
                currentNode.right
            ].filter((value) => value);
            // console.log(enqueueList);
            queue.push(...enqueueList);
        }
        return levelOrderList;
    }

    preOrder(node = this.root){// display depth 1st
        if (node === null) return;
        console.log(`${node.data}`);
        this.preOrder(node.left);
        this.preOrder(node.right);
    }
    
    inOrder(node = this.root){// display depth 1st
        if (node === null) return;
        this.inOrder(node.left);
        console.log(`${node.data}`);
        this.inOrder(node.right);
    }
    
    postOrder(node = this.root){// display depth 1st
        if (node === null) return;
        this.postOrder(node.left);
        this.postOrder(node.right);
        console.log(`${node.data}`);
    }

    sort(arr){// removes dupes and then sorts the array
        const noDuplicates = [...new Set(arr)];
        const sortedArray = mergeSort(noDuplicates);
        return sortedArray;
    }

    find(data,  currentNode = this.root){
        if(currentNode === null) return currentNode;
        if(currentNode.data === data) return console.log(currentNode);

        if (currentNode.data < data) {// comparing the received data in the tree and finding its node
            currentNode.right = this.find(data, currentNode.right);
        } else {
            currentNode.left = this.find(data, currentNode.left);
        }
        return currentNode;
    }

    findHeight(node = this.root){
        if(node === null) return -1;
        return Math.max(this.findHeight(node.left),this.findHeight(node.right))+1;
    }

    findDepth(node = this.root){
    if (node === null) return 0;
    return Math.max(this.findDepth(node.left), this.findDepth(node.right))+1;
    }

    isBalanced(leftNode = this.root.left, rightNode = this.root.right){
        if((this.findHeight(leftNode) - this.findHeight(rightNode))<=1) return true;
        return this.reBalance();
    }

    reBalance(){
        const newArray = this.levelOrder();
        const newSortedArray = this.sort(newArray);
        this.buildTree(newSortedArray);
    }
 
}

// const randomArray = (size) => Array.from({ length: size }, () => Math.floor(Math.random() * 100))
// console.log(randomArray(30));
const binaryTree = new Tree();
const sortedArray = binaryTree.sort([68, 36, 80, 90, 34, 59, 50, 2, 71, 65, 18, 23, 76, 38, 68, 47, 61, 57, 62, 24, 1, 83, 41, 60, 89, 28, 34, 9, 94, 18]);

binaryTree.buildTree(sortedArray);
binaryTree.prettyPrint();
binaryTree.insert(51);
binaryTree.insert(52);
binaryTree.insert(53);
binaryTree.insert(0);
// binaryTree.insert(6350);
console.log(binaryTree.isBalanced())
binaryTree.prettyPrint();
// binaryTree.remove(28);
// binaryTree.find(6346)
// console.log(binaryTree.levelOrder());
// binaryTree.inOrder(tree);
// binaryTree.postOrder();
console.log(binaryTree.findHeight())
console.log(binaryTree.findDepth())
console.log(binaryTree.isBalanced())
// binaryTree.reBalance();
// binaryTree.prettyPrint();
// 