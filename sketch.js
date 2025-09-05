// constants for graphics

let colours = {
  ["background"] : "#FFEBCD",
  ["box"] : "#FFCE85",
  ["text"] : "#39393A",
  ["t"] : "#939393",
  ["shapes"] : ["#88CCEE", "#117733", "#332288", "#44AA99"],
};

let pad = 30;
let corner = 16;
let lineWeight = {
  ["tiny"] : 2,
  ["small"] : 3,
  ["medium"] : 4,
  ["large"] : 5,
  ["huge"] : 6,
};

let font = "Arial";
let textSize = {
  ["tiny"] : {
    ["title"] : 36,
    ["text"] : 20,
  },
  ["small"] : {
    ["title"] : 40,
    ["text"] : 24,
  },
  ["medium"] : {
    ["title"] : 46,
    ["text"] : 36,
  },
  ["large"] : {
    ["title"] : 56,
    ["text"] : 46,
  },
  ["huge"] : {
    ["title"] : 58,
    ["text"] : 36,
  }
};

var deviceSize;
var orient;


// click detection variables

let click = false;
let doubleClick = false;
let press = false;

// buttons

function createButton(x, y, r, callback, label) {

  let button = {}

  button.x = x;
  button.y = y;
  button.r = r;

  button.drawLabel = label;

  button.onClick = callback;

  return button;
}

let questionButton = createButton(() => {return pad + getR();}, () => {return pad + getR();}, getR, () => {screen = "help";}, drawQuestion);
let resetButton = createButton(() => {return windowWidth - pad - getR();}, () => {return pad + getR();}, getR, resetQuery, drawReset);
let flipButton = createButton(() => {return orient == "landscape" ? pad + getR() : windowWidth - pad - getR();}, () => {return windowHeight - pad - getR()}, getR, flip, drawFlip);
let rotateRButton = createButton(() => {return pad + getR();}, () => {return orient == "landscape" ? windowHeight - pad * 3 - getR() * 5 : windowHeight - pad - getR()}, getR, rotateClockwise, drawRotateR);
let rotateLButton = createButton(() => {return orient == "landscape" ? pad + getR() : windowWidth / 2;}, () => {return orient == "landscape" ? windowHeight - pad * 2 - getR() * 3 : windowHeight - pad - getR()}, getR, rotateAnticlockwise, drawRotateL);

let buttons = [questionButton, resetButton, flipButton, rotateRButton, rotateLButton];

let yesButton = createButton(() => {return (3 / 8) * windowWidth;}, () => {return windowHeight * 0.5 + pad + getR();}, getR, reset, drawYes);
let noButton = createButton(() => {return (5 / 8) * windowWidth;}, () => {return windowHeight * 0.5 + pad + getR();}, getR, () => {query = false; paused = false;}, drawNo);

let queryButtons = [yesButton, noButton];

function getR() {
  return textSize[deviceSize]["title"] - pad / 2;
}


function drawButtonPressed(btn, c) {

  c.fill(colours["box"]);
  c.noStroke();
  c.circle(btn.x(), btn.y(), btn.r() * 2);

}

function drawButton(btn, c) {

  c.noFill();
  c.strokeWeight(lineWeight[deviceSize]);
  c.stroke(colours["box"]);
  c.circle(btn.x(), btn.y(), btn.r() * 2);

}

function drawQuestion(btn, c) {

  c.stroke(colours["text"]);
  c.strokeWeight(lineWeight[deviceSize]);
  c.noFill();

  let x = btn.x();
  let y = btn.y();
  let r = btn.r();

  c.arc(x, y - r / 4, r * 0.75, r * 0.75, -PI, PI / 2);
  c.line(x, y + r / 8, x, y + (3 / 8) * r);
  c.circle(x, y + (5 / 8) * r, lineWeight[deviceSize] / 2);

}

function drawReset(btn, c) {

  c.stroke(colours["text"]);
  c.strokeWeight(lineWeight[deviceSize]);
  c.noFill();

  let x = btn.x();
  let y = btn.y();
  let r = btn.r();

  c.arc(x, y, r, r, -PI, PI / 2);
  c.triangle(x - (9 / 16) * r, y, x - (7 / 16) * r, y, x - r / 2, y + (1 / 16) * r);
}

