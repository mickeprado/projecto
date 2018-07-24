//@flow
import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';

type
exampleProps = {
    navigation: any
}
type
exampleState = {}

class example extends Component< exampleProps, exampleState> {

    static navigationOptions = {
        header: null
    };

    state = {};

    componentWillMount() {
    }

    componentDidMount() {
    }

    render() {
        const {mainView} = styles;
        return (
            <View style={mainView}>

            </View>
        );
    }
};

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff'
    },
});

export default example;