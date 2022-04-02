import React, {Component } from 'react';
import './main.css';
import Login from './Forms/login';
import Register from './Forms/register';
import Tracker from './Tracker/Tracker';
import Spinner from '../assets/loader.gif';
import db from '../config/Fire';




 class Main extends Component {
    
         state = {
            user: 1,
            loading: true,
            formSwitcher: false
        }

        authListener() {
            db.auth().onAuthStateChanged((user) => {
                if(user) {
                    this.setState({user});
                }
                else {
                    this.setState({user: null});
                }
            });
        }

        componentDidMount() {
            this.authListener();
        }



        formSwitcher = (action) => {
            console.log(action);
            this.setState({
                formSwitcher: action === 'register' ? true : false
            })
        }

  

    
    
    render() {
        const form = !this.state.formSwitcher ? <Login /> : <Register />;

        if (this.state.user === 1) {
            return (
                <div className='mainBlock'>
                    <div className='Spinner'>
                        <img src={Spinner} alt='Spinner' className='ImgSpinner' />
                    </div>
                </div>
            )
        }
        return (
            <div>
        { !this.state.user ? 
               ( <div className='mainBlock'>
                    {form}
                    {!this.state.formSwitcher ? 
                        (<span className='underLine'>Not Registered ? <button onClick={() => this.formSwitcher(!this.state.formSwitcher ? 'register' : 'login')} className='linkBtn'>create an account</button></span>) 
                        : (<span className='underLine'>Have an account ? <button onClick={() => this.formSwitcher(!this.state.formSwitcher ? 'register' : 'login')} className='linkBtn'>Sign in here</button></span>)
                    }
                </div> ) : (<Tracker />)
        }
            </div>
        );
    }
}



export default Main;