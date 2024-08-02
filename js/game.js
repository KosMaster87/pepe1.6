"use strict";

let canvas;
let world;
let keyboard = new Keyboard();
let isGameRunning = false;
let level1;

/**
 * New World load the canvas in world.class.js
 * Also check first if it is a mobile device or another device.
 */
function initGame() {
  canvas = document.getElementById("canvas");
  startGame();
  initLevel();
  world = new World(canvas, keyboard);
}
