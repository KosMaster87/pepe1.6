draw() {
  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

  this.ctx.translate(this.camera_x, 0);
  this.addObjectsToMap(this.level.background);
  this.addObjectsToMap(this.level.clouds);
  this.addObjectsToMap(this.level.enemies);
  this.addObjectsToMap(this.level.bottles);
  this.addObjectsToMap(this.throwableObjects);
  this.ctx.translate(-this.camera_x, 0);

  this.addToMap(this.pepeStatusBar);
  this.addToMap(this.coinStatusBar);
  this.addToMap(this.bottleStatusBar);

  this.ctx.translate(this.camera_x, 0);
  this.addToMap(this.character);
  this.ctx.translate(-this.camera_x, 0);

  self = this;
  requestAnimationFrame(function () {
    self.draw();
  });
}
