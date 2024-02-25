import { GamepadController } from "./inputController.js";

window.gamepadIndex = undefined;

window.addEventListener("gamepadconnected", (e) => {
    console.log(
      "Gamepad connected at index %d: %s. %d buttons, %d axes.",
      e.gamepad.index, e.gamepad.id, e.gamepad.buttons.length, e.gamepad.axes.length,
      e
    );
    window.gamepadIndex = e.gamepad.index;
});

window.addEventListener("gamepaddisconnected", (e) => {
    window.gamepadIndex = undefined;
});

window.gamepadEvent = function() { 
    if (window.gamepadIndex === undefined) return;

    /** Check every time for gamepad to be compliant with Chrome. */
    const gamepad = navigator.getGamepads()[window.gamepadIndex];
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