function drawFlip(btn, c) {
  c.stroke(colours["text"]);
  c.strokeWeight(lineWeight[deviceSize]);
  c.noFill();

  let x = btn.x();
  let y = btn.y();
  let r = btn.r();

  c.line(x - r / 2, y - r / 4, x + r / 2, y - r / 4);
  c.line(x - r / 2, y + r / 4, x + r / 2, y + r / 4);

  c.triangle(x + r / 2, y - r / 4, x + (7 / 16) * r, y - (5 / 16) * r, x + (7 / 16) * r, y - (3 / 16) * r);
  c.triangle(x - r / 2, y + r / 4, x - (7 / 16) * r, y + (5 / 16) * r, x - (7 / 16) * r, y + (3 / 16) * r);
}

function drawRotateR(btn, c) {

  c.stroke(colours["text"]);
  c.strokeWeight(lineWeight[deviceSize]);
  c.noFill();

  let x = btn.x();
  let y = btn.y();
  let r = btn.r();

  c.arc(x, y, r, r, -PI, 0);
  c.triangle(x + (7 / 16) * r, y, x + (9 / 16) * r, y, x + r / 2, y + (1 / 16) * r);
}

function drawRotateL(btn, c) {

  c.stroke(colours["text"]);
  c.strokeWeight(lineWeight[deviceSize]);
  c.noFill();

  let x = btn.x();
  let y = btn.y();
  let r = btn.r();

  c.arc(x, y, r, r, -PI, 0);
  c.triangle(x - (7 / 16) * r, y, x - (9 / 16) * r, y, x - r / 2, y + (1 / 16) * r);
}

function drawYes(btn, c) {

  c.stroke(colours["text"]);
  c.strokeWeight(lineWeight[deviceSize]);
  c.noFill();

  let x = btn.x();
  let y = btn.y();
  let r = btn.r();

  c.line(x - r / 2, y, x - r / 4, y + r / 2);
  c.line(x - r / 4, y + r / 2, x + (7 / 16) * r, y - (7 / 16) * r);

}

function drawNo(btn, c) {

  c.stroke(colours["text"]);
  c.strokeWeight(lineWeight[deviceSize]);
  c.noFill();

  let x = btn.x();
  let y = btn.y();
  let r = btn.r();

  c.line(x - (7 / 16) * r, y - (7 / 16) * r, x + (7 / 16) * r, y + (7 / 16) * r);
  c.line(x - (7 / 16) * r, y + (7 / 16) * r, x + (7 / 16) * r, y - (7 / 16) * r);

}


// timer

let time = 0;
let paused = false;

function timerString() {
  let h = Math.floor(time / 3600);
  let t = time % 3600;
  let m = Math.floor(t / 60);
  t = t % 60;
  let s = Math.floor(t);
  
  return h.toString().padStart(2, "0") + ":" + m.toString().padStart(2, "0") + ":" + s.toString().padStart(2, "0");
}

// shapes

var selected;

let shapes = [

];

function rotateClockwise() {
  if (selected) {

  }
}

function rotateAnticlockwise() {
  if (selected) {

  }
}

function flip() {
  if (selected) {
    
  }
}


// screens

var canvas;
var screens;

function resizeScreens(w, h) {
  for (var n in screens) {
    screens[n]["screen"] = createGraphics(w, h);
  }
}

let screen = "help";
let query = false;

function drawHelpScreen(c) {

  c.background(colours["background"]);
  c.fill(colours["box"]);
  c.noStroke();
  c.rect(pad, textSize[deviceSize]["title"] * 2 + pad, windowWidth - pad * 2, windowHeight - (textSize[deviceSize]["title"] + pad) * 2, corner);

  drawButtonPressed(questionButton, c);
  drawQuestion(questionButton, c);

  c.noStroke();
  c.fill(colours["text"]);
  c.textAlign(CENTER, CENTER);
  c.textSize(textSize[deviceSize]["title"]);
  c.textStyle(BOLD);
  c.text("T-Puzzle", windowWidth / 2, textSize[deviceSize]["title"] + pad / 2);

  c.textAlign(LEFT, CENTER);
  c.textStyle(NORMAL);
  c.textSize(textSize[deviceSize]["text"]);
  c.textLeading(textSize[deviceSize]["text"] * 2);
  c.text("How quickly can you arrange the four pieces into a T shape? Click on a shape to select it and then use the buttons to rotate and flip it. Alternatively, you can click on a selected shape to rotate it clockwise. Drag the shapes into the T to complete the puzzle. Click anywhere to start.", pad * 2, (textSize[deviceSize]["title"] + pad) * 2, windowWidth - pad * 4, windowHeight - (textSize[deviceSize]["title"] * 2) - pad * 3);

  if (click) {
    screen = "puzzle";
    click = false;
  }

}

function drawPuzzleScreen(c) {

  c.background(colours["background"]);

  if (!paused) {
    time += (deltaTime / 1000);
  }
}


