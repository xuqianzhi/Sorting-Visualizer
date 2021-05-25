export function heapSortAnimation(
    lst, 
    bar_change_animation) {
    /*   
    lst: is the entire whole array
    start & end: the segment of the array we are sorting
    bar_change_animation: keeps track all intermediate changes,
                            0th place is new index, 1st place is new height
    */
   var heap = new MinHeap();
   for (let i = 0; i < lst.length; i++) {
        bar_change_animation.push([i, lst[i]]);
        heap.insert(lst[i]);
   }
    for (let i = 0; i < lst.length; i++) {
        const min_val = heap.extractMin();
        lst[i] = min_val;
        bar_change_animation.push([i, min_val]);
    }       
}


function MinHeap() {
    this.data = [];
  }
  
  MinHeap.prototype.insert = function(val) {
    this.data.push(val);
    this.bubbleUp(this.data.length-1);
  };
  
  MinHeap.prototype.bubbleUp = function(index) {
    while (index > 0) {
      // get the parent
      var parent = Math.floor((index + 1) / 2) - 1;
      
      // if parent is greater than child
      if (this.data[parent] > this.data[index]) {
        // swap
        var temp = this.data[parent];
        this.data[parent] = this.data[index];
        this.data[index] = temp;
      }
      
      index = parent;
    }
  };
  
  MinHeap.prototype.extractMin = function() {
    var min = this.data[0];
    
    // set first element to last element
    this.data[0] = this.data.pop();
    
    // call bubble down
    this.bubbleDown(0);
    
    return min;
  };
  
  MinHeap.prototype.bubbleDown = function(index) {
    while (true) {
      var child = (index+1)*2;
      var sibling = child - 1;
      var toSwap = null;
      
      // if current is greater than child
      if (this.data[index] > this.data[child]) {
        toSwap = child;
      }
      
      // if sibling is smaller than child, but also smaller than current
      if (this.data[index] > this.data[sibling] && (this.data[child] == null || (this.data[child] !== null && this.data[sibling] < this.data[child]))) {
          toSwap = sibling;
      }
      
      // if we don't need to swap, then break.
      if (toSwap == null) {
        break;
      }
      
      var temp = this.data[toSwap];
      this.data[toSwap] = this.data[index];
      this.data[index] = temp;
      
      index = toSwap;
    }

    MinHeap.prototype.clear = function() {
        this.data = [];
    }
  };
  