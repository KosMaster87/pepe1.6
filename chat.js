function createLevel() {
  const chickens = createObjects(30, () => new Chicken());
  const chicks = createObjects(30, () => new Chick());
  const clouds = createObjects(30, () => new Cloud());
  const bottles = createObjects(
    10,
    () => new Bottle(Math.random() * 4000, Math.random() * 300)
  );

  let enemies = [...chickens, ...chicks];
  enemies.push(new Endboss());

  const backgroundObjects = [];
  const positions = [
    -719,
    0,
    719,
    719 * 2,
    719 * 3,
    719 * 4,
    719 * 5,
    719 * 6,
    719 * 7,
    719 * 8,
  ];

  positions.forEach((pos, index) => {
    const layerNumber = (index % 2) + 1;
    backgroundObjects.push(
      new BackgroundObject("./img/5_background/layers/air.png", pos)
    );
    backgroundObjects.push(
      new BackgroundObject(
        `./img/5_background/layers/3_third_layer/${layerNumber}.png`,
        pos
      )
    );
    backgroundObjects.push(
      new BackgroundObject(
        `./img/5_background/layers/2_second_layer/${layerNumber}.png`,
        pos
      )
    );
    backgroundObjects.push(
      new BackgroundObject(
        `./img/5_background/layers/1_first_layer/${layerNumber}.png`,
        pos
      )
    );
  });

  return new Level(enemies, clouds, backgroundObjects, bottles);
}
