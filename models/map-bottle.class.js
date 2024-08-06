class Bottle extends PickableObject {
  IMAGES_SALSA_GROUND = [
    "./img/6_salsa_bottle/1_salsa_bottle_on_ground.png",
    "./img/6_salsa_bottle/2_salsa_bottle_on_ground.png",
  ];

  constructor(x, y) {
    super().loadImage("./img/6_salsa_bottle/salsa_bottle.png");
    this.loadImages(this.IMAGES_SALSA_GROUND);
    this.x = 250 + Math.random() * 720 * 4;
    this.y = 370 + Math.random();
    this.width = 50;
    this.height = 60;
    this.animate();
  }

  /**
   * Animate the bottle
   */
  animate() {
    setInterval(() => {
      this.playAnimation(this.IMAGES_SALSA_GROUND);
    }, 220);
  }
}
