import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import Style from './style'
import InputButton from './InputButton';
import ToastModule from '../lib/ToastModule'

// Define the input buttons that will be displayed in the calculator.
const inputButtons = [
    ['C',null,null,'CE'],
    [1, 2, 3, '/'],
    [4, 5, 6, '*'],
    [7, 8, 9, '-'],
    [0, '.', '=', '+']
];

const initialState = {
  previousInputValue: 0,
  inputValue: 0,
  selectedSymbol: null,
  isDecimal:false
};

export default class ReactCalculator extends Component {

  constructor(props){
    super(props);
    this.state = initialState;
  }

  render() {
    return (
      <View style={Style.rootContainer}>
          <View style={Style.displayContainer}>
            <Text style={Style.displayText}>{this.state.inputValue}</Text>
          </View>
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
                    <InputButton
                      value={input}
                      highlight={this.state.selectedSymbol === input}
                      key={r + "-" + i}
                      onPress= {()=>this._onInputButtonPressed(input)} />
                );
            }

            views.push(<View style={Style.inputRow} key={"row-" + r}>{inputRow}</View>)
        }

        return views;
    }

    _onInputButtonPressed(input) {
        switch (typeof input) {
            case 'number':
                return this._handleNumberInput(input)
            case 'string':
                return this._handleStringInput(input)
        }
    }

    _handleNumberInput(num) {
      let inputValue=0;
        if(this.state.isDecimal){
          inputValue = eval(this.state.inputValue + '.' + num);
          this.setState({
              isDecimal: false
          })
        } else{
          inputValue = this.state.inputValue * 10 + num;
        }

        this.setState({
            inputValue: inputValue
        });
    }

    _handleStringInput(str) {
        switch (str) {
            case '/':
            case '*':
            case '+':
            case '-':
                this.setState({
                    selectedSymbol: str,
                    previousInputValue: this.state.inputValue,
                    inputValue: 0
                });
                break;
            case '.':
              this.setState({
                  isDecimal: true
              })
              break;
            case '=':
            ToastModule.show("Sample toast from native",ToastModule.LONG);
                let symbol = this.state.selectedSymbol,
                    inputValue = this.state.inputValue,
                    previousInputValue = this.state.previousInputValue;

                if (!symbol) {
                    return;//if any operator is not selected then return
                }

                this.setState({
                    previousInputValue: 0,
                    inputValue: eval(previousInputValue + symbol + inputValue),
                    selectedSymbol: null
                });
                break;
            case 'CE':
              this.clearAll();
              break;
            case 'C':
              this.setState({
                  inputValue: 0
              });
              break;
        }
    }

    clearAll(){
      this.setState(initialState);
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
