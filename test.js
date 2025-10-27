const arr = [2, 1, 6, 9, 3]


const analyze = (root) => (item) => {
  let current = root

  if (item < current.val) {
    if (current.left) {
      analyze(current.left)(item)
    } else {
      current.left = {
        val: item,
        left: null,
        right: null,
      }
    }
  } else {
    if (current.right) {
      analyze(current.right)(item)
    } else {
      current.right = {
        val: item,
        left: null,
        right: null,
      }
    }
  }

  return root

}

const fn = (arr) => {

    const root = {
      val: arr[0],
      left: null,
      right: null,
    };
    
    arr.forEach(el => {
      if (el) {
        analyze(root)(el)}
    })

    console.log(root);

}

fn(arr);