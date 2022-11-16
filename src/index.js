import React,{useState, useEffect}  from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Login from './component/login';   
import 'bootstrap/dist/css/bootstrap.min.css';
 
import reportWebVitals from './reportWebVitals';



ReactDOM.render(
	<React.StrictMode>
		<Login isLoggedIn={false} />
	</React.StrictMode>,
	document.getElementById('root')
);


reportWebVitals();