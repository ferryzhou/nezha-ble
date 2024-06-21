# nezha-ble

## Demos

- https://ferryzhou.github.io/nezha-ble/hands/index.htm
- https://ferryzhou.github.io/nezha-ble/ble/index.htm
- https://ferryzhou.github.io/nezha-ble/hands-ble/index.htm

## Bluetooth Code in Microbit

For Makecode bluetooth extension, remember add the following code to pxt.json:

```
    "yotta": {
        "config": {
            "microbit-dal": {
                "bluetooth": {
                    "open": 1,
                    "pairing_mode": 0,
                    "whitelist": 0
                }
            }
        }
    }
```

## References

Micro:bit Bluetooth

- https://gist.github.com/kotobuki/7c67f8b9361e08930da1a5cfcfb0653f
- https://cardboard.lofirobot.com/control-microbit/

MediaPipe

- https://github.com/pjbelo/mediapipe-js-demos
- https://cardboard.lofirobot.com/face-app-info/


VSCode Web

- https://code.visualstudio.com/docs/editor/vscode-web