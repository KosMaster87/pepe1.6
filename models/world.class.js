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

  /**
   * First step to add the draw in this document.
   * @param {init in the game.js} canvas
   */
  constructor(canvas) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.run();
  }

  /**
   * Für die Tastatur steuerung, den Karakter und die Welt zusammen verbinden .
   * Der Karakter kann die Variablen der Welt nun nutzen.
   * Hier wird eine Beziehung zwischen dem "Character" und der "World" Klasse hergestellt.
   * Die Variable "world" muss dem "charavter.class.js" hinzugefügt werden.
   */
  setWorld() {
    this.character.world = this;
  }

  /**
   * Prüft die Zeitvorgabe für Kolusion von Pepe mit den Feinden.
   * Sowie auch die Berührung der Flaschen.
   */
  run() {
    setInterval(() => {
      this.checkCollisions();
      this.checkThrowObject();
    }, 200);
  }

  // ----------------------------------------------------------------
  // Prüfen der Berührung in der Map. START
  // ----------------------------------------------------------------

  /**
   * Check if Pepe collision with Objects.
   */
  checkCollisions() {
    this.enemieStatus_relationPepe();
    this.checkBottleStatus_toEarn();
  }

  /**
   * Check if Pepe collision with opponent.
   */
  enemieStatus_relationPepe() {
    this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy)) {
        this.character.hit();
        this.pepeStatusBar.setPercentage(this.character.energy);
      }
    });
  }

  /**
   * Check if Pepe collision with Bottle.
   */
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

  /**
   * Flasche Werfen
   */
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

  // ----------------------------------------------------------------
  // Prüfen der Berührung in der Map. ENDE
  // ----------------------------------------------------------------
  // ----------------------------------------------------------------
  // Alles rund ums Zeichnen. START
  // ----------------------------------------------------------------

  /**
   * Draw() wird immer wieder aufgerufen.
   * Draw what ever in this.World
   * ACHTUNG: Es ist nicht das Selbe "draw()"  wie es in der class DrawableObject definiert ist.
   */
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

  /**
   *Zu Zeichnen!
   */
  addLevelObjects() {
    this.addObjectsToMap(this.level.background);
    this.addObjectsToMap(this.level.clouds);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.level.bottles);
  }

  /**
   *Zu Zeichnen!
   */
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

  // ----------------------------------------------------------------

  /**
   * Die Fn ist nur eine Zwischenfunktion vom Zeichnen-Fn zum Zeichnen-addToMap, die auch eine Hilfsfunktion für die "draw"-Fn ist.
   * Adds any objects with specific attributes.
   * Im Grunde sollen sich diese Objekte ohne einer Benutzeingabe Automatisch bewegen. Im gegensatz zu Pepe wo der erst gezeichnet wird, alsbald eine Eingabe erfolg.
   * @param {The objects in this world.} objects
   */
  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }

  /**
   * Die if Abfragen händelt den Charakter, seinen Spiegelbild. Sowie die Gespiegelte Koardinaten des Canvas für den Charakter.
   * The if query handles the character, its mirror image, and the mirrored coordinates of the canvas for the character.
   * Add to Canvas Board each things.
   * @param {movable object} mo
   */
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

  // ----------------------------------------------------------------

  /**
   * Die "Flips" sind zum Spiegeln der Bilder.
   * Den von rechts-nach-links zustand setzen.
   * @param {movable-object} mo
   */
  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0); // Die Verschiebung um die eigene Y-Achse.
    this.ctx.scale(-1, 1); // Die Spieglung mit "-1" in der X-Achse. Die Y-Achse bleibt unverändert mit "1".
    mo.x = mo.x * -1; // Das Koardinatensystem zu dem Bild muss auch noch gespiegelt werden.
  }

  /**
   * Die "Flips" sind zum Spiegeln der Bilder.
   * Den von-links-nach-rechts zustand setzen.
   * @param {movable-object} mo
   */
  flipImageBack(mo) {
    mo.x = mo.x * -1; // Das Koardinatensystem zu dem Bild muss auch noch gespiegelt werden.
    this.ctx.restore();
  }

  // ----------------------------------------------------------------
  // Alles rund ums Zeichnen. ENDE
  // ----------------------------------------------------------------
}
