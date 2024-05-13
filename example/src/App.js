import * as React from 'react';

import { StyleSheet, View, Text, Button } from 'react-native';
import { isBluetoothEnabled, listsBloetoothDeviceLists, printBluetoothSelectDevice } from 'react-native-multi-bluetooth-printer';

export default function App() {

  const [printer, setPrinter] = React.useState([])

  const getBluetoothIsEnabled = async () => {
    await isBluetoothEnabled().then((granted) => {
      if (granted) {
        alert("Your Bluetooth is Enable")
      }
      else {
        alert("Your Bluetooth is Disabled")
      }
   }, (err) => {
      alert(err)
   })
  }

  const getListsBloetoothDeviceLists = async () => {
    await listsBloetoothDeviceLists().then((lists) => {
      console.log(JSON.stringify(lists));
      setPrinter(lists)
    }) 
  }

  const handleMultiPrint = async () => {
    for (let i = 0; i < printer.length; i++ ) {
      let params = {
        payload : 
        "[L]\n" +
        "[C]<u><font size='big'>ORDER N°045</font></u>\n" +
        "[L]\n" +
        "[C]================================\n" +
        "[L]\n" +
        "[L]<b>BEAUTIFUL SHIRT</b>[R]9.99e\n" +
        "[L]  + Size : S\n" +
        "[L]\n" +
        "[L]<b>AWESOME HAT</b>[R]24.99e\n" +
        "[L]  + Size : 57/58\n" +
        "[L]\n" +
        "[C]--------------------------------\n" +
        "[R]TOTAL PRICE :[R]34.98e\n" +
        "[R]TAX :[R]4.23e\n" +
        "[L]\n" +
        "[C]================================\n" +
        "[L]\n" +
        "[L]<font size='tall'>Customer :</font>\n" +
        "[L]Raymond DUPONT\n" +
        "[L]5 rue des girafes\n" +
        "[L]31547 PERPETES\n" +
        "[L]Tel : +33801201456\n" +
        "[L]\n" +
        "[C]<barcode type='ean13' height='10'>831254784551</barcode>\n" +
        "[L]\n" +
        "[C]<qrcode size='20'>https://dantsu.com/</qrcode>\n",
        deviceAddress: printer[i].deviceAddress
      }

      await printBluetoothSelectDevice(params).then(() => alert('Success'))
      .catch ((e) => {
        alert(JSON.stringify(e))
      })
    }
  }

  return (
    <View>
      <Button
        tittle={'Test Bluetooth Enable'}
        onPress={() => getBluetoothIsEnabled()}
      />
      <View style={{marginBottom: 16}} />
      <Button
        tittle={'get Lists Connected Device'}
        onPress={() => getListsBloetoothDeviceLists()}
      />
      <View style={{marginBottom: 16}} />
      <Button
        tittle={'Test Multi Print'}
        onPress={() => handleMultiPrint()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
