window.currentlyPressedKeys = new Map();
function handleKeypress() {
  for (let key of  window.currentlyPressedKeys.keys()) {
    window.player.onKeyPress(key)
  }
}