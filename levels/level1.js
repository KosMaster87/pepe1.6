"use strict";

/**
 * Im Grunde ist "level1" nur eine Hilfsdatei.
 * Die eigentlichen Platzhalter für die Objekte sind in der "class Level" Deklaliert.
 * Durch die Erstellung von "new Level" wird durch die Parameter in dem "constructor" der "class Level" die Objekte in den Jeweiligen Variablen gesetzt.\
 * Beachte die Reichenfolge der Parameter in dem "construktor" und zu dem "new Level" Objekt.
 */

/**
 * best chatGPT practices (empfohlene Vorgehensweise).
 * Funktion, um eine bestimmte Anzahl von Objekten zu erstellen
 */
function createObjects(count, createFunc) {
  const objects = [];
  for (let i = 0; i < count; i++) {
    objects.push(createFunc());
  }
  return objects;
}

/**
 * Funktion, um die Level-Objekte zu erstellen
 * @returns Die Objekte, also: enemies, clouds und background.
 */
function createLevel() {
  const chickens = createObjects(3, () => new Chicken());
  const chicks = createObjects(3, () => new Chick());
  const clouds = createObjects(30, () => new Cloud());
  const bottles = createObjects(30, () => new Bottle());

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

/**
 * Initialisiere das Level und erstelle die Level-Objekte.
 * Soll erst beim Starten des Spieles gesetzt werden.
 */
function initLevel() {
  level1 = createLevel();
}
