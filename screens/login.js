import React, { Component } from 'react';
 
import { StyleSheet, TextInput, View, Alert, TouchableOpacity, Text,Image,ToastAndroid, } from 'react-native';
import NetInfo from "@react-native-community/netinfo";
import AsyncStorage from '@react-native-community/async-storage'; 
import { Base64 } from 'js-base64'



export default class App extends Component {
  
  constructor(props) {
    super(props)
 
    this.state = {
      name: '',
      mssv: '',
      password: '',
      encrypted:'',

    }
  }

  // Encrypt the user's password before sending it to the server
  encrypt_password=()=>{
    var temp = Base64.encode(this.state.password);
    this.setState({encrypted:temp});
  }
  
  login_Function = () => {
    Alert.alert('Please wait');// To prevent the user from spamming the login button
    this.encrypt_password();
    //Check Internet connection before attempting to fetch api
    NetInfo.fetch().then(state=>{
      if(state.isConnected === true){
        // If theres a connection then fetch the api
        fetch('https://rightward-horizons.000webhostapp.com/login_api.php', {
      method: 'POST',
      //Create JSON
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
 
        mssv: this.state.mssv,
        user_password: this.state.encrypted
 
      })
 
    }).then((response) => response.json()) //get Json response
      .then((responseJson) => {
            //Alert.alert(responseJson); for debugging purpose
            if(responseJson.result === 'Matched'){//If it matches then navigate to profile activity
                var username = responseJson.user_name;
                var mssv = responseJson.mssv;
                var email = responseJson.email;
                var lop = responseJson.lop;
                AsyncStorage.setItem('name',username);
                AsyncStorage.setItem('mssv',mssv);
                AsyncStorage.setItem('email',email);
                AsyncStorage.setItem('lop',lop);
                this.props.navigation.push('Profile');
            }else{
                Alert.alert(responseJson);//if not then alert the user
            }
        
      }).catch((error) => {
        console.error(error);
      });
      }else{
        Alert.alert('No connection to the internet');//if there's no connection to the Internet then alert the user
      }
    });
    
 
 
  }
 //front end stuffs from here
  render() {
    return (
 
      <View style={styles.container}>
        <View style={styles.box}>
        <Image source={require('../logo_DLU.png')} />
         <Text>---------- -*- ----------</Text>

        <TextInput
          placeholder="MSSV"
          onChangeText={data => this.setState({ mssv: data })}
          underlineColorAndroid='transparent'
          style={styles.input}
          keyboardType='numeric'
        />
 
        <TextInput
          placeholder="Mật khẩu"
          onChangeText={data => this.setState({ password: data })}
          underlineColorAndroid='transparent'
          style={styles.input}
          secureTextEntry={true}
        />
 
        <TouchableOpacity style={styles.buttonContainer} onPress={this.login_Function} >
 
          <Text style={styles.text}>Đăng nhập </Text>
 
        </TouchableOpacity>
        </View>
 
      </View>
 
    );
  }
}
 



const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: '#609810',
    alignItems: 'center',
    justifyContent:'center',
  },
  box:{
    backgroundColor:'#fff',
    width:300,
    height:500,
    alignItems: 'center',
    justifyContent:'center',
  },
  input:{
    borderWidth:1,
    borderRadius:5,
    borderColor:'#777',
    width:250,
    padding:11,
    margin:10
  },
  buttonContainer:{
    width:250,
    margin:10,
    backgroundColor: '#24A0DE',
    borderRadius:5
  },
  text:{
    padding:8,
    color:'#fff',
    textAlign:'center'
  },
  TextComponentStyle: {
    fontSize: 20,
   color: "#000",
   textAlign: 'center', 
   marginBottom: 15
  }
});
