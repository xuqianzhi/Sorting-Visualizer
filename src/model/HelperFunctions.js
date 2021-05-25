export function randomIntFromInterval(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export function isArraySorted(lst) {
    let prev_val = Number.MIN_SAFE_INTEGER;
    for (let i = 0; i < lst.length; i++) {
        const curr_val = lst[i];
        if (curr_val < prev_val) {
            return false;
        }
        prev_val = curr_val;
    }
    return true;
}