// Hannah Soria
// ATLS 5660
// 3D
// 10/27/25

//intent: I wanted to create an interactive pop art filter using the webcam that resembled famous popart like andy warhol or comic style art.
//success: I successfully made an interactive filter. I learned how to use the createCapture, sliders, and manipulate colors dynamically 
//failure: I don't think the colors are super recogizably popart because they aren't super bright. They also don't take as defined sections like the paintings but this was a big obstable since I was dealing with the brightness of a pixel not the direct color of the pixel. I would've liked to play around with manipulated the colors based off the color of the pixel, but then it would become difficult to group the color sections I imagine.

//references: p5.js notation, inspiration from: https://www.youtube.com/watch?v=hHZcIMppkFc&t=235s

// bool to control the intro page vs the main page
let pressed = false;

// video obj
let video;

// dimension vars
let w = 90;
let h = 72; 
let scl = 8;

// sliders
let sliderR;
let sliderG;
let sliderB;

// colors
let r, g, b;

// setup the canvas according the the number of circles and their scale
function setup(){
  createCanvas(w*scl, h*scl);
  video = createCapture(VIDEO);
  video.size(w,h);
  
  // load Andy Warhol Marilyn Monroe Image
  img = loadImage('popart.jpg');
  
  // hide the video display so it can be redrawn in the canvas
  video.hide();
  
  // place the sliders in the top left
  sliderR = createSlider(0, 255, 0);
  sliderR.position(40,20);
  sliderG = createSlider(0, 255, 0);
  sliderG.position(40,40);
  sliderB = createSlider(0, 255, 0);
  sliderB.position(40,60);
  
  // hide the sliders until the mouse is pressed
  sliderR.hide();
  sliderG.hide();
  sliderB.hide();
}

// draw landing page and the webcam feed in corresponding colors to create a popart filter
function draw(){
  
  // if mouse is pressed change to the main page
  if (pressed){
    background('black');
    popart();
    
    // until mouse pressed stay on intro page
  } else {
    
    // instructions
    background(252, 28, 129);
    textFont('Boldonse');
    fill('black');
    textSize(50);
    text('Click the screen to\n   turn yourself into\n popart! Change the', 70, 100);
    text('R,G,B value\n   using the\n     sliders.', 350, 300);
    image(img,50, 255);
  }

// redraw the camera view in popart colors with the option to adjust the r, g, b
function popart(){
  
  // set the values of the slider to the corresponding r, g, b
  r = sliderR.value();
  g = sliderG.value();
  b = sliderB.value();
  
  // for each 10 x 10 pixels in the canvas
  for (let i = 0; i < video.width; i ++) {
    for (let j = 0; j < video.height; j++) {
      
      // get the current coordinate
      let curr = video.get(i, j);
      
      // get the brightness of the current coordinate
      let pointColor = brightness(curr);
      
      // if the val is under 25
      if (pointColor < 25){
        
        // set fill to pink
        
        fill(r + 200, g, b + 100);
        
        // if the val is 25 - 49
      } else if (pointColor >= 25 && pointColor < 50){
        
        // set the fill to blue
        fill(r, g + 100, b + 225);
        
        //if the val is 50 - 74
      } else if (pointColor >=50 && pointColor < 75){
        
        // set the fill to orange
        fill(r + 200, g + 50, b);
        
        // if the val is over 74
      } else{
        
        // set the fill to yellow
        fill(r + 200, g + 200, b)
      }
      
      // draw the circle
      circle( i * scl + 5, j * scl + 5, scl);
    }
  }
  
  // rectangle for the sliders
  fill(200);
  rect(10, 10, 174, 78);
  
  // test for the sliders
  textSize(10);
  fill('black');
  text("R", 25, 35);
  text("G", 25, 55);
  text("B", 25, 75);
  }
}

function mousePressed(){
  pressed = true;
  
  // show the sliders
  sliderR.show();
  sliderG.show();
  sliderB.show();
  
}