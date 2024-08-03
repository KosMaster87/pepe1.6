class Character extends MoveableObject {
  world;
  startIdle;
  moving;
  idle;
  idledLong;
  walking;
  hurting;

  constructor() {
    super().loadImage(this.IMAGES_IDLE[0]);
    this.startIdle = new Date().getTime();
    this.loadImages(this.IMAGES_IDLE_LONG);
    this.loadImages(this.IMAGES_IDLE);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_JUMPING);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
    this.applyGravity();
    this.animate();
  }

  /**
   * start idle when character is not moving
   */
  startAnimateIdle() {
    if (
      this.isNotMoving() && // BOOL OK
      !this.isHurt() && // BOOL OK
      !this.checkIdleTime() && // BOOL OK
      !this.isJumping() // BOOL OK
    )
      this.animateIdle();
  }

  /**
   * Checks if character is doing nothing
   * @returns
   */
  isNotMoving() {
    return (
      !this.isRightPressed() &&
      !this.isLeftPressed() &&
      !this.isSpacePressed() &&
      !this.isThrowPressed() &&
      !this.isAboveGround()
    );
  }

  /**
   * Returns true if character idles longer than 5 seconds
   * @returns bool
   */
  checkIdleTime() {
    return new Date().getTime() - this.startIdle >= 5000;
  }

  /**
   * Checks if Character is jumping
   * true if key is pressed and character is not already above Ground
   * @returns
   */
  isJumping() {
    return this.world.keyboard.SPACE && !this.isAboveGround();
  }

  /**
   * Clear idleLong interval when exist
   * then start idle animation
   */
  animateIdle() {
    if (this.idledLong.length > 0 && !this.isJumping())
      clearInterval(this.idledLong);
    this.playAnimation(this.IMAGES_IDLE);
  }

  /**
   * animates character by inserting intervals
   */
  animate() {
    world.intervals.push(
      (this.idle = setInterval(() => this.startAnimateIdle(), (1000 / 90) * 10))
    );
    world.intervals.push(
      (this.idledLong = setInterval(
        () => this.startAnimateIdleLong(),
        (1000 / 90) * 10
      ))
    );
  }
}
