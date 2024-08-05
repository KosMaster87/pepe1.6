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
    this.animate(); // Start the animation when the object is created
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

class PickableObject extends DrawableObject {
  offset = {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  };
}

("use strict");

class DrawableObject {
  img;
  imageCache = {};
  currentImage = 0;

  offset = {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  };

  x = 0;
  y = 300;
  height = 150;
  width = 100;

  /**
   * Load image for any movable character.
   * @param {The path of the image to be loaded} path
   */
  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  /**
   * Load multiple images for animations.
   * @param {Array of image paths} array
   */
  loadImages(array) {
    array.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }

  /**
   * Draw the object on the canvas.
   * @param {Canvas rendering context} ctx
   */
  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  /**
   * Draw the object's frame (for debugging purposes).
   * @param {Canvas rendering context} ctx
   */
  drawFrame(ctx) {
    if (
      this instanceof ThrowableObject ||
      this instanceof Bottle ||
      this instanceof Character ||
      this instanceof Chicken ||
      this instanceof Chick ||
      this instanceof Endboss
    ) {
      ctx.beginPath();
      ctx.lineWidth = "2";
      ctx.strokeStyle = "red";
      ctx.rect(this.x, this.y, this.width, this.height);
      ctx.stroke();
    }
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

let canvas = document.getElementById("canvas");
let world = new World(canvas);

document.addEventListener("keydown", (e) => {
  world.keyboard[e.key.toUpperCase()] = true;
});

document.addEventListener("keyup", (e) => {
  world.keyboard[e.key.toUpperCase()] = false;
});
