
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
    }  

    findMin(node){
        while(node.left !== null){
            node = node.left;
        }
        return node;
    }

    find(value){
        return this.findRec(this.root, value);
    }

    findRec(node,value){
        if(node === null || node.data === value){return node;}

        if(value < node.data){
            return this.findRec(node.left,value);
        }else if(value > node.data){
            return this.findRec(node.right,value);
        }
    }

    levelOrder(callback){
        if(!callback){return;}

        const queue = [];
        queue.push(this.root);

        while(queue.length > 0){
            const currentNode = queue.shift();
            if(callback){callback(currentNode);}
            if(currentNode.left !== null){queue.push(currentNode.left);}
            if(currentNode.right !== null){queue.push(currentNode.right);}
        }
    }

    inOrder(callback){
        if(!callback){return;}
        
        const inOrderRec = (node) => {
            if(node === null){return;}
            inOrderRec(node.left);
            callback(node);
            inOrderRec(node.right);
        };

        inOrderRec(this.root);
    }

    preOrder(callback){
        if(!callback){return;}

        const preOrderRec = (node) => {
            if(node === null){return;}
            callback(node);
            preOrderRec(node.left);
            preOrderRec(node.right);
        };

        preOrderRec(this.root);
    }

    postOrder(callback){
        if(!callback){return;}

        const postOrderRec = (node) => {
            if(node === null){return;}
            postOrderRec(node.left);
            postOrderRec(node.right);
            callback(node);
        };

        postOrderRec(this.root);
    }

    height(value){
        if(value === null){return -1;}
        const leftHeight = this.height(value.left);
        const rightHeight = this.height(value.right);
        return Math.max(leftHeight, rightHeight) + 1;
    }

    


    depth(value){
        return this.depthRec(this.root, value, 0);
    }
    depthRec(node, value, depth){
        if(node === null){return -1;}

        if(value < node.data){
            return this.depthRec(node.left, value, depth + 1);
        }else if(value > node.data){
            return this.depthRec(node.right, value, depth + 1);
        }else{
            return depth;
        }
    }

    isBalanced(){
        return this.isBalancedRec(this.root);
    }
    isBalancedRec(node){
        if(node === null){return true;}

        const leftHeight = this.height(node.left);
        if(leftHeight === -1){return -1;}
        const rightHeight = this.height(node.right);
        if(rightHeight === -1){return -1;}

        if(Math.abs(leftHeight - rightHeight) > 1){return false;}

        return this.isBalancedRec(node.left) && this.isBalancedRec(node.right);
    }

    reBalance(){
        if(this.isBalanced()){return;}

        const sortedArray = [];
        this.inOrder((node) => sortedArray.push(node.data));
        this.root = this.buildTree(sortedArray);
    }

}
