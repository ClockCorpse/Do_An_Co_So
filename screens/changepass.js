
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Dimensions,
  TouchableOpacity,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import NetInfo from "@react-native-community/netinfo";
import { Base64 } from 'js-base64';
import md5 from 'md5';
import { ScrollView } from 'react-native-gesture-handler';
import Spinner from 'react-native-loading-spinner-overlay'

console.disableYellowBox = true;

export default class App extends Component {


  constructor(props) {
    super(props)
    this.state = {
      oldPassword: '',
      newPassword: '',
      newPasswordConfirm: '',
      mssv: '',
      mail: '',
      encrypted: '',
      newEncrypted: '',
      spinner: false,
    }
  }
  componentDidMount() {
    this._loadInitialState().done();
  }
  _loadInitialState = async () => {
    var value = await AsyncStorage.getItem('email');
    this.setState({ email: value });
  }

  // Encrypt the user's password and new password before sending it to the server
  encrypt_password = () => {
    var temp = md5(this.state.oldPassword);
    this.setState({ encrypted: temp });
  }

  encrypt_newPassword = () => {
    var temp = md5(this.state.newPassword);
    this.setState({ newEncrypted: temp });
  }

  // This speaks for itself(Change password function)
  changePass_Function = () => {
    this.setState({spinner:true});
    // Calls the encrypting functions
    this.encrypt_password();
    this.encrypt_newPassword();

    // Checking to see if the user's inputs are valid(More than 6 characters and both new password and confirm password must match)
    var valid = 1;
    if (this.state.newPassword.length < 6 || this.state.newPassword !== this.state.newPasswordConfirm) {
      valid = 0;
    } else {
      valid = 1;
    }
    //Check Internet connection before attempting to fetch api
    NetInfo.fetch().then(state => {
      if (state.isConnected === true) {
        // If theres a connection then fetch the api
        if (valid === 1) {
          fetch('http://dacs.xyz/change_pass.php', {
            method: 'POST',
            //Create Json
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({

              email: this.state.email,
              user_password: this.state.encrypted,
              new_user_password: this.state.newEncrypted,

            })

          }).then((response) => response.json()) // Get Json response
            .then((responseJson) => {
              if (responseJson === 'Changecomplete') {// If the change was success then navigates back to the login screen
                this.setState({spinner:false});
                Alert.alert(responseJson);
                this.props.navigation.navigate('Default');
              } else {
                this.setState({spinner:false});
                Alert.alert(responseJson);//if not then alert the user
              }

            }).catch((error) => {
              console.error(error);
            });
        } else {
          this.setState({spinner:false});
          Alert.alert('Mật khẩu quá ngắn hoặc xác nhận mật khẩu không chính xác');
        }
      } else {
        this.setState({spinner:false});
        Alert.alert('Không có kết nối internet');//if there's no connection to the Internet then alert the user
      }
    });
  }


  render() {
    return (
      <ScrollView>
        <View style={styles.body}>
        <Spinner
          visible={this.state.spinner}
          textContent={'Đang tải...'}
          textStyle={styles.spinnerTextStyle}
        />
          <View style={styles.mainContainer}>
            <View style={styles.container}>
              <Text style={styles.Text}>Nhập mật khẩu cũ: </Text>
              <TextInput
                placeholder="Password"
                style={styles.TextInput}
                secureTextEntry={true}
                onChangeText={data => this.setState({ oldPassword: data })}
              />
            </View>
            <View style={styles.container}>
              <Text style={styles.Text}>Nhập mật khẩu mới:</Text>
              <TextInput
                placeholder="New password"
                style={styles.TextInput}
                secureTextEntry={true}
                onChangeText={data => this.setState({ newPassword: data })} />
            </View>
            <View style={styles.container}>
              <Text style={styles.Text}>Xác nhận mật khẩu mới:</Text>
              <TextInput
                placeholder="Confirm new password"
                style={styles.TextInput}
                secureTextEntry={true}
                onChangeText={data => this.setState({ newPasswordConfirm: data })} />
            </View>
            <View style={styles.container}></View>
            <View style={styles.container}></View>
            <View style={styles.btncontainer} >
              <TouchableOpacity
                style={styles.btn}
                onPress={() => this.props.navigation.navigate('Profile')}>
                <Text style={styles.btnText} >Quay lại</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.btn}
                onPress={this.changePass_Function}
              >
                <Text style={styles.btnText}>Đổi mật khẩu</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  spinnerTextStyle: {
    color: '#FFF'
  },
  body: {
    padding: 25,
    backgroundColor: "#609810"
  },
  mainContainer: {
    padding: 20,
    display: "flex",
    height: 700,
    backgroundColor: "#fff",
    flexDirection: "column"
  },
  container: {
    flex: 1,
    marginBottom: 20,
    padding: 5,
  },
  Text: {
    fontSize: 15,
    margin: 5,
    color: "#609810"
  },
  TextInput: {
    fontSize: 17,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#777",
    padding: 10,
    margin: 10,
  },
  btncontainer: {
    flexDirection: "row",
    paddingVertical: 50,
    paddingHorizontal: 20,
    flex: 1,
  },
  btn: {
    backgroundColor: "#24a0ed",
    height: 40,
    width: 125,
    borderRadius: 5,
    padding: 10,
    margin: 10,
  },
  btnText: {
    color: "#fff",
    textAlign: "center"
  }

})