function drawUi(c) {
  c.clear()
  for (let button of buttons) {
    if (!query &&(click || press)) {
      let overlap = collidePointCircle(mouseX, mouseY, button.x(), button.y(), button.r() * 2);
      if (overlap && click) {
        button.onClick();
        drawButtonPressed(button, c);
        click = false;
      } else if (overlap && press) {
        drawButtonPressed(button, c);
      } else {
        drawButton(button, c);
      }
    } else {
      drawButton(button, c);
    }

    button.drawLabel(button, c);
  }

  c.noStroke();
  c.fill(colours["text"]);
  c.textAlign(CENTER, CENTER);
  c.textSize(textSize[deviceSize]["title"]);
  c.textStyle(BOLD);
  c.text(timerString(), windowWidth / 2, textSize[deviceSize]["title"] + pad / 2);

  if (query) {

    drawButtonPressed(resetButton, c);
    resetButton.drawLabel(resetButton, c);

    c.fill(colours["background"]);
    c.stroke(colours["box"]);
    c.strokeWeight(lineWeight);
    c.rect(windowWidth * (3 / 8) - getR() - pad, windowHeight / 4 + pad, windowWidth * 0.25 + (pad + getR()) * 2, windowHeight * 0.25 + pad + getR() * 2, corner);

    c.noStroke();
    c.fill(colours["text"]);
    c.textSize(textSize[deviceSize]["title"]);
    c.textStyle(NORMAL);
    c.textAlign(CENTER, CENTER);
    c.text("Reset?", windowWidth / 2, (3 / 8) * windowHeight);

    for (let button of queryButtons) {
      if (click || press) {
        let overlap = collidePointCircle(mouseX, mouseY, button.x(), button.y(), button.r() * 2);
        if (overlap && click) {
          button.onClick();
          drawButtonPressed(button, c);
          click = false;
        } else if (overlap && press) {
          drawButtonPressed(button, c);
        } else {
          drawButton(button, c);
        }
      } else {
        drawButton(button, c);
      }
      button.drawLabel(button, c);
    }
  }
}


function getDeviceSize() {

  let w = windowWidth > windowHeight ? windowWidth : windowHeight;
  let h = w == windowWidth ? windowHeight : windowWidth;

  if (w <= 800) {
    if (h >= 500) {
      return "small";
    } else {
      return "tiny"
    }
  } else if (w < 1000) {
    if (h >= 600) {
      return "medium";
    } else if (h <= 200) {
      return "tiny";
    } else {
      return "small";
    }
  } else if (w < 1500) {
    if (h >= 1000) {
      return "large";
    } else if (h <= 400) {
      return "small";
    } else {
      return "medium";
    }
  } else if (w < 2000) {
    if (h >= 1500) {
      return "huge";
    } else if (h <= 600) {
      return "medium";
    } else {
      return "large";
    }
  } else {
    if (h <= 800) {
      return "large";
    } else {
      return "huge";
    }
  }

}


function getDeviceOrientation() {
  return windowWidth > windowHeight ? "landscape" : "portrait";
}


function reset() {
  query = false;
  paused = false;
  time = 0;
}

function resetQuery() {
  paused = true;
  query = true;
}


// sketch

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.mouseClicked(_mouseClicked);
  canvas.doubleClicked(_doubleClicked);

  screens = {
    ["help"] : {
      ["screen"] : createGraphics(windowWidth, windowHeight),
      ["draw"] : drawHelpScreen,
    },
    ["puzzle"] : {
      ["screen"] : createGraphics(windowWidth, windowHeight),
      ["draw"] : drawPuzzleScreen,
      //["shapes"] : createShapes,
    },
    ["ui"] : {
      ["screen"] : createGraphics(windowWidth, windowHeight),
      ["draw"] : drawUi,
    }
  }

  deviceSize = getDeviceSize();
  orient = getDeviceOrientation();

  frameRate(30);
}

function draw() {
  screens[screen]["draw"](screens[screen]["screen"]);
  image(screens[screen]["screen"], 0, 0);

  if (screen == "puzzle") {
      drawUi(screens["ui"]["screen"]);
      image(screens["ui"]["screen"], 0, 0);
  }

  click = false;
  doubleClick = false;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  resizeScreens(windowWidth, windowHeight);
  deviceSize = getDeviceSize();
  orient = getDeviceOrientation();
}

function _mouseClicked() {
  click = true;
}

function _doubleClicked() {
  doubleClick = true;
}

function mousePressed() {
  press = true;
}

function mouseReleased() {
  press = false;
}