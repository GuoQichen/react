import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider, connect } from './react-redux'
import { createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import {
    throttle,
    debounce
} from 'lodash'

class App extends Component {
    state = {
        inputValue: ''
    }

    render() {
        return (
            <div>
                <input type="text" value={this.state.inputValue} onChange={throttle(this.handleChange, 1000)}/>
                <button onClick={this.handleClick}>clear</button>
            </div>
        )
    }

    handleChange = (e) => {
        const value = e.target.value
        this.setState({
            inputValue: value
        })
        console.log(value)
    }

    handleClick = () => {
        this.setState({
            inputValue: ''
        })
    }
}



ReactDOM.render(
    <App />,
    document.body
);