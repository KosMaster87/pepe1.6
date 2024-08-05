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

  /**
   * Play an animation by cycling through the images in the given array.
   * @param {Array of image paths} images
   */
  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }
}
