"use strict";

class Chick extends MovableObject {
  y = 400;
  height = 45;
  width = 45;

  IMAGES_WALKING = [
    "./img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
    "./img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
    "./img/3_enemies_chicken/chicken_small/1_walk/3_w.png",
  ];

  constructor() {
    super().loadImage("./img/3_enemies_chicken/chicken_small/1_walk/1_w.png");
    this.loadImages(this.IMAGES_WALKING);
    this.x = 200 + Math.random() * 10000; // Start the chicken in random place.
    this.speed = 0.15 + Math.random() * 0.25; // Random speed!
    this.animate();
  }

  /**
   * Speed optionts and Running direction.
   * Also some animations.
   */
  animate() {
    setStoppableInterval(() => this.moveLeft(), 1000 / 60);
    setStoppableInterval(() => this.playAnimation(this.IMAGES_WALKING), 1000 / 7
    );
  }
}
