const starImg = document.querySelector("img")
const button = document.querySelector("button")
button.addEventListener ("click", (event) => {
  const img = event.target.getAttribute("data-src");
  event.target.setAttribute("src",starz.webp );
  
});


// Const for stars 
const STAR_COLOR = '#fff'; // Color of the stars
const STAR_SIZE = 3; // size of the stars
const STAR_MIN_SCALE = 0.2; // how far they appear
const OVERFLOW_THRESHOLD = 50; // threshold/recycling/stars outside 
const STAR_COUNT = (window.innerWidth + window.innerHeight) / 8; // how much total

// canvas/context setup
const canvas = document.getElementById('starfield'), //canvas element
      context = canvas.getContext('2d'); //drawing context for the canvas

// canvas dimensions and star  with data
let scale = 1; // device ratio
let width, height; // canvas dimensions
let stars = []; // array to hold star objects

// pointer position 
let pointerX = null, pointerY = null; // mouse/touch pointer positions
let velocity = { x: 0, y: 0, tx: 0, ty: 0, z: 0.005 }; // target 
let touchInput = false; // to see if it tru or false 

// initialize stars & set up canvas
generateStars(); // create stars
resizeCanvas(); // size
animateStars(); //  animation loop

// the event listeners
window.onresize = resizeCanvas; // window resize
canvas.onmousemove = onMouseMove;   //mouse movement
canvas.ontouchmove = onTouchMove; // touch movement
canvas.ontouchend = onMouseLeave; // touch/end
document.onmouseleave = onMouseLeave; // handle mouse leaving the document

// function to generate the stars
function generateStars() {
    stars = []; // Clear stars
    for (let i = 0; i < STAR_COUNT; i++) {
        // Add a new star with random position and scale
        stars.push({
            x: Math.random() * width,
            y: Math.random() * height,
            z: STAR_MIN_SCALE + Math.random() * (1 - STAR_MIN_SCALE)
        });
    }
    
  }
// function to resize the canvas
function resizeCanvas() {
    scale = window.devicePixelRatio || 1; // get device pixel ratio
    width = window.innerWidth * scale; // set canvas width
    height = window.innerHeight * scale; // Set canvas height

    canvas.width = width;
    canvas.height = height;

    generateStars(); // regenerate stars for the new dimensions
}

//  animation the loop
function animateStars() {
    context.clearRect(0, 0, width, height); // clear the canvas for the next frame
    updateStars(); // update star positions
    renderStars(); // put stars onto the canvas
    requestAnimationFrame(animateStars); // get the next frame
}

//  position and velocity of each star
function updateStars() {
    // Gradually reduce target velocity to simulate friction
    velocity.tx *= 0.96;
    velocity.ty *= 0.96;

    // Smoothly adjust velocity towards the target
    velocity.x += (velocity.tx - velocity.x) * 0.8;
    velocity.y += (velocity.ty - velocity.y) * 0.8;

    // update each star's position
    stars.forEach((star) => {
        // Move the star based on velocity and its scale
        star.x += velocity.x * star.z;
        star.y += velocity.y * star.z;

        // pulling stars toward the center
        star.x += (star.x - width / 2) * velocity.z * star.z;
        star.y += (star.y - height / 2) * velocity.z * star.z;

        // slightly to simulate depth movement
        star.z += velocity.z;

        // recycle stars that move out of bounds
        if (
            star.x < -OVERFLOW_THRESHOLD ||
            star.x > width + OVERFLOW_THRESHOLD ||
            star.y < -OVERFLOW_THRESHOLD ||
            star.y > height + OVERFLOW_THRESHOLD
        ) {
            recycleStar(star); // reset the star's position and scale
        }
    });
}

// drawing each star on the canvas
function renderStars() {
    stars.forEach((star) => {
        context.beginPath(); // new path
        context.lineCap = 'round'; // make the ends of the lines rounded
        context.lineWidth = STAR_SIZE * star.z * scale; // set the line width based on star scale
        context.globalAlpha = 0.7; // set the transparency of the trail
        context.strokeStyle = STAR_COLOR; // set the star color

        context.moveTo(star.x, star.y); // Start the trail at the star's position

        // calculate the  length
        const tailX = velocity.x * 2; //  trail length
        const tailY = velocity.y * 2; //  trail length

        context.lineTo(star.x + tailX, star.y + tailY); // Draw the trail
        context.stroke(); //take control of the line
    });
}

// recycle a star that has moved out of bounds
function recycleStar(star) {
    star.z = STAR_MIN_SCALE + Math.random() * (1 - STAR_MIN_SCALE); // Reset scale
    star.x = Math.random() * width; // reset horizontal position
    star.y = Math.random() * height; // reset vertical position
}

// handle mouse movement
function onMouseMove(event) {
    touchInput = false; // Indicate input is from a mouse
    movePointer(event.clientX, event.clientY); // Update pointer position
}

// handle touch movement
function onTouchMove(event) {
    touchInput = true; // Indicate input is from touch
    movePointer(event.touches[0].clientX, event.touches[0].clientY); // Update pointer position
    event.preventDefault(); // Prevent default touch behavior
}

// handle mouse or touch leaving the canvas
function onMouseLeave() {
    pointerX = null; // clear pointer X position
    pointerY = null; // clear pointer Y position
}

// update pointer position and adjust target velocity
function movePointer(x, y) {
    if (pointerX !== null && pointerY !== null) {
        // Calculate/change in position
        const ox = x - pointerX;
        const oy = y - pointerY;

        //  target velocity based on movement
        velocity.tx += (ox / 8) * (touchInput ? 1 : -1);
        velocity.ty += (oy / 8) * (touchInput ? 1 : -1);
    }
    pointerX = x; // set new pointer X position
    pointerY = y; // set new pointer Y position

    
    }

