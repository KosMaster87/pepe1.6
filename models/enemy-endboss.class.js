"use strict";

class Endboss extends MovableObject {
  IMAGES_ALERT = [
    "./img/4_enemie_boss_chicken/2_alert/G5.png",
    "./img/4_enemie_boss_chicken/2_alert/G6.png",
    "./img/4_enemie_boss_chicken/2_alert/G7.png",
    "./img/4_enemie_boss_chicken/2_alert/G8.png",
    "./img/4_enemie_boss_chicken/2_alert/G9.png",
    "./img/4_enemie_boss_chicken/2_alert/G10.png",
    "./img/4_enemie_boss_chicken/2_alert/G11.png",
    "./img/4_enemie_boss_chicken/2_alert/G12.png",
  ];

  IMAGES_WALKING = [
    "./img/4_enemie_boss_chicken/1_walk/G1.png",
    "./img/4_enemie_boss_chicken/1_walk/G2.png",
    "./img/4_enemie_boss_chicken/1_walk/G3.png",
    "./img/4_enemie_boss_chicken/1_walk/G4.png",
  ];

  IMAGES_HURT = [
    "./img/4_enemie_boss_chicken/4_hurt/G21.png",
    "./img/4_enemie_boss_chicken/4_hurt/G22.png",
    "./img/4_enemie_boss_chicken/4_hurt/G23.png",
  ];

  IMAGES_DEAD = [
    "./img/4_enemie_boss_chicken/5_dead/G24.png",
    "./img/4_enemie_boss_chicken/5_dead/G25.png",
    "./img/4_enemie_boss_chicken/5_dead/G26.png",
  ];

  height = 400;
  width = 300;
  y = 50;
  hits = 0;

  constructor() {
    super().loadImage(this.IMAGES_WALKING[0]);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_ALERT);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
    this.x = 1200;
    this.alerted = false;
    this.speed = 1;
    this.animate();
  }

  animate() {
    this.animationInterval = setStoppableInterval(() => {
      if (!this.alerted) {
        this.moveLeft();
      }
      this.playAnimation(this.IMAGES_WALKING);
    }, 1000 / 7);
  }

  moveLeft() {
    this.x -= this.speed;
  }

  /**
   * Logik für Treffer an dem Gegner.
   */
  hit_Boss() {
    this.hits += 1;
    if (this.hits >= 5) {
      this.die();
    } else {
      clearInterval(this.animationInterval);
      this.playAnimation(this.IMAGES_HURT);
      setTimeout(() => {
        this.animate();
      }, 500);
    }
  }

  /**
   * Tötungslogik für das Huhn.
   */
  die() {
    clearInterval(this.animationInterval);
    this.playAnimation(this.IMAGES_DEAD);
    setTimeout(() => {
      this.world.level.enemies = this.world.level.enemies.filter(
        (enemy) => enemy !== this
      );
    }, 700);
  }

  checkAlert(character) {
    if (!this.alerted && this.isCloseTo(character, 250)) {
      this.alerted = true;
      this.alert();
    }
  }

  alert() {
    clearInterval(this.animationInterval);
    this.playAnimation(this.IMAGES_ALERT);
  }

  isCloseTo(character, distance) {
    return Math.abs(this.x - character.x) < distance;
  }
}
