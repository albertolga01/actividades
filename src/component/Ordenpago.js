 
import logo from './logo.png';
export default function Ordenpago(props){
    const styles = `
        #div-ordenpago{
            display: flex;
            flex-direction: column;
            width: auto;
            padding: 2vw;
            background-color: white;
            border: 2px solid black;
            border-radius: 3px;
        }
        .underlined{
            border: none;
            border-bottom: 1px solid black;
        }
        #header-op{
            display: flex;
            margin-bottom: 1.5vmax;
        }
        #header-logo{
            width: 5vmax;
        }
        #header-labels{
            width: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }
        #tbl-ordenpago{
            width: match-parent;
        }
        #firstcolumn{
            width: 15%;
        }
        #secondcolumn{
            width: 35%;
        }
        #thirdcolumn{
            width: 14%;
        }
        #fourthcolumn{
            width: 35%;
        }
        #footer-op{
            display: flex;
            margin-top: 1.5vmax;
            justify-content: space-between;
        }
        #footer-solicito{
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }
        #footer-autorizo{
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }
        #footer-op label{
            font-weight: bold;
        }
        #tbl-ordenpago input{
            width: 100%;
            border: none;
        }
        #tbl-ordenpago label{
            font-weight: bold;
        }
        .labeltoright{
            float: right;
        }
        #header-empresa{
            font-weight: bold;
            font-size: 20px;
        }
    `;

    return(
        <div id="div-ordenpago">
            <style>
                {styles}
            </style>

            <div id="header-op">
                
                <img src={logo} alt="LOGO" style={{width: '160px', height: 'auto', paddingLeft:'25px'}}></img>
                <div id="header-labels">
                    <span id="header-empresa">{props.departamento}</span>
                    <span>ORDEN DE PAGO</span>
                </div>
            </div>

            <table id="tbl-ordenpago">
            <tbody>
                <tr>
                    <td id="firstcolumn">
                        <label>FECHA</label>
                    </td>
                    <td id="secondcolumn" className="underlined"> 
                        <input id="op-fecha" disabled></input>
                    </td>
                    <td id="thirdcolumn">
                        <label className="labeltoright">N.</label>
                    </td>
                    <td id="fourthcolumn" className="underlined">
                        <input id="op-numero" disabled></input>
                    </td>
                </tr>

                <tr>
                    <td>
                        <label>BANCO RETIRO</label>
                    </td>
                    <td colSpan="3" className="underlined">
                        <input id="op-bancoretiro"></input>
                    </td>
                </tr>

                <tr>
                    <td colSpan="2"></td>
                    <td>
                        <label className="labeltoright">CANTIDAD &nbsp; $</label>
                    </td>
                    <td className="underlined">
                        <span><input id="op-cantidad"></input></span>
                    </td>
                </tr>
                <tr>
                    <td colSpan="2"></td>
                    <td>
                        <label className="labeltoright">ORDEN DE COMPRA:&nbsp;</label>
                    </td>
                    <td className="underlined">
                        <span><input id="op-folio-orden-compra"></input></span>
                    </td>
                </tr>

                <tr>
                    <td colSpan="4" className="underlined">
                        <input id="op-cantidadletra">{/*&nbsp;*/}</input> 
                    </td>
                </tr>

                <tr>
                    <td>
                        <label>A NOMBRE DE:</label>
                    </td>
                    <td colSpan="3" className="underlined">
                        <input id="op-anombre"></input>
                    </td>
                </tr>

                <tr>
                    <td>
                        <label>CONCEPTO:</label>
                    </td>
                    <td colSpan="3" className="underlined">
                        <input id="op-concepto"></input>
                    </td>
                </tr>
                </tbody>
            </table>

            <div id="footer-op">
                <div id="footer-solicito">
                    <input id="firmas-solicito" className="underlined" style={{textAlign:'center'}}>{/*&nbsp;*/}</input>
                    <label>SOLICITÓ</label>
                </div>
                
                <div id="footer-autorizo">
                    <input id="firmas-autorizo" className="underlined" style={{textAlign:'center'}}>{/*&nbsp;*/}</input>
                    <label>AUTORIZÓ</label>
                </div>
            </div>
        </div>
    )
}