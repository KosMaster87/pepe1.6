"use strict";

class ThrowableObject extends MovableObject {
  // ... (andere Eigenschaften und Methoden)

  handleEnemyCollision(enemy) {
    if (this.isColliding(enemy) && !this.collide) {
      this.collide = true;
      enemy.hit(); // Gegner Schaden zufügen
      this.startSplash();
      this.remove(); // Entfernt die Flasche nach einem Treffer
    }
  }

  startSplash() {
    // Hier die Logik für die Splash-Animation hinzufügen
    console.log("Splash animation started");
  }

  remove() {
    // Entfernt die Flasche aus der Welt
    this.world.throwableObjects = this.world.throwableObjects.filter(obj => obj !== this);
  }

  // ... (andere Eigenschaften und Methoden)
}
