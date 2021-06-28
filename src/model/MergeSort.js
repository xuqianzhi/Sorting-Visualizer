export function mergeSortAnimation(
    lst, 
    start, 
    end, 
    bar_change_animation) {
    /*   
    lst: is the entire whole array
    start & end: the segment of the array we are sorting
    bar_change_animation: keeps track all intermediate changes,
                            0th place is new index, 1st place is new height
    */

    if (start + 1 >= end) {
        return;
    }
    const mid = Math.floor((start + end) / 2);
    mergeSortAnimation(lst, start, mid, bar_change_animation);
    mergeSortAnimation(lst, mid, end, bar_change_animation);
    let i = start; //left half index
    let j = mid; //right half index
    let k = start; //result list index
    let result = lst.slice();
    while (i < mid || j < end) {
        let temp;
        if (i === mid) {
            while (k < end) {
                bar_change_animation.push([k, lst[j], j]);
                result[k] = lst[j];
                k += 1;
                j += 1;
            }
            break;
        }
        if (j === end) {
            while (k < end) {
                bar_change_animation.push([k, lst[i], i]);
                result[k] = lst[i];
                k += 1;
                i += 1;
            }
            break;
        }
        const leftElem = lst[i];
        const rightElem = lst[j];
        temp = result[k];
        if (leftElem < rightElem) {
            bar_change_animation.push([k, leftElem, j]);
            result[k] = leftElem;
            i += 1;
        } else {
            bar_change_animation.push([k, rightElem, i]);
            result[k] = rightElem;
            j += 1;
        }
        k += 1;
    }
    for (let i = start; i < end; i++) {
        lst[i] = result[i];
    }
}