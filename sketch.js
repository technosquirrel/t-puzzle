// constants for graphics

let colours = {
  ["background"] : "#FFEBCD",
  ["box"] : "#FFCE85",
  ["text"] : "#39393A",
  ["t"] : "#939393",
  ["outline"] : "#FFFFFF",
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

let click = false; // activates after press/touch ended
let press = false; // activates on mouse click/touch
let mouseDown = false;
let drag = false; // activates on mouse/touch moved
let buttonClicked = false;

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

let questionButton = createButton(() => {return pad + getR();}, () => {return pad + getR();}, getR, () => {changeScreen = "help";}, drawQuestion);
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

function setLabelVars(c) {
  c.stroke(colours["text"]);
  c.strokeWeight(lineWeight[deviceSize]);
  c.noFill();
}

function drawQuestion(btn, c) {

  let x = btn.x();
  let y = btn.y();
  let r = btn.r();

  c.arc(x, y - r / 4, r * 0.75, r * 0.75, -PI, PI / 2);
  c.line(x, y + r / 8, x, y + (3 / 8) * r);
  c.circle(x, y + (5 / 8) * r, lineWeight[deviceSize] / 2);

}

function drawReset(btn, c) {

  let x = btn.x();
  let y = btn.y();
  let r = btn.r();

  c.arc(x, y, r, r, -PI, PI / 2);
  c.triangle(x - (9 / 16) * r, y, x - (7 / 16) * r, y, x - r / 2, y + (1 / 16) * r);
}

function drawFlip(btn, c) {

  let x = btn.x();
  let y = btn.y();
  let r = btn.r();

  c.line(x - r / 2, y - r / 4, x + r / 2, y - r / 4);
  c.line(x - r / 2, y + r / 4, x + r / 2, y + r / 4);

  c.triangle(x + r / 2, y - r / 4, x + (7 / 16) * r, y - (5 / 16) * r, x + (7 / 16) * r, y - (3 / 16) * r);
  c.triangle(x - r / 2, y + r / 4, x - (7 / 16) * r, y + (5 / 16) * r, x - (7 / 16) * r, y + (3 / 16) * r);
}

function drawRotateR(btn, c) {

  let x = btn.x();
  let y = btn.y();
  let r = btn.r();

  c.arc(x, y, r, r, -PI, 0);
  c.triangle(x + (7 / 16) * r, y, x + (9 / 16) * r, y, x + r / 2, y + (1 / 16) * r);
}

function drawRotateL(btn, c) {

  let x = btn.x();
  let y = btn.y();
  let r = btn.r();

  c.arc(x, y, r, r, -PI, 0);
  c.triangle(x - (7 / 16) * r, y, x - (9 / 16) * r, y, x - r / 2, y + (1 / 16) * r);
}

function drawYes(btn, c) {

  let x = btn.x();
  let y = btn.y();
  let r = btn.r();

  c.line(x - r / 2, y, x - r / 4, y + r / 2);
  c.line(x - r / 4, y + r / 2, x + (7 / 16) * r, y - (7 / 16) * r);

}

function drawNo(btn, c) {

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

// shape data gives relative vertices from an offset, to support scaling and moving
let shapeData = {
  ["t"] : [[-180, -60], [180, -60], [180, 60], [60, 60], [60, 400], [-60, 400], [-60, 60], [-180, 60]],
  ["triangle"] : [[-40, -40], [80, -40], [-40, 80]],
  ["pentagon"] : [[-50, -60], [120, -60], [86, -24], [170, 60], [-170, 60]],
  ["short_trap"] : [[-130, 60], [60, 60], [60, -60], [-10, -60]],
  ["long_trap"] : [[200, -60], [80, 60], [-140, 60], [-140, -60]],
}

var scale;

var canvasX;
var canvasY;
var canvasH;
var canvasW;

var shapes;
var selected;
let newSelected = false;
var target;

// poly expects x, y to be the center of the shape, not the "origin point" that the vertices work off of, for simplicity when resizing
function newPoly(x, y, vertData, colour) {

  let poly = {};

  let mins = [0, 0];
  let maxs = [0, 0];

  for (let i = 0; i < 2; i++) {
    for (let v of vertData) {
      if (v[i] < mins[i]) {
        mins[i] = v[i];
      } else if (v[i] > maxs[i]) {
        maxs[i] = v[i];
      }
    }
  }

  poly.w = maxs[0] - mins[0];
  poly.h = maxs[1] - mins[1];

  poly.origin = createVector(x - (poly.w / 2 + mins[0]) * scale, y - (poly.h / 2 + mins[1]) * scale);
  poly.rot = 0;
  poly.flip = false;
  poly.carried = false;
  poly.vertices = [];

  for (let v of vertData) {
    poly.vertices.push(createVector(v[0], v[1]));
  }

  poly.colour = colour;

  return poly

}

function drawShape(poly, c) {

  c.fill(poly.colour);
  if (poly === selected) {
    c.strokeWeight(lineWeight[deviceSize]);
    c.stroke(colours["outline"]);
  } else {
    c.noStroke();
  }

  c.beginShape();
  for (const { x, y } of getRealVerts(poly))  c.vertex(x, y);
  c.endShape(CLOSE);

}

function getRealVerts(poly) {

  let realVerts = [];
  let angle = poly.rot * (PI / 4);
  let n = poly.flip ? -1 : 1;

  for (const { x, y } of poly.vertices) {
    realVerts.push(createVector(Math.round(n * (x * Math.cos(angle) - y * Math.sin(angle)) * scale + poly.origin.x), Math.round((x * Math.sin(angle) + y * Math.cos(angle)) * scale + poly.origin.y)))
  }

  return realVerts;

}


function setUpShapes() {

  getCanvasSize();
  scale = getScale();

  target = newPoly(getTargetX(), getTargetY(), shapeData["t"], colours["t"]);

  shapes = [
    newPoly(canvasW / 2 + pad * 6, canvasH / 2 + pad * 2, shapeData["triangle"], colours["shapes"][0]),
    newPoly(canvasW - pad * 8, canvasH / 2 + pad * 2, shapeData["pentagon"], colours["shapes"][1]),
    newPoly(canvasW / 2 + pad * 6, canvasH - pad * 3, shapeData["short_trap"], colours["shapes"][2]),
    newPoly(canvasW - pad * 6, canvasH - pad * 3, shapeData["long_trap"], colours["shapes"][3]),
  ];

  selected = false;
  newSelected = false;
}

function getScale() {
  if (orient == "landscape") {
    return min((canvasH * 0.8) / 460, (canvasW * 0.4) / 320);
  } else {
    return min((canvasH * 0.4) / 460, (canvasW * 0.8) / 320);
  }
}

function resizeShapes() {

  let pCanvasW = canvasW;
  let pCanvasH = canvasH;

  getCanvasSize();
  scale = getScale();
  target = newPoly(getTargetX(), getTargetY(), shapeData["t"], colours["t"]);

  setUpShapes();

}

function getCanvasSize() {
  if (orient == "landscape") {
    canvasX = (pad + getR()) * 2;
    canvasY = (pad + getR()) * 2;
    canvasW = windowWidth - canvasX;
    canvasH = windowHeight - canvasY;
  } else {
    canvasX = 0;
    canvasY = (pad + getR()) * 2;
    canvasW = windowWidth;
    canvasH = windowHeight - canvasY * 2;
  }
}

function getTargetX() {

  if (orient == "landscape") {
    return canvasW / 4 + canvasX;
  } else {
    return canvasW / 2;
  }

}

function getTargetY() {

  if (orient == "landscape") {
    return canvasH / 2 + canvasY;
  } else {
    return canvasH / 4 + canvasY;
  }

}


function rotateClockwise() {
  if (selected) {
    if (selected.flip) {
      selected.rot = (selected.rot - 1) >= 0 ? selected.rot - 1 : 7;
    } else {
      selected.rot = (selected.rot + 1) % 8;
    }
  }
}

function rotateAnticlockwise() {
  if (selected) {
    if (selected.flip) {
      selected.rot = (selected.rot + 1) % 8;
    } else {
      selected.rot = (selected.rot - 1) >= 0 ? selected.rot - 1 : 7;
    }
  }
}

function flip() {
  if (selected) {
    selected.flip = !selected.flip;
  }
}

function updateShapes() {
  if (!selected) {
    if (press || click){
      for (var poly of shapes) {
        if (collidePointPoly(mouseX, mouseY, getRealVerts(poly))) {
          selected = poly;
          newSelected = true;
          return;
        }
      }
    }
  } else {
    if (press || click || mouseDown) {
      let hit = collidePointPoly(mouseX, mouseY, getRealVerts(selected));
      if (!buttonClicked && !hit && (press || click)) {
        selected = false;
        updateShapes();
      } else if (click && hit && !drag && !newSelected) {
        rotateClockwise();
      } else if (hit && drag && !selected.carried) {
        selected.carried = true;
        selected.mouseOffset = createVector(mouseX - selected.origin.x, mouseY - selected.origin.y);
      } else if (selected.carried) {
        selected.origin = createVector(mouseX - selected.mouseOffset.x, mouseY - selected.mouseOffset.y);
        if (!mouseDown) {
          selected.carried = false;
        }
      }
    }
    if (newSelected && click) {
      newSelected = false;
    }
  }
}


// screens

var canvas;
var screens;
let changeScreen = false;

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
  setLabelVars(c);
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

  
  c.clear();
  
  drawShape(target, c);

  if (!query) {
    updateShapes();
  }

  for (let s of shapes) {
    if (s != selected) {
      drawShape(s, c);
    }
  }

  if (selected) {
    drawShape(selected, c);
  }

  if (query) {

    drawButtonPressed(resetButton, c);
    setLabelVars(c);
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
      if (click || press || mouseDown) {
        let overlap = collidePointCircle(mouseX, mouseY, button.x(), button.y(), button.r() * 2);
        if (overlap && click) {
          button.onClick();
          buttonClicked = true;
          drawButtonPressed(button, c);
        } else if (overlap && (press || mouseDown)) {
          drawButtonPressed(button, c);
          buttonClicked = true;
        } else {
          drawButton(button, c);
        }
      } else {
        drawButton(button, c);
      }
      setLabelVars(c);
      button.drawLabel(button, c);
    }
  }

  if (!paused) {
    time += (deltaTime / 1000);
  }
}


