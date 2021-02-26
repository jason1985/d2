//Recipes for upgrading runes
//C = chipped
//FD = flawed
//FS = flawless
//first element is sorted alhpabetically or it wont match cube transmit array
const recipes = [
  ['ElElEl', 'Eld'],
  ['EldEldEld', 'Tir'],
  ['TirTirTir', 'Nef'],
  ['NefNefNef', 'Eth'],
  ['EthEthEth', 'Ith'],
  ['IthIthIth', 'Tal'],
  ['TalTalTal', 'Ral'],
  ['RalRalRal', 'Ort'],
  ['OrtOrtOrt', 'Thul'],
  ['CTopazThulThulThul', 'Amn'],
  ['AmnAmnAmnCAmethyst', 'Sol'],
  ['CSapphireSolSolSol', 'Shael'],
  ['CRubyShaelShaelShael', 'Dol'],
  ['CEmeraldDolDolDol', 'Hel'],
  ['CDiamondHelHelHel', 'Io'],
  ['oFDTopazIoIoI', 'Lum'],
  ['FDAmethystLumLumLum', 'Ko'],
  ['FDSapphireKoKoKo', 'Fal'],
  ['FalFalFalFDRuby', 'Lem'],
  ['FDEmeraldLemLemLem', 'Pul'],
  ['FDDiamondPulPul', 'Um'],
  ['TopazUmUm', 'Mal'],
  ['AmethystMalMal', 'Ist'],
  ['IstIstSapphire', 'Gul'],
  ['GulGulRuby', 'Vex'],
  ['EmeraldVexVex', 'Ohm'],
  ['DiamondOhmOhm', 'Lo'],
  ['FSTopazLoLo', 'Sur'],
  ['FSAmethystSurSur', 'Ber'],
  ['BerBerFSSapphire', 'Jah'],
  ['FSRubyJahJah', 'Cham'],
  ['ChamChamFSEmerald', 'Zod'],
]

///////////////////drag & drop functionality

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

///////////// end of drag & drop ////////////////////

//different types of possible audio
//skull, gem, rune, transmute, cube sound
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
      if (recipe[0].toLowerCase() === searchRecipe) {
        //found the recipe
        let rune = recipe[1] // get the rune result
        //clear out the cube
        clearItems()
        //adding result of recipe
        console.log(rune)
        addItem(rune, 0, 'cube')
        // cubeSquares.item(0).appendChild(rune)
      }
    })
  }
}

//clears out cube & inventory (rename stashSquare to Inventory square)
function clearItems() {
  let cubeSquares = document.getElementsByClassName('cubeSquare')
  let stashSquares = document.getElementsByClassName('stashSquare')

  for (const element of cubeSquares) {
    if (element.hasChildNodes()) {
      element.removeChild(element.firstChild)
    }
  }

  for (const element of stashSquares) {
    if (element.hasChildNodes()) {
      element.removeChild(element.firstChild)
    }
  }
}
/* <img class="um" id="drag1" src="./runes/um.png" draggable="true" ondragstart="drag(event)"> */

// also add position to place items
function addItem(name, id, place) {
  name = name.toLowerCase()
  console.log(name, '<<check if lowercase')
  let src = `./runes/${name}.png`
  let img = document.createElement('img')
  img.src = src
  img.className = name
  img.id = `drag${id}`
  img.draggable = 'true'
  img.ondragstart = drag
  if (place === 'stash') {
    let stashSquares = document.getElementsByClassName('stashSquare')
    stashSquares.item(id).appendChild(img)
  } else if (place === 'cube') {
    let cubeSquares = document.getElementsByClassName('cubeSquare')
    cubeSquares.item(id).appendChild(img)
  }
}

//make runes folder include gems too maybe rename to runesandgems?
//add Ingredients for given recipe number from recipeList array
function addIngr(num) {
  let ingr = recipeList[num][0]

  //clear out cube & stash
  clearItems()
  //using index named id to server as id (only 4 runes/ids possible at a time in stash & cube area)
  ingr.forEach((ingredient, id) => {
    addItem(ingredient, id, 'stash')
  })
}

let recipeList = [
  [['El', 'El', 'El'], ['Eld']],
  [['Eld', 'Eld', 'Eld'], ['Tir']],
  [['Tir', 'Tir', 'Tir'], ['Nef']],
]

// ['NefNefNef', 'Eth'],
// ['EthEthEth', 'Ith'],
// ['IthIthIth', 'Tal'],
// ['TalTalTal', 'Ral'],
// ['RalRalRal', 'Ort'],
// ['OrtOrtOrt', 'Thul'],
// ['CTopazThulThulThul', 'Amn'],
// ['AmnAmnAmnCAmethyst', 'Sol'],
// ['CSapphireSolSolSol', 'Shael'],
// ['CRubyShaelShaelShael', 'Dol'],
// ['CEmeraldDolDolDol', 'Hel'],
// ['CDiamondHelHelHel', 'Io'],
// ['oFDTopazIoIoI', 'Lum'],
// ['FDAmethystLumLumLum', 'Ko'],
// ['FDSapphireKoKoKo', 'Fal'],
// ['FalFalFalFDRuby', 'Lem'],
// ['FDEmeraldLemLemLem', 'Pul'],
// ['FDDiamondPulPul', 'Um'],
// ['TopazUmUm', 'Mal'],
// ['AmethystMalMal', 'Ist'],
// ['IstIstSapphire', 'Gul'],
// ['GulGulRuby', 'Vex'],
// ['EmeraldVexVex', 'Ohm'],
// ['DiamondOhmOhm', 'Lo'],
// ['FSTopazLoLo', 'Sur'],
// ['FSAmethystSurSur', 'Ber'],
// ['BerBerFSSapphire', 'Jah'],
// ['FSRubyJahJah', 'Cham'],
// ['ChamChamFSEmerald', 'Zod'],
