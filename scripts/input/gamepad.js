import { GamepadController } from "../classes/keyController.js";

window.gamepadIndex = undefined;

window.addEventListener("gamepadconnected", (e) => {
    console.log(
      "Gamepad connected at index %d: %s. %d buttons, %d axes.",
      e.gamepad.index, e.gamepad.id, e.gamepad.buttons.length, e.gamepad.axes.length,
      e
    );
    // window.gamepad = navigator.getGamepads()[e.gamepad.index];
    window.gamepadIndex = e.gamepad.index;
    // window.currentlyPressedKeys[Commands.GAMEPAD_LEFT_AXIS_X] = e.axes[0];
    // window.currentlyPressedKeys[Commands.GAMEPAD_LEFT_AXIS_Y] = e.axes[1];
    // window.currentlyPressedKeys[Commands.GAMEPAD_RIGHT_AXIS_X] = e.axes[2];
    // window.currentlyPressedKeys[Commands.GAMEPAD_RIGHT_AXIS_Y] = e.axes[3];
});

window.addEventListener("gamepaddisconnected", (e) => {
    window.gamepadIndex = undefined;
    // window.currentlyPressedKeys.delete(Commands.GAMEPAD_LEFT_AXIS_X);
    // window.currentlyPressedKeys.delete(Commands.GAMEPAD_RIGHT_AXIS_Y);
    // window.currentlyPressedKeys.delete(Commands.GAMEPAD_LEFT_AXIS_X);
    // window.currentlyPressedKeys.delete(Commands.GAMEPAD_RIGHT_AXIS_Y);
});

window.gamepadEvent = function() { 
    if (window.gamepadIndex === undefined) return;

    /** Check every time for gamepad to be compliant with Chrome. */
    const gamepad = navigator.getGamepads()[window.gamepadIndex];
    // window.currentlyPressedKeys[Commands.GAMEPAD_LEFT_AXIS_X] = gamepad.axes[0];
    // window.currentlyPressedKeys[Commands.GAMEPAD_LEFT_AXIS_Y] = gamepad.axes[1];
    // window.currentlyPressedKeys[Commands.GAMEPAD_RIGHT_AXIS_X] = gamepad.axes[2];
    // window.currentlyPressedKeys[Commands.GAMEPAD_RIGHT_AXIS_Y] = gamepad.axes[3];

    GamepadController.pitch(window.player, normalize(gamepad.axes[1], 0.03, -0.03));
    GamepadController.roll(window.player, normalize(gamepad.axes[0], -0.07, 0.07));
    GamepadController.yaw(window.player, normalize(gamepad.axes[2], -0.05, 0.05));
    
}

function normalize(val, max, min) {
    if (val == 0) return 0;
    if (max == -min) return val * max;
    // return (val - min) / (max - min);
    return ((val + 1) / 2) * (max - min) + min;
}