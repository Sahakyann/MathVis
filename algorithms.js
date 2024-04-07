function* bubbleSort(arr) {
    var swapped = false;

    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length - i - 1; j++) {

            if (compare(arr, j, j + 1)) {
                swap(arr, j, j + 1);

                swapped = true;
            }
            yield;
        }
    }
    if (swapped == false) {
        return;
    }
}

function* selectionSort(arr) {
    for (let i = 0; i < arr.length - 1; i++) {
        let minIdx = i;
        for (let j = i + 1; j < arr.length; j++) {
            if (compare(arr, minIdx, j)) {
                minIdx = j;
            }
            yield;
        }

        swap(arr, i, minIdx);
        yield;
    }
}

function swap(arr, x, y) {
    arr[x].swap = true;
    arr[y].swap = true;

    temp = arr[x];
    arr[x] = arr[y];
    arr[y] = temp;
}
function compare(arr, x, y) {
    arr[x].compare = true;
    arr[y].compare = true;
    return arr[x].val > arr[y].val;
}


