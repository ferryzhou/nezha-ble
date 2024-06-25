function moveForward () {
    neZha.setMotorSpeed(neZha.MotorList.M1, 10)
    neZha.setMotorSpeed(neZha.MotorList.M4, 10)
}
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
    x = parseFloat(receivedString.substr(0, 2))
    y = parseFloat(receivedString.substr(2, 2))
    z = parseFloat(receivedString.substr(4, 2))
    if (x == 0) {
        stop()
    } else if (x > 55) {
        rotateRight()
        basic.pause(10)
        stop()
    } else if (x <= 45) {
        rotateLeft()
        basic.pause(10)
        stop()
    } else { // stop if it's in the middle
        stop()
        shoot()
    }
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
function rotateRight () {
    neZha.setMotorSpeed(neZha.MotorList.M1, 10)
    neZha.setMotorSpeed(neZha.MotorList.M4, -10)
}
function rotateLeft() {
    neZha.setMotorSpeed(neZha.MotorList.M1, -10)
    neZha.setMotorSpeed(neZha.MotorList.M4, 10)
}
function stop() {
    neZha.setMotorSpeed(neZha.MotorList.M1, 0)
    neZha.setMotorSpeed(neZha.MotorList.M4, 0)
}
function shoot() {
    neZha.setServoAngel(neZha.ServoTypeList._180, neZha.ServoList.S4, 135)
    basic.pause(100)
    resetServo()
}
function resetServo() {
    neZha.setServoAngel(neZha.ServoTypeList._180, neZha.ServoList.S4, 90)
}
let z = 0
let y = 0
let x = 0
let receivedString = ""
bluetooth.startUartService()
basic.showIcon(IconNames.Square)
resetServo()