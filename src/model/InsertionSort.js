export function insertionSortAnimation(
    lst, 
    bar_change_animation) {
    /*   
    lst: is the entire whole array
    start & end: the segment of the array we are sorting
    bar_change_animation: keeps track all intermediate changes,
                            0th place is new index, 1st place is new height
    */
   for (let i = 1; i < lst.length; i++) {
       const inserting_elem = lst[i];
       var j = i - 1; // j will be the inserting position
       var temp_animations = [];
       while(j >= 0 && inserting_elem < lst[j]) {
           lst[j + 1] = lst[j];
           temp_animations.push([j + 1, lst[j]]);
           temp_animations.push([j, inserting_elem]);
           j -= 1;
       }
       for (let k = 0; k < temp_animations.length; k++) {
           var curr_animation = temp_animations[k];
           curr_animation.push([j + 1]);
           bar_change_animation.push(curr_animation);
       }
       lst[j + 1] = inserting_elem;
       bar_change_animation.push([j + 1, lst[j + 1], j + 1]);
   }
}