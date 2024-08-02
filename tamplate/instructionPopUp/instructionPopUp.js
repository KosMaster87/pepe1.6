"use strict";

export const instructionPopUp = `
        <!-- -------------------------------------------------------------- -->
        <!-- INSTRUCTION POPUP -->
        <!-- -------------------------------------------------------------- -->
        <div
          class="instructionPopUpSelf"
          id="instructionPopUpSelf"
          style="display: none"
        >
          <img
            class="instructionCloseBtn"
            id="instructionCloseBtn"
            style="display: block"
            src="./img/10_menu/close.svg"
            alt="Instruction Fenster Schließen."
            onclick="closeInstructionPopUpSelf_manuel()"
          />

          <img
          class="instructionCloseBtn"
          id="instructionCloseBtn_beginn"
          style="display: none"
          src="./img/10_menu/close.svg"
          alt="Instruction Fenster Schließen."
          onclick="closeInstructionPopUpSelf_manuel_beginn()"
        />

          <div class="instructionPopUpHelper">
            <div class="controllPanelMovement" id="controllPanelMovement">
              <div class="controllRight" id="controllRight">
                WALK RIGHT
                <img
                  src="./img/10_menu/arrow_forward.svg"
                  alt="Controll to the right key."
                />
              </div>
              <div class="controllLeft" id="controllLeft">
                WALK LEFT
                <img
                  src="./img/10_menu/arrow_back.svg"
                  alt="Controll to the left key."
                />
              </div>
              <div class="controllThrow" id="controllThrow">
                THROW YOUR SALSA
                <img src="/img/10_menu/point_scan.svg" alt="AIM key." />
              </div>
              <div class="controllJump" id="controllJump">
                JUMP OVER
                <img src="/img/10_menu/space_bar.svg" alt="Spacekey." />
              </div>
            </div>

            <div class="controllPanelBtn" id="controllPanelBtn">
              <button
                class="returnToMenuBtn"
                id="returnToMenuBtn"
                style="display: none"
                onclick="returnToMenu()"
              >
                RETURN TO MENU
              </button>

              <button
                class="restartAfterGameOverBtn"
                id="restartAfterGameOverBtn"
                style="display: none"
                onclick="restart()"
              >
                Restart game
              </button>
            </div>
          </div>
        </div>
`;
