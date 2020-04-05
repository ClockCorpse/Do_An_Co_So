import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  ToastAndroid,
  Dimensions,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { RNCamera } from 'react-native-camera';
 
//Once the QR code is detected, navigate to the confirmation screen with the information extracted from the code
barcodeRecognized = ({ barcodes }) => {
  barcodes.forEach(barcode => ToastAndroid.show(barcode.data,ToastAndroid.SHORT))
};

export default function App() {
  return (
    <View style={styles.container}>
      <RNCamera
         ref={ref => {
           this.camera = ref;
         }}
         style={{
           flex: 1,
           width: '100%',
           ...StyleSheet.absoluteFill,
         }}
         onGoogleVisionBarcodesDetected={this.barcodeRecognized}
       >
       </RNCamera>
       <View style={styles.qrArea}></View>
       <View style={{width: width/2,height: width/2,backgroundColor:'white',opacity:0.1}}></View>
       <View style={styles.qrArea1}>
           <View style={styles.qrArea2}>
             <View style={{flex:1,borderTopWidth:4,borderLeftWidth:4,borderColor:'#fff',borderRadius:3}}></View>
             <View style={{flex:1}}></View>
             <View style={{flex:1,borderTopWidth:4,borderRightWidth:4,borderColor:'#fff',borderRadius:3}}></View>
           </View>
           <View style={{flex:1}}></View>
           <View style={styles.qrArea2}>
            <View style={{flex:1,borderBottomWidth:4,borderLeftWidth:4,borderColor:'#fff',borderRadius:3}}></View>
             <View style={{flex:1}}></View>
             <View style={{flex:1,borderBottomWidth:4,borderRightWidth:4,borderColor:'#fff',borderRadius:3}}></View>
           </View>
        </View>
    </View>
  );
}

const{width}=Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  qrArea: {
    backgroundColor:'black',
    opacity:0.05,

  },
  qrArea1:{
    width: width/2,
    height: width/2,
    position:'absolute'
  },
  qrArea2:{
    flex:1,
    flexDirection:'row'
  },
});
