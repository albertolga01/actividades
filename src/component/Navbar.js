import React from 'react';
  
export  const Nabvar = (props) =>(
<div className="m-2">
  <nav style={{borderRadius:'5px', width:'100%', backgroundColor:'#ABB2B9', position: 'relative', display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingTop: '.3rem',
  paddingBottom: '.3rem'}}>
  <label style={{ width:'100%', textAlign:"center", color:'white', fontFamily: "'Roboto', Sans-Serif", fontSize:'16px', fontWeight:'bold'}}>{props.titulo}</label>
  
  </nav>
</div>

)


 

    export const NavbarPass = () =>(
		<div className="m-2">
			<nav style={{borderRadius:'5px', border:'2px solid #0071ce',backgroundColor:'white', position: 'relative', display: 'flex', 
			flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', paddingTop: '.3rem', paddingBottom: '.3rem'}}>
				<label style={{marginLeft:'15px', color:'#0071ce', fontFamily: "'Roboto', Sans-Serif", fontSize:'16px', fontWeight:'bold'}}>Cambiar contraseña</label>
			</nav>
		</div>
    )