function drawUi(c) {

  buttonClicked = false;
  
  c.background(colours["background"]);

  for (let button of buttons) {
    if (!query &&(click || press || mouseDown)) {
      let overlap = collidePointCircle(mouseX, mouseY, button.x(), button.y(), button.r() * 2);
      if (overlap && click) {
        button.onClick();
        buttonClicked = true;
        drawButtonPressed(button, c);
      } else if (overlap && (press || mouseDown)) {
        drawButtonPressed(button, c);
        buttonClicked = true;
      } else {
        drawButton(button, c);
      }
    } else {
      drawButton(button, c);
    }
    setLabelVars(c);
    button.drawLabel(button, c);
  }

  c.noStroke();
  c.fill(colours["text"]);
  c.textAlign(CENTER, CENTER);
  c.textSize(textSize[deviceSize]["title"]);
  c.textStyle(BOLD);
  c.text(timerString(), windowWidth / 2, textSize[deviceSize]["title"] + pad / 2);
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

  setUpShapes();
}

function resetQuery() {
  paused = true;
  query = true;
}


// sketch

function setup() {

  canvas = createCanvas(windowWidth, windowHeight);
  canvas.mouseClicked(_mouseClicked);

  screens = {
    ["help"] : {
      ["screen"] : createGraphics(windowWidth, windowHeight),
      ["draw"] : drawHelpScreen,
    },
    ["puzzle"] : {
      ["screen"] : createGraphics(windowWidth, windowHeight),
      ["draw"] : drawPuzzleScreen,
    },
    ["ui"] : {
      ["screen"] : createGraphics(windowWidth, windowHeight),
      ["draw"] : drawUi,
    }
  }

  deviceSize = getDeviceSize();
  orient = getDeviceOrientation();

  setUpShapes();

  frameRate(60);

}

function draw() {

  if (screen == "puzzle") {
    drawUi(screens["ui"]["screen"]);
    image(screens["ui"]["screen"], 0, 0);
  }

  screens[screen]["draw"](screens[screen]["screen"]);
  image(screens[screen]["screen"], 0, 0);

  if (drag && click) {
    drag = false;
  }
  click = false;
  press = false;

  if (changeScreen) {
    screen = changeScreen;
    changeScreen = false;
  }
  
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  resizeScreens(windowWidth, windowHeight);
  deviceSize = getDeviceSize();
  orient = getDeviceOrientation();
  resizeShapes();
}

function _mouseClicked() {
  click = true;
}

function mousePressed() {
  press = true;
  mouseDown = true;
}

function mouseReleased() {
  mouseDown = false;
  click = true;
}

function mouseDragged() {
  drag = true;
}

function touchStarted() {
  press = true;
  mouseDown = true;
}

function touchEnded() {
  mouseDown = false;
  click = true;
}

function touchMoved() {
  drag = true;
}