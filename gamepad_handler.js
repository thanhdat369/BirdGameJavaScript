function gamepadEventCheck(func) {
    let gamepads = navigator.getGamepads();
    for (let i = 0; i < gamepads.length; i++) {
        let gamepad = gamepads[i];

        if (!gamepad) {
            return;
        }

        const BUTTON_RB = 5;
        if (gamepad.buttons[BUTTON_RB].pressed) {
            func();
        }
    }
}
