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
  PermissionsAndroid,
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
import BarcodeMask from 'react-native-barcode-mask';
import moment from 'moment'
import { CameraKitCameraScreen, } from 'react-native-camera-kit';
import { Base64 } from 'js-base64';

console.disableYellowBox = true;

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
      curTime: '',
      dueTime: '',

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
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA, {
      'title': 'CameraExample App Camera Permission',
      'message': 'CameraExample App needs access to your camera '
    }
    )
  }

  onBarcodeScan(qrvalue) {
    //called after te successful scanning of QRCode/Barcode
    // this.setState({ qrvalue: qrvalue });
    try {
      this.setState({ qrvalue: JSON.parse(Base64.decode(qrvalue)) });
      let temp = JSON.parse(Base64.decode(qrvalue));
      this.setState({ eventID: temp['eventID'] });
      this.setState({ dueTime: temp['time'] })
    } catch (err) {
      return;
    }
    this.setState({ openScanner: false });
  }

  onOpenScanner() {
    this.setState({ qrvalue: '' });
    this.setState({ openScanner: true });
  }
  confirm() {
    NetInfo.fetch().then(state => {
      var due = Date.parse(this.state.dueTime);
      var cur = Date.parse(moment().utcOffset('+07:00').format('DD/MM/YYYY HH:mm'));
      if (state.isConnected === true) {
        // If theres a connection then fetch the api
        fetch('http://dacs.xyz/attendance.php', {
          method: 'POST',
          //Create Json
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({

            mssv: this.state.mssv,
            ten: this.state.ten,
            tenLot: this.state.tenLot,
            email: this.state.email,
            lop: this.state.lop,
            eventID: this.state.eventID,
            due: this.state.dueTime,
          })

        }).then((response) => response.json()) // Get Json response
          .then((responseJson) => {
            if (responseJson === 'Success') {// If the change was success then navigates back to the login screen
              Alert.alert('Thông báo','Thành công!');
              console.log(responseJson);
              this.props.navigation.navigate('Profile');
            } else if(responseJson === 'Duplicated') {
              console.log(responseJson);
              Alert.alert('Thông báo','Chỉ được điểm danh 1 lần.');
            }else if(responseJson === 'Late'){
              Alert.alert('Thông báo','Đã hết hạn!');
            }

          }).catch((error) => {
            console.error(error);
          });

      } else {
        Alert.alert('Thông báo','Không có kết nối internet');//if there's no connection to the Internet then alert the user
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
                <View style={styles.container}>
                  <Text style={styles.infoHeader}>Hạn điểm danh</Text>
                  <Text style={styles.info}>{this.state.dueTime}</Text>
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
        <BarcodeMask width={250}
          height={250}
          transparency={0.3} />
      </View>
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
