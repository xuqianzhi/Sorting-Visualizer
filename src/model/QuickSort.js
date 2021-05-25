export function quickSortAnimation(
    lst, 
    start, 
    end, 
    bar_change_animation) {
    /*
    This function pick the median of start and end index as the pivot   
    lst: is the entire whole array
    start & end: the segment of the array we are sorting
    bar_change_animation: keeps track all intermediate changes,
                            0th: new index, 1st: new height, 2nd: pivot index
    */
   if (start + 1 >= end) {
       return;
   }
   const pivot_index = randomIntFromInterval(start, end - 1);
   //    const mid = Math.floor((start + end) / 2);

   const pivot_val = lst[pivot_index];
   let leftHalf = [];
   let rightHalf = [];
   for (let i = start; i < end; i++) {
       if (i == pivot_index) {continue}
       const curr_val = lst[i];
       curr_val <= pivot_val ? leftHalf.push(curr_val) : rightHalf.push(curr_val);
   }
   const new_pivot_index = leftHalf.length + start;
   leftHalf.push(pivot_val);
   const overall_list = leftHalf.concat(rightHalf);
   for (let i = start; i < end; i++) {
        lst[i] = overall_list[i - start];
        bar_change_animation.push([i, lst[i], new_pivot_index]);
    }
   quickSortAnimation(lst, start, new_pivot_index, bar_change_animation);
   quickSortAnimation(lst, new_pivot_index + 1, end, bar_change_animation);
}

function randomIntFromInterval(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
}