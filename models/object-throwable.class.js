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

  // world;
  width = 40;
  height = 40;
  collide = false;
  groundY = 370;
  throwIntervalId;
  rotateIntervalId;
  splashIntervalId;
  xSpeed = 10;

  constructor(x, y, world, throwDirectionX = 1) {
    super().loadImage("./img/6_salsa_bottle/salsa_bottle.png");
    this.loadImages(this.IMAGES_ROTATION);
    this.loadImages(this.IMAGES_SPLASH);
    // this.world = world;
    this.x = x;
    this.y = y;
    this.throwDirectionX = throwDirectionX;
    this.throw();
    this.animate();
  }

  /**
   * Setze den Wurf der Flaschen.
   */
  throw() {
    this.applyGravity();
    this.throwIntervalId = setStoppableInterval(() => {
      this.x += this.xSpeed * this.throwDirectionX;

      // Kollision mit Feinden prüfen
      this.world.level.enemies.forEach((enemy) => {
        if (this.isColliding(enemy)) {
          this.handleEnemyCollision_thisBottle(enemy);
        }
      });

      if (this.y > this.groundY) {
        this.y = this.groundY;
        this.collide = true;
        this.xSpeed = 2;
        this.startSplash();
      }
    }, 25);
  }

  /**
   * Kollision mit Feinden prüfen
   */
  handleEnemyCollision_thisBottle(enemy) {
    if (this.isColliding(enemy) && !this.collide) {
      this.collide = true;
      this.xSpeed = 2;
      if (enemy instanceof Endboss) {
        enemy.hit_Boss();
      } else {
        enemy.hit_anyOpponent();
      }
      this.startSplash();
    }
  }

  /**
   * Startet die Splash-Animation
   */
  startSplash() {
    if (this.rotateIntervalId) {
      clearInterval(this.rotateIntervalId);
    }

    this.splashIntervalId = setInterval(() => {
      this.playAnimation(this.IMAGES_SPLASH);
    }, 100);

    // Nach einer bestimmten Zeit, entferne die Flasche
    setTimeout(() => {
      clearInterval(this.splashIntervalId);
      this.removeBottle();
    }, 700);
  }

  /**
   * Entferne die Flasche aus der Welt, wenn sie den Boden berührt
   */
  removeBottle() {
    clearInterval(this.throwIntervalId);
    if (this.splashIntervalId) {
      clearInterval(this.splashIntervalId);
    }

    this.world.throwableObjects = this.world.throwableObjects.filter(
      (obj) => obj !== this
    );
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
