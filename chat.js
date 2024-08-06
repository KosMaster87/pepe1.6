"use strict";

class World {
  level = level1;
  character = new Character();

  ctx;
  canvas;
  keyboard;
  camera_x = 0;

  pepeStatusBar = new CharacterStatusBar();
  coinStatusBar = new CoinStatusBar();
  bottleStatusBar = new BottleStatusBar();

  throwableObjects = [];

  constructor(canvas) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.run();
  }

  setWorld() {
    this.character.world = this;
  }

  run() {
    setInterval(() => {
      this.checkCollisions();
      this.checkThrowObject();
    }, 200);
  }

  checkCollisions() {
    this.enemieStatus_relationPepe();
    this.checkBottleStatus_toEarn();
  }

  enemieStatus_relationPepe() {
    this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy)) {
        this.character.hit();
        this.pepeStatusBar.setPercentage(this.character.energy);
      }
    });
  }

  checkBottleStatus_toEarn() {
    this.level.bottles.forEach((bottle, index) => {
      if (
        this.character.isColliding(bottle) &&
        this.character.bottles.length < this.character.maxBottles
      ) {
        this.character.collectBottle();
        let newPercentage = Math.min(this.character.bottles.length * 20, 100);
        this.bottleStatusBar.setPercentage(newPercentage);

        console.log("Bottle collected:", this.character.bottles.length);
        console.log("Bottle status bar updated:", newPercentage);

        this.level.bottles.splice(index, 1);
      }
    });
  }

  checkThrowObject() {
    if (this.keyboard.THROW && this.character.bottles.length > 0) {
      let throwDirectionX = this.character.otherDirection ? -1 : 1; // Links oder Rechts

      let bottle = new ThrowableObject(
        this.character.x + (throwDirectionX === 1 ? 70 : -70), // Anpassen der x-Position je nach Richtung
        this.character.y + 35,
        this,
        throwDirectionX // Richtung übergeben
      );
      this.throwableObjects.push(bottle);
      this.character.bottles.pop();
      this.bottleStatusBar.setPercentage(this.character.bottles.length * 20);
      console.log(
        "Bottle thrown. Bottles left:",
        this.character.bottles.length
      );
    }
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.camera_x, 0);
    this.addLevelObjects();
    this.addObjectsToMap(this.throwableObjects);
    this.ctx.translate(-this.camera_x, 0);
    this.addBars();
    this.ctx.translate(this.camera_x, 0);
    this.addToMap(this.character);
    this.ctx.translate(-this.camera_x, 0);
    this.setSelfDraw();
    self = this;
  }

  addLevelObjects() {
    this.addObjectsToMap(this.level.background);
    this.addObjectsToMap(this.level.clouds);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.level.bottles);
  }

  addBars() {
    this.addToMap(this.pepeStatusBar);
    this.addToMap(this.coinStatusBar);
    this.addToMap(this.bottleStatusBar);
  }

  setSelfDraw() {
    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }

  addToMap(mo) {
    if (mo.otherDirection) {
      this.flipImage(mo);
    }

    mo.draw(this.ctx);
    mo.drawFrame(this.ctx);

    if (mo.otherDirection) {
      this.flipImageBack(mo);
    }
  }

  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }
}

("use strict");

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

  constructor(x, y, world, throwDirectionX = 1) {
    super().loadImage("./img/6_salsa_bottle/salsa_bottle.png");
    this.loadImages(this.IMAGES_ROTATION);
    this.loadImages(this.IMAGES_SPLASH);
    this.world = world;
    this.x = x;
    this.y = y;
    this.throwDirectionX = throwDirectionX; // Speichern der Wurfrichtung
    this.throw();
    this.animate();
  }

  throw() {
    this.applyGravity();
    this.throwIntervalId = setStoppableInterval(() => {
      this.x += 10 * this.throwDirectionX; // Richtung berücksichtigen
      if (this.y > this.groundY) {
        this.y = this.groundY;
        this.collide = true;
        this.startSplash();
      }
    }, 25);
  }

  startSplash() {
    if (this.rotateIntervalId) {
      clearInterval(this.rotateIntervalId);
    }

    this.splashIntervalId = setInterval(() => {
      this.playAnimation(this.IMAGES_SPLASH);
    }, 100);

    setTimeout(() => {
      clearInterval(this.splashIntervalId);
      this.stop();
    }, 700);
  }

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

  animate() {
    this.rotateIntervalId = setInterval(() => {
      if (!this.collide) {
        this.playAnimation(this.IMAGES_ROTATION);
      }
    }, 100);
  }
}
