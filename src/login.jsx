import React,{useState, useEffect}  from 'react';
import './styles-login.css';
import App from '../App';   
import Greeting from '../index';
import { render } from '@testing-library/react';
 
   
const [user, setUser] = useState({mail: ""});
class Login extends React.Component {

    constructor(props) {
        super(props);  
        this.state = {isLoggedIn: false};
      }

     a(){  this.setState({isLoggedIn: true}); console.log(this.state);  render(<Greeting isLoggedIn={true} />); ;
    
    }      
    

      logIn(){

    


        this.setState({isLoggedIn: true});
        console.log(this.state);
        var user = document.getElementById("form-usuario").value;
        var password = document.getElementById("form-password").value;
        var data = [user, password];
    
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "http://localhost:8080/apirest/login.php");
        xhr.setRequestHeader("Content-Type", "application/json"); 
        xhr.send(JSON.stringify(data));
        xhr.onload = function(){
           
            if(xhr.responseText.trim() == "1"){ 
               
                console.log("aa: "+ xhr.response);  
                
            }
        }
    }


 
render(){ 
    const isLoggedIn = this.state.isLoggedIn;
    return( 

        {(user.email != "") ? (


            ) : (
                
            )
            
            }
      
        <div id="body-content">
        <div id="div-img">
            <img alt="Logo Petromar"></img>
        </div> 
        <div id="div-form">
            <span>Usuario</span>
            <input id="form-usuario" type="text" placeholder="Usuario"/>
            <span>Contraseña</span>
            <input id="form-password" type="password" placeholder="Contraseña"/>
            <button id="form-btn" onClick={this.logIn.bind(this)}>INICIAR SESIÓN</button>
            <button id="form-btn" onClick={this.a.bind(this)}>INICIARd</button>
        </div>
    </div>   
 
  
    );
}
  }


  export  default Login;