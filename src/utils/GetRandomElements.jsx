const getRandomElements = (arr, num) => {
  let selectIndexes = []
  let randomSelection = []
  
  while (selectIndexes.length < num) {
    let rand = Math.floor((arr.length)*Math.random())
    if (!selectIndexes.includes(rand)) {selectIndexes.push(rand)}
  }
  for (let i=0; i< num; i++) {
    randomSelection.push(arr[selectIndexes[i]])
  }
  return (randomSelection)
}

export default getRandomElements;
