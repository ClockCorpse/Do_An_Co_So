import React, { Component } from 'react';
 
import { StyleSheet, TextInput, View, Alert, TouchableOpacity, Text,Image } from 'react-native';
 
export default class App extends Component {
 
  constructor(props) {
    super(props)
 
    this.state = {
      name: '',
      mssv: '',
      password: ''
    }
  }
 
  login_Function = () => {
 
    fetch('http://loiddns.ddns.net/login_api.php', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
 
 
        mssv: this.state.mssv,
 
        user_password: this.state.password
 
      })
 
    }).then((response) => response.json())
      .then((responseJson) => {
        
          Alert.alert(responseJson);
        
        // Showing response message coming from server after inserting records.
        
      }).catch((error) => {
        console.error(error);
      });
 
 
  }
 
  render() {
    return (
 
      <View style={styles.container}>
        <View style={styles.box}>
        <Image source={require('./logo_DLU.png')} />
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
