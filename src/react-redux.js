import React, { Component } from 'react'
import propTypes from 'prop-types'

const getStoreShape = (propTypes) => {
	return propTypes.shape({
		subscribe: propTypes.func.isRequired,
		dispatch: propTypes.func.isRequired,
		getState: propTypes.func.isRequired,		
	})
}

// Provider 
export class Provider extends Component {
	state = {
		store: this.props.store
	}

	static childContextTypes = {
		store: getStoreShape(propTypes)
    }
    
    componentDidMount() {
        const { store } = this.props
        store.subscribe(() => {
            this.forceUpdate()
        })
    }

	getChildContext() {
		return {
			store: this.state.store
		}
	}

	render() {
		return this.props.children
	}	
}

// connect
export const connect = (mapStateToProps, mapDispatchToProps) => (WrapComponent) => {
	return class extends Component {
		static contextTypes = {
			store: getStoreShape(propTypes)
		}

		render() {
			const { store } = this.context
			const props = this.handleMapStateToProps()
			const actions =this.handleMapDispatchToProps()
			return <WrapComponent
						{...props}
						{...actions}
					/>
		}

		handleMapStateToProps = () => {
            const { store } = this.context
            console.log(store)
			return mapStateToProps(store.getState(), this.props)
		}

		handleMapDispatchToProps = () => {
			const { store } = this.context
			if (Object.prototype.toString.call(mapDispatchToProps) === `[object Object]`) {
				return store.bindActionCreator(mapDispatchToProps, store.dispatch)
			}
			if (typeof mapDispatchToProps === `function`) {
				return mapDispatchToProps(store.dispatch, this.props)
            }
            return { dispatch: store.dispatch }
		}
	}
}