import React, { Component } from 'react';
import {View, Text, Button} from 'react-native'

export default function App({navigation}){
    
    const logout=()=>{
        navigation.goBack();
    }

        return(
            <View>
                <Text>login success</Text>
                <Button 
                title='logout'
                onPress={logout}
                />
            </View>
        );
    
}