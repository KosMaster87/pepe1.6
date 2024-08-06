class BossStatusBar extends DrawableObject {
  IMAGES = [
    "./img/7_statusbars/2_statusbar_endboss/orange/orange0.png",
    "./img/7_statusbars/2_statusbar_endboss/orange/orange20.png",
    "./img/7_statusbars/2_statusbar_endboss/orange/orange40.png",
    "./img/7_statusbars/2_statusbar_endboss/orange/orange60.png",
    "./img/7_statusbars/2_statusbar_endboss/orange/orange80.png",
    "./img/7_statusbars/2_statusbar_endboss/orange/orange100.png",
  ];

  percentage = 100;

  constructor() {
    super();
    this.y = 5;
    this.x = 500;
    this.width = 200;
    this.height = 60;
    this.loadImages(this.IMAGES); // Wie gehabt, in der DrawableObject zum Zeichnen der Bilder.
    this.setPercentage(100);
  }

  /**
   * Wird in der world.class.js auf Pepe sein "this.PepeStatusBar" angewand.
   * In der "checkCollisions()", bezogen auf "energy" nach der "hit()" Fn auf den this.character, in movable-object.class.js.
   * Bestimmung der Enerie in der Statusleiste.
   * @param {current energy from Pepe} percentage
   */
  setPercentage(percentage) {
    console.log(`Setting percentage: ${percentage}`);
    this.percentage = percentage;
    let imageIndex = this.resolveImageIndex();
    console.log(`Resolved image index: ${imageIndex}`);
    let path = this.IMAGES[imageIndex];
    console.log(`Image path: ${path}`);
    this.img = this.imageCache[path];
  }
  // setPercentage(percentage) {
  //   console.log(`Setting percentage: ${percentage}`);
  //   this.percentage = percentage;
  //   let path = this.IMAGES[this.resolveImageIndex()];
  //   this.img = this.imageCache[path]; // img und imageCache sind dann in der DrawableObject deklariert.
  // }

  /**
   * Einstufung der Barleiste.
   * @returns number
   */
  resolveImageIndex() {
    if (this.percentage > 80) return 5;
    if (this.percentage > 60) return 4;
    if (this.percentage > 40) return 3;
    if (this.percentage > 20) return 2;
    if (this.percentage > 0) return 1;
    return 0;
  }
  // resolveImageIndex() {
  //   if (this.percentage == 100) {
  //     return 5;
  //   } else if (this.percentage > 80) {
  //     return 4;
  //   } else if (this.percentage > 60) {
  //     return 3;
  //   } else if (this.percentage > 40) {
  //     return 2;
  //   } else if (this.percentage > 20) {
  //     return 1;
  //   } else {
  //     return 0;
  //   }
  // }

  /**
   * Reduziere den Prozentsatz basierend auf den Hits
   * @param {number} hits
   */
  updateBossHealth(hits) {
    console.log(`Updating boss health with hits: ${hits}`);
    let percentage = 100 - hits * 20;
    console.log(`Calculated percentage: ${percentage}`);
    this.setPercentage(Math.max(percentage, 0));
  }
}
