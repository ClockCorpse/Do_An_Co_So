import React, { Component } from 'react'
import Spinner from 'react-native-loading-spinner-overlay'
import { StyleSheet, TextInput, View, Alert, TouchableOpacity, Text, Image, ToastAndroid, } from 'react-native';
import NetInfo from "@react-native-community/netinfo";
import AsyncStorage from '@react-native-community/async-storage';
import moment from 'moment'
import DateTimePicker from 'react-native-modal-datetime-picker';
import { ScrollView } from 'react-native-gesture-handler';

export default class App extends Component {
    constructor() {
        super()
        this.state = {
            isVisible: false,
            choseDate: 'DD/MM/YYYY hh:mm'
        }
    }

    eventCreate = () => {
        Alert.alert('Ok');
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
    render() {
        return (
            <ScrollView>
                <View style={styles.body}>
                    <View style={styles.mainContainer}>
                        <DateTimePicker
                            isVisible={this.state.isVisible}
                            onConfirm={this.handlePicker}
                            onCancel={this.hidePicker}
                            mode={'datetime'}
                            is24Hour={true}
                        />
                        <Text style={styles.Header}>Tên sự kiện</Text>
                        <TextInput style={styles.TextInput} />
                        <Text style={styles.Header}>Ghi chú</Text>
                        <TextInput style={styles.TextInput} />
                        <Text style={styles.Header}>Thời gian cho phép(phút)</Text>
                        <TextInput
                            style={styles.TextInput}
                            keyboardType={"numeric"} />
                        <Text style={styles.Header}>Thời gian</Text>
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
                            onPress={() => this.props.navigation.navigate('Profile')}>
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