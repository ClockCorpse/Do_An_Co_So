import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  Image,
} from 'react-native';

export default function App(){
  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Image source={require('./logo_DLU.png')} />
        <Text>---------- -*- ----------</Text>
        <TextInput 
        style={styles.input}
        placeholder='MSSV'
        keyboardType='numeric' />
        <TextInput
        style={styles.input}
        placeholder='Mật khẩu'/>
        <View style={styles.buttonContainer}>
          <Button
          style={styles.buttonContainer}
          title='Đăng nhập'/>
        </View>
      </View>
    </View>
  );
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
  },
});
