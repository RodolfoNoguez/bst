
class Node{
    constructor(value){
        this.value = value;
        this.right = null;
        this.left = null;
    }
}


class Tree{
    constructor(){
        this.root = null;
        this.sortedArray = [...new Set(array)].sort((a, b) => a - b);
    }

    buildTree(sortedArray){
        if (sortedArray.length === 0){return null;}

        const mid = Math.floor(sortedArray.length / 2);
        const newNode = new Node(sortedArray[mid]);

        firstHalf = sortedArray.slice(0, mid);
        secondHalf = sortedArray.slice(mid + 1);

        newNode.prev = this.buildTree(firstHalf);
        newNode.next = this.buildTree(secondHalf);

        return newNode;
    }

    insert(value){
        this.root = this.insertRec(this.root,value);
    }

    insertRec(node, value){
        if(node === null){return new Node(value);}

        if(value < node.data){
            node.left = this.insertRec(node.left, value);
        }else if(value > node.data){
            node.right = this.insertRec(node.right, value);
        }
        return node;
    }


    deleteItem(value){this.root = this.deleteRec(this.root, value);}

    deleteRec(node, value){
        if(node === null){return null;}

        if(value < node.data){
            node.left = this.deleteRec(node.left, value);
        }else if (value > node.data){
            node.right = this.deleteRec(node.right, value);
        }else{
            if(node.left === null){return node.right;}
            if(node.right === null){return node.left;}
            else{
                const minNode = this.findMin(node.right);
                node.data = minNode.data;
                node.right = this.deleteRec(node.right, minNode.data);
            }
    }

    findMin(node){
        while(node.left !== null){
            node = node.left;
        }
        return node;
    }

    find(value){

    }


}
