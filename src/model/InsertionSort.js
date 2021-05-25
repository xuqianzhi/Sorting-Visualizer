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
       const pivot = lst[i];
       var j = i - 1;
       while(j >= 0 && pivot < lst[j]) {
           lst[j + 1] = lst[j];
           bar_change_animation.push([j + 1, lst[j]]);
           j -= 1;
       }
       lst[j + 1] = pivot;
       bar_change_animation.push([j + 1, lst[j + 1]]);
   }
}


// def insertionSort(arr):
 
//     # Traverse through 1 to len(arr)
//     for i in range(1, len(arr)):
 
//         key = arr[i]
 
//         # Move elements of arr[0..i-1], that are
//         # greater than key, to one position ahead
//         # of their current position
//         j = i-1
//         while j >= 0 and key < arr[j] :
//                 arr[j + 1] = arr[j]
//                 j -= 1
//         arr[j + 1] = key
 