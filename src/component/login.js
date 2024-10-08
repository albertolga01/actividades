import React,{useState, useEffect}  from 'react';
import './styles-login.css';
import App from '../App';   
import LoginForm from './loginform';
import HttpsRedirect from 'react-https-redirect';
import { useChat } from '../context/ChatProvider'; 



import styled, { createGlobalStyle } from 'styled-components';
//import { ChatProvider } from '../context/ChatProvider';
import Wrapper from './Wrapper';

const GlobalStyle = createGlobalStyle`
  :root {
    --main-color-dark-palette: #1a1a1a;
    --secondry-color-dark-palette: #373737;
    --blue-button-color: #3c95f4;
    --blue-active-color: #2070c6;
    --blue-gradient: linear-gradient(90deg, #3c95f4 65%, #3385dc 100%);
  }

  * {
    margin: 0;
    padding: 0;
    outline: transparent;
    text-decoration: none;
    box-sizing: border-box;
    font-family: 'Poppins', sans-serif;
  }

  body {
    background: var(--blue-gradient);
  }
`;

const Background = styled.div`
position: absolute;
height: 100vh;
width: 100vw;
overflow: hidden;
z-index: -1;

&::before, &::after {
    content: '';
    position: absolute;
    inset: -170px auto auto -200px;
    width: clamp(30vw, 600px, 42vw);
    height: clamp(30vw, 600px, 42vw);
    border-radius: 50%;
    background: #1e6dbf;
    z-index: -1;
  }

  &::after {
    inset: auto -170px -200px auto;
  }

  @media (max-width: 820px) {
    &::before, &::after {
      width: 25rem;
      height: 25rem;
    }
  }
`;


class Login extends React.Component {
    constructor(props) {
        super(props);  
        this.state = {isLoggedIn: false};
	}

	

	render(){ 
		const isLoggedIn = this.state.isLoggedIn; 
		 
		if(!isLoggedIn){
			return ( 
			<HttpsRedirect>
				
				<LoginForm isLoggedIn={false}  /> 
			</HttpsRedirect>
			);
		} else {
			return (
				<>{/**
					<GlobalStyle />
					<Background />

					<ChatProvider name="name"> 
				     	<App />
					</ChatProvider> 
          */}
				</>
			)
		}
	}
}

export  default Login;