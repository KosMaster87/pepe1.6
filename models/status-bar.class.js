class StatusBar extends DrawableObject {
  constructor(x, y, width, height, IMAGES) {
    super();
    this.y = y;
    this.x = x;
    this.width = width;
    this.height = height;
    this.percentage = 100;
    this.IMAGES = IMAGES;
    this.loadImages(this.IMAGES);
    this.setPercentage(100);
  }

  setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.IMAGES[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  resolveImageIndex() {
    if (this.percentage === 100) return 5;
    if (this.percentage > 80) return 4;
    if (this.percentage > 60) return 3;
    if (this.percentage > 40) return 2;
    if (this.percentage > 20) return 1;
    return 0;
  }
}
