import React, { Component } from 'react';
import {View, Text, Button,StyleSheet,TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';


export default class App extends Component{
    state = {
        ten:'',
        tenLot:'',
        mssv:'',
        email:'',
        lop:'',
        role:'',
    }
    componentDidMount(){
        this._loadInitialState().done();
    }

    _loadInitialState = async() =>{
        var value = await AsyncStorage.getItem('ten');
        this.setState({ten:value});
        var value = await AsyncStorage.getItem('tenLot');
        this.setState({tenLot:value});
        var value = await AsyncStorage.getItem('mssv');
        this.setState({mssv:value});
        var value = await AsyncStorage.getItem('email');
        this.setState({email:value});
        var value = await AsyncStorage.getItem('lop');
        this.setState({lop:value});
        var value = await AsyncStorage.getItem('role');
        this.setState({role:value});
    }
    render(){
        if(this.state.role === '1'){
            return(
                <View style={styles.mainContainer}>
                    <View style={styles.container}>
                        <Text style={styles.infoHeader}>Họ Tên Lót</Text>
                        <Text style={styles.info}>{this.state.tenLot}</Text>
                    </View>
                    <View style={styles.container}>
                        <Text style={styles.infoHeader}>Tên</Text>
                        <Text style={styles.info}>{this.state.ten}</Text>
                    </View>
                    <View style={styles.container}>
                        <Text style={styles.infoHeader}>Email</Text>
                        <Text style={styles.info}>{this.state.email}</Text>
                    </View>
                    <View style={styles.footer}>
                        <TouchableOpacity 
                        style={styles.btnPassword}
                        onPress={()=>this.props.navigation.navigate('ChangePass')}>
                            <Text style={styles.btnPasswordText}>Đổi mật khẩu</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btnExit}
                        onPress={()=>this.props.navigation.navigate('Default')}>
                            <Text style={styles.btnExitText}>Đăng xuất</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={styles.btnScan}
                        onPress={()=>this.props.navigation.navigate('EventCreate')}>
                            <Text style={styles.btnExitText}>Tạo sự kiện</Text>
                        </TouchableOpacity>
                </View>
            )
        }
        if(this.state.role ==='0'){
            return(
                <View style={styles.mainContainer}>
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
                        <Text style={styles.infoHeader}>Email</Text>
                        <Text style={styles.info}>{this.state.email}</Text>
                    </View>
                    <View style={styles.container}>
                        <Text style={styles.infoHeader}>Lớp</Text>
                        <Text style={styles.info}>{this.state.lop}</Text>
                    </View>
                    <View style={styles.footer}>
                        <TouchableOpacity 
                        style={styles.btnPassword}
                        onPress={()=>this.props.navigation.navigate('ChangePass')}>
                            <Text style={styles.btnPasswordText}>Đổi mật khẩu</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btnExit}
                        onPress={()=>this.props.navigation.navigate('Default')}>
                            <Text style={styles.btnExitText}>Đăng xuất</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={styles.btnScan}
                        onPress={()=>this.props.navigation.navigate('Scan')}>
                            <Text style={styles.btnExitText}>Quét</Text>
                        </TouchableOpacity>
                </View>
            );
        }
        return(
            <View>
                <Text>Wow, such empty</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    mainContainer:{
        flex:1,
        padding:30,
    },
    container:{
        borderBottomColor:"#ccc",
        borderBottomWidth: 1,
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
        marginTop:75,
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
    },
    btnScan:{
        backgroundColor:"#609810",
        borderRadius:5,
        marginTop:20,
        padding:7,
    }
});