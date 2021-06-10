const canvas = document.getElementById("canvas");

canvas.width = 800;
canvas.height = window.innerHeight/2;

const c = canvas.getContext('2d');

const increaseBtn = document.getElementById("increase")
const decreaseBtn = document.getElementById("decrease")
const sizeEl = document.getElementById("size")
const colorEl = document.getElementById("color")
const clearEl = document.getElementById("clear")


let size = 10;
let isPressed = false // keep track of whether the mouse is down 
let colour = "#277da1" // initial colour
// init the position of the movement 
let xStart;
let yStart;

// while mouse is down, keep state of x and y of the current mouse position
canvas.addEventListener('mousedown', e => {
  isPressed = true;
  xStart = e.offsetX; // the current x position of the mouse
  yStart = e.offsetY; // the current y position of the mouse 
})

canvas.addEventListener('mouseup', e => {
  isPressed = false;
  xStart = undefined;
  yStart = undefined;
})

// while we've moving the mouse while the mouse is down 
canvas.addEventListener('mousemove', e => {
  if (isPressed) {
    // get the current x and y position of the mouse 
    const xCurrent = e.offsetX;
    const yCurrent = e.offsetY;
    // we keep drawing circles at the current mouse position 
    drawCircle(xCurrent, yCurrent)
    // keep extending a line that starts from the mouse down x and y position 
    // and goes to the current x and y position 
    drawLine(xStart, yStart, xCurrent, yCurrent)
    xStart = xCurrent;
    yStart = yCurrent;
  }
})


/// draw a circle ///
function drawCircle(x, y) {
  c.beginPath()
  c.arc(x, y, size, 0, Math.PI*2, true)
  c.fillStyle = colour;
  c.fill()
}

/// draw a line ///
function drawLine(x1, y1, x2, y2) {
  c.beginPath()
  c.moveTo(x1, y1)
  c.lineTo(x2, y2)
  c.strokeStyle = colour;
  c.lineWidth = size*2
  c.stroke()
}

// update the brushstroke size displayed on the screen
function updateOnScreen() {
  sizeEl.innerText = size
}

// when we change the colour via the colour picker, set the colour to the selected one
colorEl.addEventListener('change', e => colour = e.target.value)

// increase button should increase the size by 5 on each click 
increaseBtn.addEventListener('click', e => {
  size += 5;
  // don't go higher than 50
  if (size > 50) {
    size = 50
  };
  updateOnScreen()
})

// decrease button should decrease the size by 5 on each click 
decreaseBtn.addEventListener('click', e => {
  size -= 5;
  // don't go lower than 5
  if (size < 5) {
    size = 5
  };
  updateOnScreen()
})

// clear the canvas when the x button is pressed 
clearEl.addEventListener('click', e => {
  c.clearRect(0, 0, canvas.width, canvas.height)
})