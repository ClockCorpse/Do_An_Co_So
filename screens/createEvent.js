import React, { Component } from 'react'
import Spinner from 'react-native-loading-spinner-overlay'
import { StyleSheet, TextInput, View, Alert, TouchableOpacity, Text, Image, ToastAndroid, } from 'react-native';
import NetInfo from "@react-native-community/netinfo";
import AsyncStorage from '@react-native-community/async-storage';
import moment from 'moment'
import DateTimePicker from 'react-native-modal-datetime-picker';
import { ScrollView } from 'react-native-gesture-handler';

console.disableYellowBox = true;

export default class App extends Component {
    constructor() {
        super()
        this.state = {
            isVisible: false,
            choseDate: 'DD/MM/YYYY hh:mm',
            eventName: '',
            note: '',
            role: '',
            ID: '',
            mail: '',
            spinner: false,
        }
    }
    componentDidMount() {
        this._loadInitialState().done();
    }
    _loadInitialState = async () => {
        var value = await AsyncStorage.getItem('role');
        this.setState({ role: value });
        var value = await AsyncStorage.getItem('ID');
        this.setState({ ID: value });
        var value = await AsyncStorage.getItem('email');
        this.setState({ mail: value });
    }

    eventCreate = () => {
        if (this.state.eventName != '') {
            if (this.state.choseDate != 'DD/MM/YYYY hh:mm') {
                this.setState({ spinner: true });
                NetInfo.fetch().then(state => {
                    if (state.isConnected === true) {
                        // If theres a connection then fetch the api
                        // fetch('https://rightward-horizons.000webhostapp.com/createEvent.php', {
                        fetch('http://dacs.xyz/createEvent.php', {
                            method: 'POST',
                            //Create Json
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({

                                eventName: this.state.eventName,
                                note: this.state.note,
                                time: this.state.choseDate,
                                role: this.state.role,
                                ID: this.state.ID,
                                mail: this.state.mail,
                            })

                        }).then((response) => response.json()) // Get Json response
                            .then((responseJson) => {
                                if (responseJson === 'Success') {// If the change was success then navigates back to the login screen
                                    this.setState({ spinner: false });
                                    Alert.alert('Thông báo','Hệ thống sẽ gửi email trong giây lát.');
                                    console.log(responseJson);
                                    this.props.navigation.navigate('Profile');
                                } else {
                                    this.setState({ spinner: false });
                                    console.log(responseJson);
                                    Alert.alert('Thông báo','Thất bại');//if not then alert the user
                                }
                            }).catch((error) => {
                                console.error(error);
                            });
                    } else {
                        this.setState({ spinner: false });
                        Alert.alert('Thông báo','Không có kết nối internet');//if there's no connection to the Internet then alert the user
                    }
                });
            }else{
                Alert.alert('Thông báo','Xin nhập hạn điểm danh');
            }
        }
        else {
            Alert.alert('Thông báo','Tên sự kiện không được phép trống.');
        }
    }

    handlePicker = (datetime) => {
        this.setState({
            isVisible: false,
            choseDate: moment(datetime).format('DD/MM/YYYY HH:mm')
        })
    }
    showPicker = () => {
        this.setState({
            isVisible: true
        })
    }
    hidePicker = () => {
        this.setState({
            isVisible: false
        })
    }
    backFunction = ()=>{
        if(this.state.role === '1'){
            this.props.navigation.navigate('Dashboard');
        }else{
            this.props.navigation.navigate('Profile');
        }
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
                        <DateTimePicker
                            isVisible={this.state.isVisible}
                            onConfirm={this.handlePicker}
                            onCancel={this.hidePicker}
                            mode={'datetime'}
                            is24Hour={true}
                        />
                        <Text style={styles.Header}>Tên sự kiện</Text>
                        <TextInput
                            style={styles.TextInput}
                            onChangeText={data => this.setState({ eventName: data })} />
                        <Text style={styles.Header}>Ghi chú</Text>
                        <TextInput
                            style={styles.TextInput}
                            onChangeText={data => this.setState({ note: data })} />
                        <Text style={styles.Header}>Hạn điểm danh</Text>
                        <View style={styles.pickDate}>
                            <Text style={styles.Text}>{this.state.choseDate}</Text>
                            <TouchableOpacity
                                style={{}}
                                onPress={this.showPicker}>
                                <Text style={{
                                    color: "#24a0ed", height: 40,
                                    width: 125,
                                    borderRadius: 5,
                                    paddingHorizontal: 1,
                                    paddingVertical: 10,
                                    margin: 10,
                                }}>Chọn thời gian</Text>
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity
                            style={styles.btn}
                            onPress={this.backFunction}>
                            <Text style={styles.btnText} >Quay lại</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={this.eventCreate}
                            style={styles.btnConfirm}>
                            <Text style={styles.btnText} >Xác nhận</Text>
                        </TouchableOpacity>
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
    btn: {
        backgroundColor: "#24a0ed",
        height: 40,
        width: 300,
        borderRadius: 5,
        padding: 10,
        margin: 10,
    },
    btnText: {
        color: "#fff",
        textAlign: "center"
    },
    Header: {
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
    Text: {
        fontSize: 16,
        margin: 15,
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
    btnConfirm: {
        backgroundColor: "#609810",
        height: 40,
        width: 300,
        borderRadius: 5,
        padding: 10,
        margin: 10,
    },
    pickDate: {
        flexDirection: "row",
    },
})