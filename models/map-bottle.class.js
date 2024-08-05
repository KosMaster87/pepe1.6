class Bottle extends PickableObject {
  IMAGES_SALSA_GROUND = [
    "./img/6_salsa_bottle/1_salsa_bottle_on_ground.png",
    "./img/6_salsa_bottle/2_salsa_bottle_on_ground.png",
  ];

  height;
  width;

  constructor(x, y) {
    super().loadImage("./img/6_salsa_bottle/salsa_bottle.png");
    this.loadImages(this.IMAGES_SALSA_GROUND);
    this.x = 250 + Math.random() * 720 * 4;
    // this.x = Math.random() * 4000, Math.random() * 300
    this.x = x;
    this.y = y;
    this.width = 50;
    this.height = 60;
  }
}