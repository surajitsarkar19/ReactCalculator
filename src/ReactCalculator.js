import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import Style from './style'
import InputButton from './InputButton';

// Define the input buttons that will be displayed in the calculator.
const inputButtons = [
    [1, 2, 3, '/'],
    [4, 5, 6, '*'],
    [7, 8, 9, '-'],
    [0, '.', '=', '+']
];

export default class ReactCalculator extends Component {
  render() {
    return (
      <View style={Style.rootContainer}>
          <View style={Style.displayContainer}></View>
          <View style={Style.inputContainer}>
            {this._renderInputButtons()}
          </View>
      </View>
    );
  }


  /**
     * For each row in `inputButtons`, create a row View and add create an InputButton for each input in the row.
     */
    _renderInputButtons() {
        let views = [];

        for (var r = 0; r < inputButtons.length; r ++) {
            let row = inputButtons[r];

            let inputRow = [];
            for (var i = 0; i < row.length; i ++) {
                let input = row[i];

                inputRow.push(
                    <InputButton value={input} key={r + "-" + i} />
                );
            }

            views.push(<View style={Style.inputRow} key={"row-" + r}>{inputRow}</View>)
        }

        return views;
    }
}

// var styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#b6b6b6'
//   },
//   box : {
//     borderColor: 'red',
//     backgroundColor: '#fff',
//     borderWidth: 1,
//     padding: 10
//   },
//   text: {
//     fontSize: 32,
//     fontWeight: 'bold'
//   }
// });

AppRegistry.registerComponent('ReactCalculator', () => ReactCalculator);
