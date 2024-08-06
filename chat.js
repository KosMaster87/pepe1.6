"use strict";

class CharacterStatusBar extends DrawableObject {
  IMAGES = [
    "./img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png",
    "./img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png",
    "./img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png",
    "./img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png",
    "./img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png",
    "./img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png",
  ];

  percentage = 100;

  constructor() {
    super();
    this.y = -10;
    this.x = 10;
    this.width = 200;
    this.height = 60;
    this.loadImages(this.IMAGES);
    this.setPercentage(100);
  }

  /**
   * Setzt den Prozentsatz der Statusleiste und aktualisiert das Bild.
   * @param {number} percentage - Der neue Prozentsatz.
   */
  setPercentage(percentage) {
    this.percentage = percentage;
    this.updateImage();
  }

  /**
   * Aktualisiert das Bild basierend auf dem aktuellen Prozentsatz.
   */
  updateImage() {
    let path = this.IMAGES[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  /**
   * Bestimmt den Index des Bildes basierend auf dem Prozentsatz.
   * @returns {number} Der Index des Bildes.
   */
  resolveImageIndex() {
    if (this.percentage == 100) {
      return 5;
    } else if (this.percentage > 80) {
      return 4;
    } else if (this.percentage > 60) {
      return 3;
    } else if (this.percentage > 40) {
      return 2;
    } else if (this.percentage > 20) {
      return 1;
    } else {
      return 0;
    }
  }
}

class Character extends MovableObject {
  // ... andere Teile der Klasse

  /**
   * Aktualisiert den Status der Statusleiste basierend auf dem aktuellen Energielevel.
   */
  updateStatusBar() {
    this.world.pepeStatusBar.setPercentage(this.energy);
  }

  /**
   * Steuert die Animationen und Bewegungen des Charakters.
   */
  pepeAnimate() {
    if (this.isHurt() && !this.isDead()) {
      this.animateHurt();
    } else if (this.isDead()) {
      this.animateDead();
    } else if (this.isAboveGround()) {
      this.animateJumping();
    } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
      this.animateWalking();
    } else if (
      this.idleTimer() &&
      !this.isAboveGround() &&
      !this.isHurt() &&
      !this.isDead()
    ) {
      if (this.sleepTimer()) {
        this.animateSleeping();
        this.sleep = true;
        this.idle = false;
      } else {
        this.animateIdle();
        this.idle = true;
        this.sleep = false;
      }
    }

    this.updateStatusBar(); // Statusleiste aktualisieren
  }
}
