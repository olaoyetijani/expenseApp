import React, { Component} from "react";
import db from "../../config/Fire";
import './login.css';

class Register extends Component {
    state = {
        email: '',
        password: '',
        displayName: '',
        fireErrors: ''
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    register = e => {
        e.preventDefault();
        db.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then((user) => {
            var currentUser = db.auth().currentUser;
            currentUser.updateProfile({
                displayName: this.state.displayName
            })
        }).catch((error) => {
            this.setState({fireErrors: error.message})
        });
    }

    render () {
        let errorNotification = this.state.fireErrors ? (<div className="Error">{this.state.fireErrors}</div>) : null;
        return (
            <div> 
                {errorNotification}
                <form>
                <input type="text" className="loginField" placeholder="Your Name" onChange={this.handleChange} value={this.state.displayName} name="displayName"/>
                <input type="email" className="loginField" placeholder="Email" onChange={this.handleChange} value={this.state.email} name="email"/>
                <input type="password" className="loginField" placeholder="Password" onChange={this.handleChange} value={this.state.password} name="password"/>
                <input type="submit" onClick={this.register} className="btnSubmit" value="REGISTER" />
                </form>
            </div>
        );
    }
}

export default Register;