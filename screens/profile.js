import React, { Component } from 'react';
import {View, Text, Button,StyleSheet,TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';


export default class App extends Component{
    state = {
        username:[],
        mssv:[],
    }
    componentDidMount(){
        this._loadInitialState().done();
    }

    _loadInitialState = async() =>{
        var value = await AsyncStorage.getItem('name');
        this.setState({username:value});
        var value = await AsyncStorage.getItem('mssv');
        this.setState({mssv:value});
    }
    render(){
        return(
            <View style={styles.container}>
                <Text style={styles.infoHeader}>Tên</Text>
                <Text style={styles.info}>{this.state.username}</Text>
                <Text style={styles.infoHeader}>MSSV</Text>
                <Text style={styles.info}>{this.state.mssv}</Text>
                <View style={styles.footer}>
                    <TouchableOpacity style={styles.btnPassword}>
                        <Text style={styles.btnPasswordText}>Đổi mật khẩu</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btnExit}
                    onPress={()=>this.props.navigation.navigate('Default')}>
                        <Text style={styles.btnExitText}>Đăng xuất</Text>
                    </TouchableOpacity>
                </View>
            </View>
       );
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        padding:30,
    },
    infoHeader:{
        color:'#609810',
        margin:10,
        fontSize:15,
    },
    info:{
        fontSize:20,
        margin: 15,
    },
    footer:{
        marginTop:30,
        flexDirection:"row",
        justifyContent:'center'
    },
    btnExit:{
        width:140,
        padding:7,
        marginHorizontal:10,
        borderRadius:5,
        backgroundColor:'#24A0DE',
    },
    btnExitText:{
        textAlign:'center',
        color:'#fff'
    },
    
    btnPassword:{
        width:140,
        padding:7,
        marginHorizontal:10,
        borderRadius:5,
    },
    btnPasswordText:{
        textAlign:'center',
        color:'#24a0de'
    }

});