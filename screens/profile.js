import React, { Component } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, TextInput, Image, Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { ScrollView } from 'react-native-gesture-handler';
import NetInfo from "@react-native-community/netinfo";
import Spinner from 'react-native-loading-spinner-overlay'

console.disableYellowBox = true;

export default class App extends Component {
    state = {
        ten: '',
        tenLot: '',
        mssv: '',
        email: '',
        lop: '',
        role: '',
        search: false,
        search_ms: '',
        assign_info: '',
        ID: '',
        spinner: false,
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
        var value = await AsyncStorage.getItem('email');
        this.setState({ email: value });
        var value = await AsyncStorage.getItem('lop');
        this.setState({ lop: value });
        var value = await AsyncStorage.getItem('role');
        this.setState({ role: value });
        var value = await AsyncStorage.getItem('ID');
        this.setState({ ID: value });
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
                            Alert.alert('Người dùng không tồn tại');//if not then alert the user
                        }

                    }).catch((error) => {
                        console.error(error);
                    });
            } else {
                this.setState({ spinner: false });
                Alert.alert('Không có kết nối internet');//if there's no connection to the Internet then alert the user
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
                            Alert.alert('Thành công!')
                        } else {
                            this.setState({ spinner: false });
                            Alert.alert('Cấp quyền thất bại!');//if not then alert the user
                        }

                    }).catch((error) => {
                        console.error(error);
                    });
            } else {
                this.setState({ spinner: false });
                Alert.alert('Không có kết nối internet');//if there's no connection to the Internet then alert the user
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
                            Alert.alert('Thành công!')
                        } else {
                            this.setState({ spinner: false });
                            Alert.alert('Người dùng không tồn tại');//if not then alert the user
                        }

                    }).catch((error) => {
                        console.error(error);
                    });
            } else {
                this.setState({ spinner: false });
                Alert.alert('Không có kết nối internet');//if there's no connection to the Internet then alert the user
            }
        });
    }

    render() {
        if (this.state.role === '1' && this.state.search === true) {
            return (
                <ScrollView style={styles.scrollContainer}>
                    <Spinner
                        visible={this.state.spinner}
                        textContent={'Đang tải...'}
                        textStyle={styles.spinnerTextStyle}
                    />
                    <View style={styles.mainContainerrole1}>
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
                                onPress={() => this.props.navigation.navigate('ChangePass')}>
                                <Text style={styles.btnPasswordText}>Đổi mật khẩu</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.btnExit}
                                onPress={() => this.props.navigation.navigate('Default')}>
                                <Text style={styles.btnExitText}>Đăng xuất</Text>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity style={styles.btnScan}
                            onPress={() => this.props.navigation.navigate('EventCreate')}>
                            <Text style={styles.btnExitText}>Tạo sự kiện</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.infoHeader}> Cấp quyền sinh viên</Text>
                    <View style={{
                        flexDirection: 'row', width: window.width, margin: 20, padding: 4, alignItems: 'center', justifyContent: 'center', borderRadius: 10, backgroundColor: '#fff'
                    }}>
                        <View style={{ flex: 4, paddingLeft: 15 }}>
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
                    <Text>Hệ thống phân quyền sẽ được làm mới vào 00:00 hằng ngày</Text>
                </ScrollView >
            )
        }
        if (this.state.role === '1') {
            return (
                <ScrollView style={styles.scrollContainer}>
                    <Spinner
                        visible={this.state.spinner}
                        textContent={'Đang tải...'}
                        textStyle={styles.spinnerTextStyle}
                    />
                    <View style={styles.mainContainerrole1}>
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
                                onPress={() => this.props.navigation.navigate('ChangePass')}>
                                <Text style={styles.btnPasswordText}>Đổi mật khẩu</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.btnExit}
                                onPress={() => this.props.navigation.navigate('Default')}>
                                <Text style={styles.btnExitText}>Đăng xuất</Text>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity style={styles.btnScan}
                            onPress={() => this.props.navigation.navigate('EventCreate')}>
                            <Text style={styles.btnExitText}>Tạo sự kiện</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.infoHeader}> Cấp quyền sinh viên</Text>
                    <View style={{
                        flexDirection: 'row', width: window.width, margin: 20, padding: 4, alignItems: 'center', justifyContent: 'center', borderRadius: 10, backgroundColor: '#fff',
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
                    <Text>Hệ thống phân quyền sẽ được làm mới vào 00:00 hằng ngày</Text>
                </ScrollView >
            )
        }
        if (this.state.role === '2') {
            return (
                <ScrollView style={styles.scrollContainer}>
                    <Spinner
                        visible={this.state.spinner}
                        textContent={'Đang tải...'}
                        textStyle={styles.spinnerTextStyle}
                    />
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
                                onPress={() => this.props.navigation.navigate('ChangePass')}>
                                <Text style={styles.btnPasswordText}>Đổi mật khẩu</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.btnExit}
                                onPress={() => this.props.navigation.navigate('Default')}>
                                <Text style={styles.btnExitText}>Đăng xuất</Text>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity style={styles.btnScan}
                            onPress={() => this.props.navigation.navigate('EventCreate')}>
                            <Text style={styles.btnExitText}>Tạo sự kiện</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btnScan}
                            onPress={() => this.props.navigation.navigate('Scan')}>
                            <Text style={styles.btnExitText}>Quét</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView >
            )
        }
        if (this.state.role === '0') {
            return (
                <ScrollView style={styles.scrollContainer}>
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
                                onPress={() => this.props.navigation.navigate('ChangePass')}>
                                <Text style={styles.btnPasswordText}>Đổi mật khẩu</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.btnExit}
                                onPress={() => this.props.navigation.navigate('Default')}>
                                <Text style={styles.btnExitText}>Đăng xuất</Text>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity style={styles.btnScan}
                            onPress={() => this.props.navigation.navigate('Scan')}>
                            <Text style={styles.btnExitText}>Quét</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            );
        }
        return (
            <View>
                <Text>Wow, such empty</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        padding: 20,
    },
    mainContainerrole1: {
        flex: 1,
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
    },
    scrollContainer: {
        paddingLeft: 20,
        paddingRight: 20,
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
    footer: {
        marginTop: 75,
        flexDirection: "row",
        justifyContent: 'center'
    },
    btnExit: {
        width: 140,
        padding: 7,
        marginHorizontal: 10,
        borderRadius: 5,
        backgroundColor: '#24A0DE',
    },
    btnExitText: {
        textAlign: 'center',
        color: '#fff'
    },

    btnPassword: {
        width: 140,
        padding: 7,
        marginHorizontal: 10,
        borderRadius: 5,
    },
    btnPasswordText: {
        textAlign: 'center',
        color: '#24a0de'
    },
    btnScan: {
        backgroundColor: "#609810",
        borderRadius: 5,
        marginTop: 20,
        padding: 7,
    },
    roleAssign: {
        backgroundColor: "#fff",
        borderRadius: 10,
        flexDirection: 'row',
        margin: 20,
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
    spinnerTextStyle: {
        color: '#FFF'
    },
});