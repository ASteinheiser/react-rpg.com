// determines if an array is inside another array
export default function arrContainArr(arr, item) {

  const item_as_string = JSON.stringify(item);

  const contains = arr.some(ele => {
    return JSON.stringify(ele) === item_as_string;
  });

  return contains;
}