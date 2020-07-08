import React, { Component } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, TextInput, Image, Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { ScrollView } from 'react-native-gesture-handler';
import NetInfo from "@react-native-community/netinfo";
import Spinner from 'react-native-loading-spinner-overlay';
//import { render } from 'react-dom';
import renderIf from 'renderif';

console.disableYellowBox = true;

export default class App extends Component {
    state = {
        email: '',
        role: '',
        search: false,
        search_ms: '',
        assign_info: '',
        ID: '',
        spinner: false,
        search_sk:'',
    }
    componentDidMount() {
        this._loadInitialState().done();
    }
    _loadInitialState = async () => {
        var value = await AsyncStorage.getItem('email');
        this.setState({ email: value });
    }

    search_function = () => {
        this.setState({ spinner: true });

        //Check Internet connection before attempting to fetch api
        NetInfo.fetch().then(state => {
            if (state.isConnected === true) {
                // If theres a connection then fetch the api
                fetch('http://dacs.xyz/search.php', {
                    method: 'POST',
                    //Create Json
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        mssv: this.state.search_ms,
                    })

                }).then((response) => response.json()) // Get Json response
                    .then((responseJson) => {
                        if (responseJson.result === 'Matched') {// If the change was success then navigates back to the login screen
                            this.setState({ assign_info: responseJson.info })
                            this.setState({ spinner: false });
                            this.setState({ search: true });
                            this.forceUpdate();
                        } else {
                            this.setState({ search_ms: '' });
                            this.setState({ spinner: false });
                            this.setState({ search: false });
                            this.forceUpdate();
                            Alert.alert('Thông báo','Người dùng không tồn tại');//if not then alert the user
                        }

                    }).catch((error) => {
                        console.error(error);
                    });
            } else {
                this.setState({ spinner: false });
                Alert.alert('Thông báo','Không có kết nối internet');//if there's no connection to the Internet then alert the user
            }
        });
    }
    assign_role_function = () => {
        this.setState({ spinner: true });

        //Check Internet connection before attempting to fetch api
        NetInfo.fetch().then(state => {
            if (state.isConnected === true) {
                // If theres a connection then fetch the api
                fetch('http://dacs.xyz/assign_role.php', {
                    method: 'POST',
                    //Create Json
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        mssv: this.state.search_ms,
                        ID: this.state.ID
                    })

                }).then((response) => response.json()) // Get Json response
                    .then((responseJson) => {
                        if (responseJson === 'Success') {// If the change was success then navigates back to the login screen
                            this.setState({ spinner: false });
                            Alert.alert('Thông báo','Thành công!')
                        } else {
                            this.setState({ spinner: false });
                            Alert.alert('Thông báo','Cấp quyền thất bại!');//if not then alert the user
                        }

                    }).catch((error) => {
                        console.error(error);
                    });
            } else {
                this.setState({ spinner: false });
                Alert.alert('Thông báo','Không có kết nối internet');//if there's no connection to the Internet then alert the user
            }
        });
    }
    unassign_role_function = () => {
        this.setState({ spinner: true });

        //Check Internet connection before attempting to fetch api
        NetInfo.fetch().then(state => {
            if (state.isConnected === true) {
                // If theres a connection then fetch the api
                fetch('http://dacs.xyz/unassign_role.php', {
                    method: 'POST',
                    //Create Json
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        mssv: this.state.search_ms,
                    })

                }).then((response) => response.json()) // Get Json response
                    .then((responseJson) => {
                        if (responseJson === 'Success') {// If the change was success then navigates back to the login screen
                            this.setState({ spinner: false });
                            Alert.alert('Thông báo','Thành công!')
                        } else {
                            this.setState({ spinner: false });
                            Alert.alert('Thông báo','Người dùng không tồn tại');//if not then alert the user
                        }

                    }).catch((error) => {
                        console.error(error);
                    });
            } else {
                this.setState({ spinner: false });
                Alert.alert('Thông báo','Không có kết nối internet');//if there's no connection to the Internet then alert the user
            }
        });
    }

    getList_function = () => {
        this.setState({ spinner: true });

        //Check Internet connection before attempting to fetch api
        NetInfo.fetch().then(state => {
            if (state.isConnected === true) {
                // If theres a connection then fetch the api
                fetch('http://dacs.xyz/getList.php', {
                    method: 'POST',
                    //Create Json
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: this.state.email,
                        MA_SK:this.state.search_sk,
                    })

                }).then((response) => response.json()) // Get Json response
                    .then((responseJson) => {
                        console.log(responseJson);
                        if (responseJson === 'Success') {// If the change was success then navigates back to the login screen
                            this.setState({ spinner: false });
                            Alert.alert('Thông báo','Thành công!')
                        } else {
                            this.setState({ spinner: false });
                            Alert.alert('Thông báo','Thất bại!');//if not then alert the user
                        }

                    }).catch((error) => {
                        console.error(error);
                    });
            } else {
                this.setState({ spinner: false });
                Alert.alert('Thông báo','Không có kết nối internet');//if there's no connection to the Internet then alert the user
            }
        });
    }

    searchEvent_function = () => {
        this.setState({ spinner: true });

        //Check Internet connection before attempting to fetch api
        NetInfo.fetch().then(state => {
            if (state.isConnected === true) {
                // If theres a connection then fetch the api
                fetch('http://dacs.xyz/count.php', {
                    method: 'POST',
                    //Create Json
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        MA_SK: this.state.search_sk,
                    })

                }).then((response) => response.json()) // Get Json response
                    .then((responseJson) => {
                        console.log(responseJson)
                        if(responseJson.TEN_SK === null) {
                            this.setState({ spinner: false });
                            Alert.alert('Thông báo','Sự kiện không tồn tại');//if not then alert the user
                        }
                        if(responseJson.TEN_SK != null) 
                        {// If the change was success then navigates back to the login screen
                            this.setState({ spinner: false });
                            Alert.alert('Thông báo','Tên sự kiện: '+responseJson.TEN_SK +'\nTổng số sinh viên có mặt: '+ responseJson.SO_SV,[{text:'Lấy danh sách',onPress:this.getList_function},{text:'Hủy'}]);
                        }

                    }).catch((error) => {
                        console.error(error);
                    });
            } else {
                this.setState({ spinner: false });
                Alert.alert('Thông báo','Không có kết nối internet');//if there's no connection to the Internet then alert the user
            }
        });
    }

    render() {
        if (this.state.search === true) {
            return (
                <View>
                    <View style={styles.roleAssignContainer}>
                        <Spinner
                            visible={this.state.spinner}
                            textContent={'Đang tải...'}
                            textStyle={styles.spinnerTextStyle}
                        />
                        <Text style={styles.infoHeader}> Cấp quyền sinh viên</Text>
                        <View style={{
                            flexDirection: 'row', width: window.width, margin: 5, padding: 4, alignItems: 'center', justifyContent: 'center', borderRadius: 10, backgroundColor: '#fff',
                        }}>
                            < View style={{ flex: 4, paddingLeft: 15 }}>
                                <TextInput
                                    onChangeText={data => this.setState({ search_ms: data })}
                                    style={{ backgroundColor: 'transparent' }}
                                    placeholder='MSSV'
                                    keyboardType="numeric"
                                />
                            </View>
                            <View style={{ flex: 1 }}>
                                <TouchableOpacity
                                    style={{ backgroundColor: 'transparent', paddingLeft: 30 }}
                                    onPress={this.search_function}
                                >
                                    <Image source={require('../search_icon.png')} />
                                </TouchableOpacity>
                            </View>
                        </View >
                        <Text style={styles.warning}>Hệ thống phân quyền sẽ được làm mới vào 00:00 hằng ngày</Text>
                        <View style={styles.roleAssign}>
                            <Text style={styles.txtAssignInfo}>{this.state.assign_info}</Text>
                            <TouchableOpacity
                                style={styles.btnAssign}
                                onPress={this.assign_role_function}>
                                <Text style={styles.txtAssign}>
                                    Cấp quyền
                            </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.btnUnassign}
                                onPress={this.unassign_role_function}>
                                <Text style={styles.txtAssign}>
                                    Thu quyền
                        </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.roleAssignContainer}>
                    <Text style={styles.infoHeader}> Tìm kiếm sự kiện</Text>
                    <View style={{
                            flexDirection: 'row', width: window.width, margin: 5, padding: 4, alignItems: 'center', justifyContent: 'center', borderRadius: 10, backgroundColor: '#fff',
                        }}>
                            < View style={{ flex: 4, paddingLeft: 15 }}>
                                <TextInput
                                    onChangeText={data => this.setState({ search_sk: data })}
                                    style={{ backgroundColor: 'transparent' }}
                                    placeholder='Mã sự kiện'
                                    keyboardType="numeric"
                                />
                            </View>
                            <View style={{ flex: 1 }}>
                                <TouchableOpacity
                                    style={{ backgroundColor: 'transparent', paddingLeft: 30 }}
                                    onPress={this.searchEvent_function}
                                >
                                    <Image source={require('../search_icon.png')} />
                                </TouchableOpacity>
                            </View>
                        </View >
                    </View>
                    <View style={styles.roleAssignContainer}>
                        <TouchableOpacity style={styles.btnScan}
                            onPress={() => this.props.navigation.navigate('EventCreate')}>
                            <Text style={styles.btnText}>Tạo sự kiện</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btnExit}
                            onPress={() => this.props.navigation.navigate('Profile')}>
                            <Text style={styles.btnText}>Quay Lại</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            );
        }
        if (this.state.search === false) {
            return (
                <View>
                    <View style={styles.roleAssignContainer}>
                        <Spinner
                            visible={this.state.spinner}
                            textContent={'Đang tải...'}
                            textStyle={styles.spinnerTextStyle}
                        />
                        <Text style={styles.infoHeader}> Cấp quyền sinh viên</Text>
                        <View style={{
                            flexDirection: 'row', width: window.width, margin: 5, padding: 4, alignItems: 'center', justifyContent: 'center', borderRadius: 10, backgroundColor: '#fff',
                        }}>
                            < View style={{ flex: 4, paddingLeft: 15 }}>
                                <TextInput
                                    onChangeText={data => this.setState({ search_ms: data })}
                                    style={{ backgroundColor: 'transparent' }}
                                    placeholder='MSSV'
                                    keyboardType="numeric"
                                />
                            </View>
                            <View style={{ flex: 1 }}>
                                <TouchableOpacity
                                    style={{ backgroundColor: 'transparent', paddingLeft: 30 }}
                                    onPress={this.search_function}
                                >
                                    <Image source={require('../search_icon.png')} />
                                </TouchableOpacity>
                            </View>
                        </View >
                        <Text style={styles.warning}>Hệ thống phân quyền sẽ được làm mới vào 00:00 hằng ngày</Text>
                    </View>
                    <View style={styles.roleAssignContainer}>
                    <Text style={styles.infoHeader}> Tìm kiếm sự kiện</Text>
                    <View style={{
                            flexDirection: 'row', width: window.width, margin: 5, padding: 4, alignItems: 'center', justifyContent: 'center', borderRadius: 10, backgroundColor: '#fff',
                        }}>
                            < View style={{ flex: 4, paddingLeft: 15 }}>
                                <TextInput
                                    onChangeText={data => this.setState({ search_sk: data })}
                                    style={{ backgroundColor: 'transparent' }}
                                    placeholder='Mã sự kiện'
                                    keyboardType="numeric"
                                />
                            </View>
                            <View style={{ flex: 1 }}>
                                <TouchableOpacity
                                    style={{ backgroundColor: 'transparent', paddingLeft: 30 }}
                                    onPress={this.searchEvent_function}
                                >
                                    <Image source={require('../search_icon.png')} />
                                </TouchableOpacity>
                            </View>
                        </View >
                    </View>
                    <View style={styles.roleAssignContainer}>
                        <TouchableOpacity style={styles.btnScan}
                            onPress={() => this.props.navigation.navigate('EventCreate')}>
                            <Text style={styles.btnText}>Tạo sự kiện</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btnExit}
                            onPress={() => this.props.navigation.navigate('Profile')}>
                            <Text style={styles.btnText}>Quay Lại</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            );
        }
    }
}
export class Query extends Component {
    render() {
        return (
            <Text>
                Something
            </Text>
        );
    };
}
const styles = StyleSheet.create({
    infoHeader: {
        color: '#609810',
        margin: 10,
        fontSize: 15,
    },
    roleAssign: {
        backgroundColor: "#fff",
        borderRadius: 10,
        flexDirection: 'row',
        marginLeft: 15,
        marginRight: 15,
        padding: 10,
    },
    txtAssign: {
        textAlign: 'center',
        color: '#fff',
        fontSize: 13,
    },
    txtAssignInfo: {
        flex: 3,
        backgroundColor: "transparent",
        margin: 5,
        paddingTop: 15,
        paddingLeft: 15,
        fontSize: 17,
        justifyContent: 'center'
    },
    btnAssign: {
        flex: 1,
        margin: 5,
        padding: 10,
        backgroundColor: "#609810",
    },
    btnUnassign: {
        flex: 1,
        margin: 5,
        padding: 10,
        backgroundColor: "#a7a7a7",
    },
    roleAssignContainer: {
        margin: 10,
        padding: 10,
        backgroundColor: 'transparent',
        borderBottomColor: "#c7c7c7",
        borderBottomWidth: 1,
    },
    warning: {
        color: '#ff0000',
        fontSize: 12,
        padding: 20,
    },
    btnText: {
        textAlign: 'center',
        color: '#fff'
    },
    btnScan: {
        backgroundColor: "#609810",
        borderRadius: 5,
        marginTop: 20,
        padding: 7,
    },
    btnExit: {
        borderRadius: 5,
        marginTop: 20,
        padding: 7,
        backgroundColor: '#24A0DE',
    },
    spinnerTextStyle: {
        color: '#FFF'
    },
});