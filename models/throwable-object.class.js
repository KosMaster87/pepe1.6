"use strict";

class ThrowableObject extends MovableObject {
  width = 40;
  height = 40;

  constructor(x, y) {
    super().loadImage("./img/7_statusbars/6_salsa_bottle/salsa_bottle.png");
    this.x = x;
    this.y = y;
    this.throw(800, 0);
  }

  /**
   * Der Wurf der Flaschen.
   */
  throw() {
    this.speedY = 10; // Geschwindigkeit und weg auf der Y-Achse.
    this.applyGravity();
    /**
     * Geschwindigkeit und weg auf der X-Achse.
     */
    setStoppableInterval(() => {
      this.x += 10;
    }, 25);
  }
}
