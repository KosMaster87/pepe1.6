"use strict";

let canvas;
let world;
let keyboard = new Keyboard();
let isGameRunning = false;
let level1;

/**
 * New World load the canvas in world.class.js
 */
function initGame() {
  canvas = document.getElementById("canvas");
  startGame();
  initLevel();
  world = new World(canvas, keyboard, level1);
}
