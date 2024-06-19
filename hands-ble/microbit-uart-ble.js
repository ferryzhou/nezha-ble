// https://lancaster-university.github.io/microbit-docs/resources/bluetooth/bluetooth_profile.html
// An implementation of Nordic Semicondutor's UART/Serial Port Emulation over Bluetooth low energy
const UART_SERVICE_UUID = "6e400001-b5a3-f393-e0a9-e50e24dcca9e";

// Allows the micro:bit to transmit a byte array
const UART_TX_CHARACTERISTIC_UUID = "6e400002-b5a3-f393-e0a9-e50e24dcca9e";

// Allows a connected client to send a byte array
const UART_RX_CHARACTERISTIC_UUID = "6e400003-b5a3-f393-e0a9-e50e24dcca9e";

let uBitDevice;
let rxCharacteristic;

async function connectButtonPressed() {
  try {
    console.log("Requesting Bluetooth Device...");
    uBitDevice = await navigator.bluetooth.requestDevice({
      filters: [{ namePrefix: "BBC micro:bit" }],
      optionalServices: [UART_SERVICE_UUID]
    });

    console.log("Connecting to GATT Server...");
    const server = await uBitDevice.gatt.connect();

    console.log("Getting Service...");
    const service = await server.getPrimaryService(UART_SERVICE_UUID);

    console.log("Getting Characteristics...");
    const txCharacteristic = await service.getCharacteristic(
      UART_TX_CHARACTERISTIC_UUID
    );
    txCharacteristic.startNotifications();
    txCharacteristic.addEventListener(
      "characteristicvaluechanged",
      onTxCharacteristicValueChanged
    );
    rxCharacteristic = await service.getCharacteristic(
      UART_RX_CHARACTERISTIC_UUID
    );
  } catch (error) {
    console.log(error);
  }
}

function disconnectButtonPressed() {
  if (!uBitDevice) {
    return;
  }

  if (uBitDevice.gatt.connected) {
    uBitDevice.gatt.disconnect();
    console.log("Disconnected");
  }
}

async function pingButtonPressed() {
  if (!rxCharacteristic) {
    return;
  }

  try {
    let encoder = new TextEncoder();
    rxCharacteristic.writeValue(encoder.encode("P\n"));
  } catch (error) {
    console.log(error);
  }
}

// Handle data from microbit
function onTxCharacteristicValueChanged(event) {
  let receivedData = [];
  for (var i = 0; i < event.target.value.byteLength; i++) {
    receivedData[i] = event.target.value.getUint8(i);
  }

  const receivedString = String.fromCharCode.apply(null, receivedData);
  console.log(receivedString);
  if (receivedString === "S") {
    console.log("Shaken!");
  }
}

// Queue operations to handle GATT operations one at a time
let queue = Promise.resolve();
function queueGattOperation(operation) {
    queue = queue.then(operation, operation);
    return queue;
}

// Send data to the micro:bit via UART
async function sendUART(str) {
    if (!rxCharacteristic) {
        console.log("Cannot send data, device is not connected.");
        return;
    }
    
    let encoder = new TextEncoder();
    let encodedData = encoder.encode(str + "\n");

    console.log(str)
    
    queueGattOperation(() => rxCharacteristic.writeValue(encodedData)
        .then(() => console.log("Data sent"))
        .catch(error => console.error('Error sending data:', error)));
}

function formatAndTrim(value) {
    // First, ensure the value is a number and clamp it within the range of 0 to 99
    let trimmedValue = Math.max(0, Math.min(99, value));
  
    // Now, format the number to be always two digits
    return trimmedValue.toString().padStart(2, '0');
  }
  
