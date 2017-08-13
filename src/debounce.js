import React, { Component } from 'react'
import { debounce, throttle } from 'lodash'

export default class extends Component {
    state = {
        value: ''
    }

    constructor(props) {
        super(props)
        /**
         * every time debounce return new function
         */
        this.handleChange = debounce(this.handleChange, 1000)
    }

    handleChange = (value) => {
        this.setState({ value })
    }

    onChange = (event) => {
        /**
         * Take care of React's event pooling
         */
        const value = event.target.value
        this.handleChange(value)
    }
    

    render() {
        const {
            value
        } = this.state
        return (
            <div className="debounceExample">
                <input
                    type="text"
                    value={value}
                    onChange={this.onChange}
                />       
                <p>{ value }</p>
            </div>
        )
    }
}