
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Dimensions,
  TouchableOpacity,
} from 'react-native';


export default class App extends Component{
  render(){
    return(
      <View style={styles.mainContainer}>
        <View style={styles.container}>
          <Text style={styles.Text}>Nhập mật khẩu cũ: </Text>
          <TextInput placeholder="Password" style={styles.TextInput} />
        </View>
        <View style={styles.container}>
          <Text style={styles.Text}>Nhập mật khẩu mới:</Text>
          <TextInput placeholder="New password" style={styles.TextInput}/>
        </View>
        <View style={styles.container}>
          <Text style={styles.Text}>Xác nhận mật khẩu mới:</Text>
          <TextInput placeholder="Confirm new password" style={styles.TextInput}/>
        </View>
        <View style={styles.container}></View>
        <View style={styles.container}></View>
        <View style={styles.btncontainer} >
            <TouchableOpacity 
            style={styles.btn}
            onPress={()=>this.props.navigation.navigate('Profile')}>
                <Text style={styles.btnText} >Back</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn}>
              <Text style={styles.btnText}>Confirm</Text>
            </TouchableOpacity>
        </View>
      </View>   
    );
  }
}

const styles = StyleSheet.create({
  mainContainer:{
    padding:20,
    display:"flex",
    height:700,
    flexDirection:"column"
  },
  container:{
    flex:1,
    marginBottom: 5,
    padding: 5,
  },
  Text:{
    fontSize:15,
    margin:5,
    color:"#609810"
  },
  TextInput:{
    fontSize:17,
    borderWidth:1,
    borderRadius:5,
    borderColor:"#777",
    padding: 5,
    margin:5,
  },
  btncontainer:{
    flexDirection:"row",
    paddingVertical:50,
    paddingHorizontal:20,
    flex:1,
  },
  btn:{
    backgroundColor:"#24a0ed",
    height:40,
    width:150,
    borderRadius:5,
    padding:10,
    margin:10,
  },
  btnText:{
    color:"#fff",
    textAlign:"center"
  }

})