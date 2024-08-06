"use strict";

class ThrowableObject extends MovableObject {
  IMAGES_ROTATION = [
    "./img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "./img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
    "./img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
    "./img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
  ];

  IMAGES_SPLASH = [
    "./img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
    "./img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
    "./img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
    "./img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
    "./img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
    "./img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png",
  ];

  world;
  width = 40;
  height = 40;
  collide = false;
  groundY = 370;
  throwIntervalId;
  rotateIntervalId;
  splashIntervalId;

  constructor(x, y, world) {
    super().loadImage("./img/6_salsa_bottle/salsa_bottle.png");
    this.loadImages(this.IMAGES_ROTATION);
    this.loadImages(this.IMAGES_SPLASH);
    this.world = world;
    this.x = x;
    this.y = y;
    this.throw();
    this.animate();
  }

  /**
   * Der Wurf der Flaschen.
   */
  throw() {
    this.speedY = 10;
    this.applyGravity();
    this.throwIntervalId = setStoppableInterval(() => {
      this.x += 10;
      if (this.y > this.groundY) {
        this.y = this.groundY;
        this.speedY = 0;
        this.collide = true;
        this.startSplash();
      }
    }, 25);
  }

  /**
   * Startet die Splash-Animation
   */
  startSplash() {
    if (this.rotateIntervalId) {
      clearInterval(this.rotateIntervalId); // Stoppe den Rotations-Intervall
    }

    this.splashIntervalId = setInterval(() => {
      this.playAnimation(this.IMAGES_SPLASH);
    }, 100);

    // Nach einer bestimmten Zeit, entferne die Flasche
    setTimeout(() => {
      clearInterval(this.splashIntervalId);
      this.stop();
    }, 700); // Warte 700 Millisekunden für die Splash-Animation
  }

  /**
   * Entferne die Flasche aus der Welt, wenn sie den Boden berührt
   */
  stop() {
    console.log("Stopping intervals.");
    clearInterval(this.throwIntervalId);
    if (this.splashIntervalId) {
      clearInterval(this.splashIntervalId);
    }
    
    this.world.throwableObjects = this.world.throwableObjects.filter(
      (obj) => obj !== this
    );
    console.log("Bottle removed from world.");
  }

  /**
   * Animate the throwable object
   */
  animate() {
    this.rotateIntervalId = setInterval(() => {
      if (!this.collide) {
        this.playAnimation(this.IMAGES_ROTATION);
      }
    }, 100);
  }
}
