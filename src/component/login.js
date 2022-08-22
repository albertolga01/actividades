import React,{useState, useEffect}  from 'react';
import './styles-login.css';
import App from '../App';   
import LoginForm from './loginform';
import HttpsRedirect from 'react-https-redirect';

class Login extends React.Component {
    constructor(props) {
        super(props);  
        this.state = {isLoggedIn: false};
	}

	render(){ 
		const isLoggedIn = this.state.isLoggedIn;
		//console.log(this.state);
		if(!isLoggedIn){
			return ( 
				<HttpsRedirect>
			<LoginForm isLoggedIn={false} /> 
			</HttpsRedirect>
			);
		} else {
			return <App />;
		}
	}
}

export  default Login;