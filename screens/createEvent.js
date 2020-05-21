import React, { Component } from 'react'
import Spinner from 'react-native-loading-spinner-overlay'
import { StyleSheet, TextInput, View, Alert, TouchableOpacity, Text, Image, ToastAndroid, } from 'react-native';
import NetInfo from "@react-native-community/netinfo";
import AsyncStorage from '@react-native-community/async-storage';
import moment from 'moment'
import DateTimePicker from 'react-native-modal-datetime-picker';

export default class App extends Component {
    constructor() {
        super()
        this.state = {
            isVisible: false,
            choseDate:''
        }
    }

    handlePicker = (datetime) => {
        this.setState({
            isVisible: false,
            choseDate: moment(datetime).format('MMMM, do YYYY HH:mm')
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
    render() {
        return (
            <View>
                <DateTimePicker
                    isVisible={this.state.isVisible}
                    onConfirm={this.handlePicker}
                    onCancel={this.hidePicker}
                    mode={'datetime'}
                    is24Hour={true}
                />
                <Text>Tên sự kiện</Text>
                <TextInput />
                <Text>Ghi chú</Text>
                <TextInput />
                <Text>Thời gian</Text>
                <Text>{this.state.choseDate}</Text>
                <TouchableOpacity
                    style={styles.btn}
                    onPress={this.showPicker}>
                        <Text style={styles.btnText}>Chọn ngày</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.btn}
                    onPress={() => this.props.navigation.navigate('Profile')}>
                    <Text style={styles.btnText} >Quay lại</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
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