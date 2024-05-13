import { NativeModules } from 'react-native';

type BluetoothPrinter = {
  deviceName: string;
  deviceAddress: string;
  devicesUnique: string;
  uuid: string;
};

type NativeModuleType = typeof NativeModules & {
  MultiBluetoothPrinter: {
    isBluetoothEnabled() : Promise<void>;
    listsBloetoothDeviceLists(): Promise<BluetoothPrinter[]>;
    printBluetoothSelectDevice(
      payload: string,
      deviceAddress: string
    ) : Promise<void>;
  };
};

const { MultiBluetoothPrinter }: NativeModuleType =
  NativeModules as NativeModuleType;

interface PrinterInterface {
  payload: string;
  deviceAddress: string;
}

interface PrintBluetoothInterface extends PrinterInterface {
  payload: string;
  deviceAddress: string;
}

let defaultConfig: PrintBluetoothInterface = {
  deviceAddress: '',
  payload: ''
};

const getConfig = (
  args: Partial<typeof defaultConfig>
): typeof defaultConfig => {
  return Object.assign({}, defaultConfig, args);
};

const isBluetoothEnabled = () => {
  return MultiBluetoothPrinter.isBluetoothEnabled();
};

const listsBloetoothDeviceLists = () => {
  return MultiBluetoothPrinter.listsBloetoothDeviceLists();
};

const printBluetoothSelectDevice = (
  args: Partial<PrintBluetoothInterface>
): Promise<void> => {
  const {
    payload,
    deviceAddress
  } = getConfig(args);

  return MultiBluetoothPrinter.printBluetoothSelectDevice(
    payload, deviceAddress
  );
};

export default {
  isBluetoothEnabled,
  listsBloetoothDeviceLists,
  printBluetoothSelectDevice,
};
