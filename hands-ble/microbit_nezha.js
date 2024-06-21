bluetooth.onBluetoothConnected(function () {
    basic.showIcon(IconNames.Happy)
})
bluetooth.onBluetoothDisconnected(function () {
    basic.showIcon(IconNames.No)
})
bluetooth.onUartDataReceived(serial.delimiters(Delimiters.NewLine), function () {
    receivedString = bluetooth.uartReadUntil(serial.delimiters(Delimiters.NewLine))
    x = parseFloat(receivedString.substr(0, 2))
    y = parseFloat(receivedString.substr(2, 2))
    z = parseFloat(receivedString.substr(4, 2))
})
let z = 0
let y = 0
let x = 0
let receivedString = ""
bluetooth.startUartService()
basic.showIcon(IconNames.Square)
