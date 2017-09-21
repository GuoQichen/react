// import "babel-polyfill";
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Debounce from './debounce.js'

const apiCall = async (amount = 1) => {
    const since = Math.floor(Math.random()*1000)
    return await fetch(`https://api.github.com/users?since=${since}`)
        .then(response => response.json())
        .then((result = []) => result.slice(0, amount))
        .catch(err => console.log(err))
}

class App extends Component {
    state = {
        userList: []
    }

    componentDidMount() {
        this.getUsers()
    }

    render() {
        const {
            userList
        } = this.state
        return (
            <div>
                <header style={{
                    display: 'flex',
                    alignItems: 'center',
                }}>
                    <h2 style={{
                        marginRight: 10
                    }}>
                        Who To Follow
                    </h2>
                    <a href="#" className="btn-refresh" onClick={this.getUsers.bind(this)}>Refresh</a>
                </header>
                {
                    userList.map((user, index) => (
                        <div key={user.id} className="user-item" style={{
                            display: 'flex',
                            alignItems: 'center',
                            marginBottom: 10,
                        }}>
                            <img 
                                src={user.avatar_url} 
                                alt="avatar"
                                style={{
                                    width: 40,
                                    height: 40,
                                    borderRadius: '50%',
                                    marginRight: 10,
                                }}
                            />
                            <a href={user.html_url} style={{
                                marginRight: 10
                            }}>{user.login}</a>
                            <a href="#" className="btn-remvoe" onClick={this.removeUser.bind(this, index)}>x</a>
                        </div>
                    ))
                }
            </div>
        )
    }

    async getUsers() {
        const newUsers = await apiCall(3)
        this.setState({
            userList: newUsers
        })
    }

    async removeUser(index) {
        const [ newUser ] = await apiCall(1)
        this.setState(({ userList }) => ({
            userList: userList.map((user, _index) =>
                _index === index 
                ? newUser
                : user
            )
        }))
    }
}


ReactDOM.render(
    // <Debounce />,
    <App />,
    document.body
);