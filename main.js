const recipes = [
  ['berberber', 'jah'],
  ['jahjahjah', 'um'],
]

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
  //transmute animation
  document.getElementById('transmute').style.transform = 'scale(.95)'
  setTimeout(() => {
    document.getElementById('transmute').style.transform = 'scale(1)'
  }, 150)

  //getting cubeSquares HTMLCollection
  let cubeSquares = document.getElementsByClassName('cubeSquare')

  let transmutedRunes = []
  for (const element of cubeSquares) {
    if (element.hasChildNodes()) {
      console.log(element.firstChild.className)
      transmutedRunes.push(element.firstChild.className)
    }
  }
  console.log(transmutedRunes)

  if (transmutedRunes.length > 2 && transmutedRunes.length < 5) {
    // all recipes require 3-4 runes/gems
    //check if combination of runes exists in recipe list
    let searchRecipe = transmutedRunes.sort().join('')
    recipes.forEach((recipe) => {
      if (recipe[0] === searchRecipe) {
        //found the recipe
        let rune = document.getElementsByClassName(recipe[1])[0] // get the rune result
        //clear out the cube
        for (const element of cubeSquares) {
          if (element.hasChildNodes()) {
            element.removeChild(element.firstChild)
          }
        }
        //adding result of recipe
        cubeSquares.item(0).appendChild(rune)
      }
    })
  }
}
