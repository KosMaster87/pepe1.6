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
      this.checkAlerts(); // Überprüfen, ob der Boss alarmiert werden muss
    }, 200);
  }

  checkAlerts() {
    this.level.enemies.forEach((enemy) => {
      if (enemy instanceof Endboss) {
        enemy.checkAlert(this.character);
      }
    });
  }

  checkCollisions() {
    this.enemieStatus_relationPepe();
    this.checkBottleStatus_toEarn();
    this.checkThrowableObjectCollisions(); // Hinzufügen der Überprüfung für geworfene Objekte
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

  checkThrowableObjectCollisions() {
    this.throwableObjects.forEach((throwableObject) => {
      this.level.enemies.forEach((enemy) => {
        throwableObject.handleEnemyCollision(enemy);
      });
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
      bottle.world = this; // Setzt die Welt-Eigenschaft für die Flasche
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
    this.ctx.translate(-this.camera_x, 0);
    this.addBars();
    this.ctx.translate(this.camera_x, 0);
    this.addToMap(this.character);
    this.addObjectsToMap(this.throwableObjects); // Verschieben der Zeichnung der Flaschen nach der des Charakters
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
