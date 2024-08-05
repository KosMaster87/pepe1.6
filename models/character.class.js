"use strict";

class Character extends MovableObject {
  IMAGES_WALKING = [
    "./img/2_character_pepe/2_walk/W-21.png",
    "./img/2_character_pepe/2_walk/W-22.png",
    "./img/2_character_pepe/2_walk/W-23.png",
    "./img/2_character_pepe/2_walk/W-24.png",
    "./img/2_character_pepe/2_walk/W-25.png",
    "./img/2_character_pepe/2_walk/W-26.png",
  ];

  IMAGES_JUMPING = [
    "./img/2_character_pepe/3_jump/J-31.png",
    "./img/2_character_pepe/3_jump/J-32.png",
    "./img/2_character_pepe/3_jump/J-33.png",
    "./img/2_character_pepe/3_jump/J-34.png",
    "./img/2_character_pepe/3_jump/J-35.png",
    "./img/2_character_pepe/3_jump/J-36.png",
    "./img/2_character_pepe/3_jump/J-37.png",
    "./img/2_character_pepe/3_jump/J-38.png",
    "./img/2_character_pepe/3_jump/J-39.png",
  ];

  IMAGES_HURT = [
    "./img/2_character_pepe/4_hurt/H-41.png",
    "./img/2_character_pepe/4_hurt/H-42.png",
    "./img/2_character_pepe/4_hurt/H-43.png",
  ];

  IMAGES_DEAD = [
    "./img/2_character_pepe/5_dead/D-51.png",
    "./img/2_character_pepe/5_dead/D-52.png",
    "./img/2_character_pepe/5_dead/D-53.png",
    "./img/2_character_pepe/5_dead/D-54.png",
    "./img/2_character_pepe/5_dead/D-55.png",
    "./img/2_character_pepe/5_dead/D-56.png",
    "./img/2_character_pepe/5_dead/D-57.png",
  ];

  IMAGES_IDLE = [
    "./img/2_character_pepe/1_idle/idle/I-1.png",
    "./img/2_character_pepe/1_idle/idle/I-2.png",
    "./img/2_character_pepe/1_idle/idle/I-3.png",
    "./img/2_character_pepe/1_idle/idle/I-4.png",
    "./img/2_character_pepe/1_idle/idle/I-5.png",
    "./img/2_character_pepe/1_idle/idle/I-6.png",
    "./img/2_character_pepe/1_idle/idle/I-7.png",
    "./img/2_character_pepe/1_idle/idle/I-8.png",
    "./img/2_character_pepe/1_idle/idle/I-9.png",
    "./img/2_character_pepe/1_idle/idle/I-10.png",
  ];

  IMAGES_SLEEP = [
    "./img/2_character_pepe/1_idle/long_idle/I-11.png",
    "./img/2_character_pepe/1_idle/long_idle/I-12.png",
    "./img/2_character_pepe/1_idle/long_idle/I-13.png",
    "./img/2_character_pepe/1_idle/long_idle/I-14.png",
    "./img/2_character_pepe/1_idle/long_idle/I-15.png",
    "./img/2_character_pepe/1_idle/long_idle/I-16.png",
    "./img/2_character_pepe/1_idle/long_idle/I-17.png",
    "./img/2_character_pepe/1_idle/long_idle/I-18.png",
    "./img/2_character_pepe/1_idle/long_idle/I-19.png",
    "./img/2_character_pepe/1_idle/long_idle/I-20.png",
  ];

  walking_sound = new Audio("./audio/walkingCharacter.mp3");

  height = 170;
  width = 95;
  x = 0;
  y = 270;
  speed = 5;
  world;

  bottles = [];
  maxBottles = 5;

  idleStart;
  sleepStart;
  idle = false;
  sleep = false;

