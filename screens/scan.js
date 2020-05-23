import React, { Component } from 'react';
//import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  ToastAndroid,
  Dimensions,
  TouchableHighlight,
  TouchableOpacity,
  Alert,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import AsyncStorage from '@react-native-community/async-storage';
import NetInfo from '@react-native-community/netinfo';

import { CameraKitCameraScreen, } from 'react-native-camera-kit';
import { Base64 } from 'js-base64';

//Once the QR code is detected, navigate to the confirmation screen with the information extracted from the code


// export default function App() {
//   return (
export default class App extends Component {
  constructor() {
    super();
    this.state = {
      //variable to hold the qr value
      qrvalue: '',
      openScanner: false,
      ten: '',
      tenLot: '',
      mssv: '',
      lop: '',
      email: '',
      eventID: '',

    };
  }
  componentDidMount() {
    this._loadInitialState().done();
  }
  _loadInitialState = async () => {
    var value = await AsyncStorage.getItem('ten');
    this.setState({ ten: value });
    var value = await AsyncStorage.getItem('tenLot');
    this.setState({ tenLot: value });
    var value = await AsyncStorage.getItem('mssv');
    this.setState({ mssv: value });
    var value = await AsyncStorage.getItem('lop');
    this.setState({ lop: value });
    var value = await AsyncStorage.getItem('email');
    this.setState({ email: value });
  }

  onBarcodeScan(qrvalue) {
    //called after te successful scanning of QRCode/Barcode
    // this.setState({ qrvalue: qrvalue });
    try {
      this.setState({ qrvalue: JSON.parse(Base64.decode(qrvalue)) });
      let temp = JSON.parse(Base64.decode(qrvalue));
      this.setState({eventID:temp['eventID']});
    } catch (err) {
      return;
    }
    this.setState({ openScanner: false});
  }

  onOpenScanner() {
    this.setState({ qrvalue: '' });
    this.setState({ openScanner: true });
  }
  confirm() {
    NetInfo.fetch().then(state => {
      if (state.isConnected === true) {
        // If theres a connection then fetch the api
        fetch('https://rightward-horizons.000webhostapp.com/attendance.php', {
          method: 'POST',
          //Create Json
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({

            mssv: this.state.mssv,
            ten:this.state.ten,
            tenLot:this.state.tenLot,
            email:this.state.email,
            lop: this.state.lop,
            eventID:this.state.eventID,
          })

        }).then((response) => response.json()) // Get Json response
          .then((responseJson) => {
            if (responseJson === 'Success') {// If the change was success then navigates back to the login screen
              Alert.alert(responseJson);
              console.log(responseJson);
              this.props.navigation.navigate('Profile');
            } else {
              console.log(responseJson);
              Alert.alert(responseJson);//if not then alert the user
            }

          }).catch((error) => {
            console.error(error);
          });
      } else {
        Alert.alert('Không có kết nối internet');//if there's no connection to the Internet then alert the user
      }
    });
  }




