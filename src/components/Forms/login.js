import React from "react";
import { Component } from "react/cjs/react.production.min";
import db from "../../config/Fire";
import './login.css';

class Login extends Component {
    state= {
        email: '',
        password: '',
        fireErrors: ''  
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    login = e => {
        e.preventDefault();
        db.auth().signInWithEmailAndPassword(this.state.email, this.state.password).catch((error) => {
            this.setState({fireErrors: error.message})
        })
    }

    render () {
        let errorNotification = this.state.fireErrors ? (<div className="Error">{this.state.fireErrors}</div>) : null;
        return (
            <div>
                {errorNotification}
                <form>
                <input type="text" className="loginField" placeholder="Email" value={this.state.email} onChange={this.handleChange} name="email"/>
                <input type="password" className="loginField" placeholder="Password" value={this.state.password} onChange={this.handleChange} name="password"/>
                <input onClick={this.login} type="submit"  className="btnSubmit" value="ENTER" />
                </form>
            </div>
        );
    }
}

export default Login;