  constructor() {
    super().loadImage("./img/2_character_pepe/2_walk/W-21.png");
    this.idleStart = Date.now();
    this.sleepStart = Date.now();
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_JUMPING);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_IDLE);
    this.loadImages(this.IMAGES_SLEEP);
    this.applyGravity();
    this.animate();
  }

  /**\
   * Die Abfrage des Koliding stellt sich hier nicht sondern checkCollisions().
   */
  collectBottle() {
    this.bottles.push(new Bottle());
    console.log("Bottle collected:", this.bottles.length);
  }

  // -----------------------------------------------------------
  // Für das Nichtstun.
  // -----------------------------------------------------------

  idleTimer() {
    let idleTime = (Date.now() - this.idleStart) / 1000;
    return idleTime >= 0.1;
  }

  sleepTimer() {
    let sleepTime = (Date.now() - this.sleepStart) / 1000;
    return sleepTime >= 2.5;
  }

  resetTimers() {
    this.reset_idleStartTimer();
    this.reset_sleepStartTimer();
  }

  reset_sleepStartTimer() {
    this.sleepStart = Date.now();
  }

  reset_idleStartTimer() {
    this.idleStart = Date.now();
  }

  // -----------------------------------------------------------

  /**
   * Speed options and running direction.
   * Also some animations.
   */
  animate() {
    setStoppableInterval(() => this.pepeMove(), 1000 / 60);
    setStoppableInterval(() => this.pepeAnimate(), 1000 / 7);
  }

  /**
   * Control Pepe using the enter keys.
   */
  pepeMove() {
    this.walking_sound.pause();

    if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
      this.pepeMoveRightOptions();
      this.pepesIdle_false();
    }

    if (this.world.keyboard.LEFT && this.x > -500) {
      this.pepeMoveLeftOptions();
      this.pepesIdle_false();
    }

    if (
      (this.world.keyboard.SPACE && !this.isAboveGround()) ||
      (this.world.keyboard.UP && !this.isAboveGround())
    ) {
      this.jump();
      this.pepesIdle_false();
    }
    this.world.camera_x = -this.x + 150;
  }

  /**
   *
   */
  pepesIdle_false() {
    this.resetTimers();
    this.idle = false;
    this.sleep = false;
  }

  /**
   * Some auto playback images and gameOver.
   */
  pepeAnimate() {
    if (this.isHurt() && !this.isDead()) {
      this.animateHurt();
    } else if (this.isDead()) {
      this.animateDead();
    } else if (this.isAboveGround()) {
      this.animateJumping();
    } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
      this.animateWalking();
    } else if (
      this.idleTimer() &&
      !this.isAboveGround() &&
      !this.isHurt() &&
      !this.isDead()
    ) {
      if (this.sleepTimer()) {
        this.animateSleeping();
        this.sleep = true;
        this.idle = false;
      } else {
        this.animateIdle();
        this.idle = true;
        this.sleep = false;
      }
    }
  }

  // -------------------------------------------------------------------
  // Die Anweisungen aus den "pepeAnimationen".
  // -------------------------------------------------------------------

  animateHurt() {
    this.playAnimation(this.IMAGES_HURT);
    this.resetTimers();
  }

  animateDead() {
    this.playAnimation(this.IMAGES_DEAD);
    gameOver();
  }

  animateJumping() {
    this.playAnimation(this.IMAGES_JUMPING);
    this.resetTimers();
  }

  animateWalking() {
    this.playAnimation(this.IMAGES_WALKING);
    this.resetTimers();
  }

  animateIdle() {
    this.playAnimation(this.IMAGES_IDLE);
    this.reset_idleStartTimer(); // Ist ja auf "true" bis durchinteraktion auf "false" oder durch "animateSleeping"
  }

  animateSleeping() {
    this.playAnimation(this.IMAGES_SLEEP);
  }

  // -------------------------------------------------------------------

  /**
   * The functions when Pepe moving right.
   */
  pepeMoveRightOptions() {
    this.moveRight();
    this.otherDirection = false;
    this.walking_sound.play();
  }

  /**
   * The functions when Pepe moving left.
   */
  pepeMoveLeftOptions() {
    this.moveLeft();
    this.otherDirection = true;
    this.walking_sound.play();
  }
}