  render() {
    const width = Dimensions.get('screen');
    if (!this.state.openScanner && this.state.qrvalue['sig'] == 'DLU') {
      return (
        <ScrollView>
          <View style={styles.mainContainer}>
            {this.state.qrvalue ?
              <View>
                <View style={styles.container}>
                  <Text style={styles.infoHeader}>Họ Tên Lót</Text>
                  <Text style={styles.info}>{this.state.tenLot}</Text>
                </View>
                <View style={styles.container}>
                  <Text style={styles.infoHeader}>Tên</Text>
                  <Text style={styles.info}>{this.state.ten}</Text>
                </View>
                <View style={styles.container}>
                  <Text style={styles.infoHeader}>MSSV</Text>
                  <Text style={styles.info}>{this.state.mssv}</Text>
                </View>
                <View style={styles.container}>
                  <Text style={styles.infoHeader}>Lớp</Text>
                  <Text style={styles.info}>{this.state.lop}</Text>
                </View>
                <View style={styles.container}>
                  <Text style={styles.infoHeader}>Mã sự kiện</Text>
                  <Text style={styles.info}>{this.state.qrvalue['eventName']}</Text>
                </View>

                <View style={styles.container}>
                  <Text style={styles.infoHeader}>Mã sự kiện</Text>
                  <Text style={styles.info}>{this.state.eventID}</Text>
                </View>
              </View>
              : null
            }
            <View style={styles.footer}>
              <TouchableOpacity
                onPress={() => this.onOpenScanner()}
                style={styles.buttonRescan}>
                <Text style={styles.buttonRescanText}>
                  Quét lại
                  </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Profile')}
                style={styles.buttonExit}>
                <Text style={{ color: '#FFFFFF', fontSize: 12, textAlign: "center" }}>
                  Quay lại
                  </Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              onPress={() => this.confirm()}
              style={styles.btnConfirm}>
              <Text style={{ color: '#FFFFFF', fontSize: 12, textAlign: "center" }}>
                Xác nhận
                  </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      );
    }
    return (

      <View style={{ flex: 1 }}>
        <CameraKitCameraScreen
          showFrame={false}
          //Show/hide scan frame
          scanBarcode={true}
          //Can restrict for the QR Code only
          laserColor={'blue'}
          //Color can be of your choice
          frameColor={'yellow'}
          //If frame is visible then frame color
          colorForScannerFrame={'black'}
          //Scanner Frame color
          onReadCode={event =>
            this.onBarcodeScan(event.nativeEvent.codeStringValue)
          }
        />
      </View>

      // <View style={styles.container}>
      //   <RNCamera
      //      ref={ref => {
      //        this.camera = ref;
      //      }}
      //      style={{
      //        flex: 1,
      //        width: '100%',
      //        ...StyleSheet.absoluteFill,
      //      }}
      //      onGoogleVisionBarcodesDetected={this.barcodeRecognized}
      //    >
      //    </RNCamera>
      //    <View style={styles.qrArea}></View>
      //    <View style={{width: width/2,height: width/2,backgroundColor:'white',opacity:0.1}}></View>
      //    <View style={styles.qrArea1}>
      //        <View style={styles.qrArea2}>
      //          <View style={{flex:1,borderTopWidth:4,borderLeftWidth:4,borderColor:'#fff',borderRadius:3}}></View>
      //          <View style={{flex:1}}></View>
      //          <View style={{flex:1,borderTopWidth:4,borderRightWidth:4,borderColor:'#fff',borderRadius:3}}></View>
      //        </View>
      //        <View style={{flex:1}}></View>
      //        <View style={styles.qrArea2}>
      //         <View style={{flex:1,borderBottomWidth:4,borderLeftWidth:4,borderColor:'#fff',borderRadius:3}}></View>
      //          <View style={{flex:1}}></View>
      //          <View style={{flex:1,borderBottomWidth:4,borderRightWidth:4,borderColor:'#fff',borderRadius:3}}></View>
      //        </View>
      //     </View>
      // </View>
    );
  }
}


const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 30,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonRescan: {
    width: 140,
    padding: 7,
    marginHorizontal: 10,
    borderRadius: 5,
  },
  buttonRescanText: {
    textAlign: 'center',
    color: '#24a0de'
  },
  buttonExit: {
    width: 140,
    padding: 7,
    marginHorizontal: 10,
    borderRadius: 5,
    backgroundColor: '#24A0DE',
  },
  footer: {
    marginTop: 75,
    flexDirection: "row",
    justifyContent: 'center'
  },
  btnScan: {
    width: 140,
    backgroundColor: "#609810",
    borderRadius: 5,
    marginTop: 10,
    padding: 7,
  },
  btnConfirm: {
    backgroundColor: "#609810",
    borderRadius: 5,
    marginTop: 20,
    padding: 7,
  },
  container: {
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
  infoHeader: {
    color: '#609810',
    margin: 10,
    fontSize: 15,
  },
  info: {
    fontSize: 20,
    margin: 15,
  },
  // qrArea: {
  //   backgroundColor:'black',
  //   opacity:0.05,

  // },
  // qrArea1:{
  //   width: width/2,
  //   height: width/2,
  //   position:'absolute'
  // },
  // qrArea2:{
  //   flex:1,
  //   flexDirection:'row'
  // },
});
