console.log('linked')
// ====================== Game Flow ======================= //
// Clear the canvas => shrek alive? => render shrek, check for collision => render donkey
// ====================== Global DOM / Variables ======================= //
let movement = document.getElementById('movement')
let game = document.getElementById('game')
let score = document.getElementById('score')
let status = document.getElementById('status')
let shrek
let donkey
// ====================== SETUP FOR CANVAS RENDERING ======================= //
const ctx = game.getContext('2d')
game.setAttribute('height', getComputedStyle(game)['height'])
game.setAttribute('width', getComputedStyle(game)['width'])
// ====================== ENTITIES ======================= //
class Crawler {
    constructor(x, y, color, width, height) {
        this.x = x
        this.y =y
        this.color = color
        this.width = width
        this.height = height
        this.alive = true

        this.render = function() {
            ctx.fillStyle = this.color
            ctx.fillRect(this.x, this.y, this.width, this.height)
        }
    }
}
// ====================== HELPER FUNCTIONS ======================= //
//  KEYBOARD INTERACTION LOGIC
const movementHandler = (e) => {
    console.log(`movement: ${e.key}`)
    switch(e.key) {
        case 'ArrowUp':
            donkey.y > 0 ? donkey.y -= 10 : null
            break
        case 'ArrowDown':
            donkey.y < game.height - donkey.height ? donkey.y += 10 : null
            break
        case 'ArrowLeft':
            donkey.x > 0 ? donkey.x -= 10 : null
            break
        case 'ArrowRight':
            donkey.x < game.width - donkey.width ? donkey.x += 10 : null
            break
    }
    console.log(donkey)
}


function detectHit(p1, p2) {
    // console.log(p1.y + p1.height > p2.y);
    // console.log(p1.y < p2.y + p2.height);
    // console.log(p1.x + p1.width > p2.x);
    // console.log(p1.x < p2.x + p2.width);
  
    let hitTest =
      p1.y + p1.height > p2.y &&
      p1.y < p2.y + p2.height &&
      p1.x + p1.width > p2.x &&
      p1.x < p2.x + p2.width; // {boolean} : if all are true -> hit
  
    if (hitTest) {
      // add 100 points
      let newScore = Number(score.textContent) + 100;
      score.textContent = newScore;
      gameStatus.textContent = 'Shrek is outta here!!'
      return addNewShrek();
    } else {
      return false;
    }
  }
// ====================== GAME PROCESSES ======================= //
const gameLoop = () => {
    ctx.clearRect(0, 0, game.width, game.height)
    movement.textContent = `X: ${donkey.x}\nY: ${donkey.y}`
    shrek.alive ? shrek.render() : hit = detectHit(donkey, shrek)
    donkey.render()
    detectHit(donkey, shrek)
}
// ====================== PAINT INITIAL SCREEN ======================= //
// EVENT LISTENERS
window.addEventListener('DOMContentLoaded', function(e) {
    donkey = new Crawler(10, 20, '#00ff00', 20, 20)
    shrek = new Crawler(100, 100, '#ff0000', 40, 80)
    const runGame = this.setInterval(gameLoop, 120)
})
document.addEventListener('keydown', movementHandler)
