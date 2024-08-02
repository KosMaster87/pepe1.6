"use strict";

class Level {
  enemies;
  clouds;
  background;
  level_end_x = 5800; // Das ist die Grende für den Pepe zur rechten Seite. Zur linken Seite ist in der character.class in der animate() bzw. EnterKeyboard() Methode.

  /**
   * Hier ist die Reichenfolge der Argumente entscheident im Bezug zu der Reichenfolge des "new Level" Objektes.
   * @param {Array} enemiesArray
   * @param {Array} cloudsArray
   * @param {Array} backgroundArray
   */
  constructor(enemiesArray, cloudsArray, backgroundArray) {
    this.enemies = enemiesArray;
    this.clouds = cloudsArray;
    this.background = backgroundArray;
  }
}
