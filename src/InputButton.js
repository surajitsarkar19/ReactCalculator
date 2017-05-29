import React, { Component } from 'react';
import {
    TouchableHighlight,
    Text
} from 'react-native';

import Style from './style';

export default class InputButton extends Component {

    render() {
        return (
            <TouchableHighlight style={Style.inputButton} underlayColor='#193441' onPress={this.props.onPress}>
                <Text style={Style.inputButtonText}>{this.props.value}</Text>
            </TouchableHighlight>
        )
    }

}
