//drag & drop functionality

function allowDrop(ev) {
  if (ev.target.childNodes.length == 0) {
    ev.preventDefault()
  }
}

function drag(ev) {
  ev.dataTransfer.setData('text', ev.target.id)
}

function drop(ev) {
  // prevents dragging ontop of other runes
  // checking if target id includes 'drag' which means it has a draggable element inside
  // which means we cant drag something else ontop of it
  if (!ev.target.id.includes('drag')) {
    var data = ev.dataTransfer.getData('text')
    ev.target.appendChild(document.getElementById(data))
    playSound('Recording.m4a')
  }
}

//different types of possible audio
//skull, gem, rune, transmute

function playSound(url) {
  const audio = new Audio(url)
  audio.play()
}

// ladder & non-ladder -> specify which recipes work
//check if there's correct # of items
//if > 4 or < 3 wrong recipe
//check for 3 & 4 item recipes
//if matched place new item in propper square (top left)
function transmute() {
  let cubeSquares = document.getElementsByClassName('cubeSquare')
  for (const element of cubeSquares) {
    if (element.hasChildNodes()) {
      console.log(element.childNodes[0].id)
    }
    // console.log(element)
  }
  //   console.log(cubeSquares)
}
