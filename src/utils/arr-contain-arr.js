// determines if an array is inside another array
export default function arrContainArr(arr, item) {

  const itemAsString = JSON.stringify(item);

  const contains = arr.some(ele => {
    return JSON.stringify(ele) === itemAsString;
  });

  return contains;
}