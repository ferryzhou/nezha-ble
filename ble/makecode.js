bluetooth.onBluetoothConnected(function () {
    basic.showIcon(IconNames.Yes)
})
bluetooth.onBluetoothDisconnected(function () {
    basic.showIcon(IconNames.No)
})
input.onButtonPressed(Button.A, function () {
    bluetooth.uartWriteString("A")
})
bluetooth.onUartDataReceived(serial.delimiters(Delimiters.NewLine), function () {
    receivedString = bluetooth.uartReadUntil(serial.delimiters(Delimiters.NewLine))
    if (receivedString == "P") {
        basic.showIcon(IconNames.Heart)
        basic.pause(100)
        basic.showIcon(IconNames.Yes)
    }
})
input.onButtonPressed(Button.B, function () {
    bluetooth.uartWriteString("B")
})
input.onGesture(Gesture.Shake, function () {
    bluetooth.uartWriteString("S")
})
let receivedString = ""
bluetooth.startUartService()
basic.showIcon(IconNames.Square)
