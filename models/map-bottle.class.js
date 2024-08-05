class Bottle extends PickableObject {
  SALSA_GROUND = [
    "./img/6_salsa_bottle/1_salsa_bottle_on_ground.png",
    "./img/6_salsa_bottle/2_salsa_bottle_on_ground.png",
  ];

  x;
  y = 20;
  height;
  width;

  constructor(x, y) {
    super().loadImage("./img/6_salsa_bottle/salsa_bottle.png");
    this.x = x;
    this.y = y;
    this.width = 50;
    this.height = 60;
  }
}

// class Bottle extends MovableObject {
//   constructor(x, y) {
//     super();
//     this.loadImage('./img/6_salsa_bottle/salsa_bottle.png');
//     this.x = x;
//     this.y = y;
//     this.width = 50;
//     this.height = 50;
//   }
// }
