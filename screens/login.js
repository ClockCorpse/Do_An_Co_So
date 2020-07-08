import React, { Component } from 'react';

import { StyleSheet, TextInput, View, Alert, TouchableOpacity, Text, Image, ToastAndroid, } from 'react-native';
import NetInfo from "@react-native-community/netinfo";
import AsyncStorage from '@react-native-community/async-storage';
import md5 from 'md5'
import Spinner from 'react-native-loading-spinner-overlay'

console.disableYellowBox = true;

export default class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      name: '',
      mssv: '',
      password: '',
      encrypted: '',
      spinner: false,
    }
  }

  // Encrypt the user's password before sending it to the server
  encrypt_password = () => {
    var temp = md5(this.state.password);
    this.setState({ encrypted: temp });
  }

  login_Function = () => {
    var format = /[']/;
    if (!format.test(this.state.mssv)) {
      this.encrypt_password();
      //console.log(md5(this.state.password));
      //Check Internet connection before attempting to fetch api
      NetInfo.fetch().then(state => {
        if (state.isConnected === true) {
          this.setState({ spinner: true });
          // If theres a connection then fetch the api
          fetch('http://dacs.xyz/login_api.php', {
            method: 'POST',
            //Create JSON
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({

              email: this.state.mssv,
              user_password: this.state.encrypted

            })

          }).then((response) => response.json()) //get Json response
            .then((responseJson) => {
              //Alert.alert(responseJson); //for debugging purpose
              if (responseJson.result === 'Matched') {//If it matches then navigate to profile activity
                var ID = responseJson.ID;
                var ten = responseJson.ten;
                var tenLot = responseJson.tenLot;
                var mssv = responseJson.mssv;
                var email = responseJson.email;
                var lop = responseJson.lop;
                var role = responseJson.role;
                AsyncStorage.setItem('ID', ID);
                AsyncStorage.setItem('ten', ten);
                AsyncStorage.setItem('tenLot', tenLot);
                AsyncStorage.setItem('mssv', mssv);
                AsyncStorage.setItem('email', email);
                AsyncStorage.setItem('lop', lop);
                AsyncStorage.setItem('role', role);
                this.setState({ spinner: false });
                this.props.navigation.push('Profile');
              } else {
                this.setState({ spinner: false });
                console.log(responseJson);
                Alert.alert('Thông báo','Email hoặc mật khẩu không chính xác');//if not then alert the user
              }

            }).catch((error) => {
              console.error(error);
            });
        } else {
          Alert.alert('Thông báo','Không có kết nối internet');//if there's no connection to the Internet then alert the user
        }
      });
    } else {
      Alert.alert('Thông báo','Địa chỉ email không hợp lệ');
    }
  }
  //front end stuffs from here
  render() {
    return (

      <View style={styles.container}>
        <Spinner
          visible={this.state.spinner}
          textContent={'Đang tải...'}
          textStyle={styles.spinnerTextStyle}
        />
        <View style={styles.box}>
          <Image source={require('../logo_DLU.png')} />
          <Text>---------- -*- ----------</Text>
          <View style={styles.input}>
            <Image source={require('../email_icon.png')}
              style={styles.ImageStyle} />
            <TextInput
              placeholder="Email"
              onChangeText={data => this.setState({ mssv: data })}
              underlineColorAndroid='transparent'
              //style={styles.input}
              style={{ backgroundColor: 'transparent', width:195 }}
            />
          </View>

          <View style={styles.input}>
            <Image source={require('../password_icon.png')}
              style={styles.ImageStyle} />
            <TextInput
              placeholder="Mật khẩu"
              onChangeText={data => this.setState({ password: data })}
              underlineColorAndroid='transparent'
              style={{ backgroundColor: 'transparent', width:195 }}
              secureTextEntry={true}
            />
          </View>

          <TouchableOpacity style={styles.buttonContainer} onPress={this.login_Function} >

            <Text style={styles.text}>Đăng nhập </Text>

          </TouchableOpacity>
        </View>

      </View>

    );
  }
}




const styles = StyleSheet.create({
  spinnerTextStyle: {
    color: '#FFF'
  },
  container: {
    flex: 1,
    backgroundColor: '#609810',
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    backgroundColor: '#fff',
    width: 300,
    height: 500,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius:10,
  },
  input: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#777',
    width: 250,
    padding: 5,
    margin: 10,
    flexDirection: 'row'
  },
  buttonContainer: {
    width: 250,
    margin: 10,
    backgroundColor: '#24A0DE',
    borderRadius: 5
  },
  text: {
    padding: 8,
    color: '#fff',
    textAlign: 'center'
  },
  TextComponentStyle: {
    fontSize: 20,
    color: "#000",
    textAlign: 'center',
    marginBottom: 15
  },
  ImageStyle: {
    padding: 15,
    margin: 5,
    marginTop:8,
    height: 30,
    width: 30,
    alignItems: 'center',
    backgroundColor:'transparent'
  },
});
