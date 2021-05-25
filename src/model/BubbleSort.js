export function bubbleSortAnimation(
    lst, 
    bar_change_animation) {
    /*   
    lst: is the entire whole array
    bar_change_animation: keeps track all intermediate changes,
                            0th place is new index, 1st place is new height
    */
   if (lst.length <= 1) {
       return;
   }
   while (true) {
       var somethingSwapped = false;
       for (let i = 0; i < lst.length - 1; i++) {
           const firstElem = lst[i];
           const secondElem = lst[i + 1];
           if (firstElem > secondElem) {
               lst[i] = secondElem;
               lst[i + 1] = firstElem;
               somethingSwapped = true;
               bar_change_animation.push([i, secondElem]);
               bar_change_animation.push([i + 1, firstElem]);
           }
       }
       if (!somethingSwapped) {
           break;
       }
   }
}