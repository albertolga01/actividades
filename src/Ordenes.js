import logo from './logo.png';
import React,{useState, useEffect} from 'react'; 
import {FaAngrycreative, FaCheckCircle, FaPrint} from 'react-icons/fa'
import axios from '../node_modules/axios'; 
import {Nabvar} from './component/Navbar';  
import html2canvas from 'html2canvas';
import {jsPDF} from "jspdf";
import './App.css'; 

function Ordenes(props){

    const [isr, setIsr] =  useState([]); 
    const [isr1, setIsr1] =  useState([]); 
    const [proveedor, setProveedor] =  useState([]);  
    const [lista, setLista] =  useState([]);   
    const [value, setValue] = useState([]); 

    useEffect(()=> {
        getOrdenes();
        getProveedores();
        getDatosEmpresa();
        getUsuarios();
    }, [])

    function onChange(e){
        const re = /^[0-9.]+$/;
        if ((e.target.value === '' || re.test(e.target.value))) {
            setIsr(e.target.value);
            Change();
        }
    }
    
    function onChange1(e){
        const re = /^[0-9.]+$/;
        if ((e.target.value === '' || re.test(e.target.value))) {
            setIsr1(e.target.value);
            Change();
        }
    }

    let id = 0; 

    function Pdf(){
        try{
            var cboxdol = document.getElementById("checkboxdolares");
            var labeldol = document.getElementById("divdolares");
            if(cboxdol.checked){
                let importe = document.getElementById("t-total").value;
                let valorDolar = document.getElementById("checkdlls-valor").value;
                console.log(importe.replace(",", ""));
                console.log(valorDolar.replace(",", ""));
                let importeDlls = Number(importe.replace(",", ""))/Number(valorDolar.replace(",", ""));
                labeldol.innerHTML = "Importe en dólares: $" + importeDlls.toFixed(2) + "   -Dolar: $" + Number(valorDolar.replace(",", ""));
            } else {
                labeldol.innerHTML = "";
            }

            let checkDllsValor = document.getElementById("checkdlls-valor");
            checkDllsValor.style.display = "none";
            cboxdol.style.display = "none";

            var iva = document.getElementById("ivath");
            document.getElementsByName("checkbox").forEach((input) => {
                input.style.display = 'none';
            });

            iva.innerHTML = "" ; 

            const input = document.getElementById('pdf');
            html2canvas(input).then((canvas) => {
                let imgWidth = 190;
                let imgHeight = canvas.height * imgWidth / canvas.width;
                const imgData = canvas.toDataURL('img/png');
                const pdf = new jsPDF('p', 'mm', 'a4');
                pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);
                var folio = document.getElementById("folio").value;
                var fecha  = document.getElementById("fecha").value; 
                var estacion = document.getElementById("orden-estacion"); 
                var e = estacion.options[estacion.selectedIndex].text;    
                // pdf.output('dataurlnewwindow');
                pdf.save(folio +" " + e + " " + fecha + ".pdf");
            })
            ;

            document.getElementsByName("checkbox").forEach((input) => {
                input.style.display = 'unset';
            });

            iva.innerHTML = "IVA" ;

            checkDllsValor.style.display = "unset";
            cboxdol.style.display = 'unset'
            labeldol.innerHTML = "Precio en dolares  &nbsp";

        } catch(Exception){}
    }

    async function getDatosEmpresa(){
        var id = "13";
        var rzonsocial = props.rzonsocial;

        const rese = await axios.get('https://compras.grupopetromar.com/apirest/?id='+id+'&rzonsocial='+rzonsocial);  

        var razonsocial = document.getElementById("rzonsocial");
        var direccion = document.getElementById("direccion");
        var facturacion = document.getElementById("facturacion");

        try{
            razonsocial.innerHTML = rese.data[0].name;
            direccion.innerHTML = rese.data[0].direccion;
            facturacion.innerHTML = "Datos de facturación: " + rese.data[0].rfc + " " + rese.data[0].direccion + "\n" + document.getElementById("rzonsocial").innerHTML;
        } catch(Exception ){console.log("error al obtener datos de empresa - getDatosEmpresa()")}
    }

    async function getProveedores(){
        var id = "11";
        const rese = await axios.get('https://compras.grupopetromar.com/apirest/?id='+id);  
        setProveedor(rese.data);  
        // console.log(rese.data);
        var Data = JSON.stringify(rese.data);
        // console.log(Data[0]); 
    }



    async function generarOrdenPago(ordenCompra){
        var id = "15";
        var idordencompra = ordenCompra;
        //alert(idordencompra);
        const rese = await axios.get('https://compras.grupopetromar.com/apirest/?id='+id+'&idordencompra='+idordencompra+'&idempresa='+props.dptoid);  
        alert(rese.data);
        //var Data = JSON.stringify(rese.data);
        // console.log(Data[0]); 
    }
    

    async function Autorizar(tipo){ 
        var unob = document.getElementById("bsolicita"); 
        var dosb = document.getElementById("brevisa"); 
        var tresb = document.getElementById("brealiza");

        if(tipo == "4"){
            if(unob.getAttribute("hidden") == "true" && dosb.getAttribute("hidden") == "true" && tresb.getAttribute("hidden") == "true" ){
                var id = document.getElementById("idreq").value;  
                let fd = new FormData() 
                fd.append("id", "9")
                fd.append("idrequisicion", id)
                fd.append("userid", props.userid)
                fd.append("tipo", tipo) 
                const res = await axios.post('https://compras.grupopetromar.com/apirest/', fd); 
                getOrdenes();
                console.log(res.data);
                alert(res.data.trim());
                verOrden(id); 
            } else {
                alert("No es posible autorizar");
            }
        } else {
            var id = document.getElementById("idreq").value;  
            let fd = new FormData() 
            fd.append("id", "9")
            fd.append("idrequisicion", id)
            fd.append("userid", props.userid)
            fd.append("tipo", tipo) 
            const res = await axios.post('https://compras.grupopetromar.com/apirest/', fd); 
            getOrdenes();
            console.log(res.data);
            alert(res.data.trim());
            verOrden(id); 
        }
    }

    async function getFirmas(idorden){
        /* var id = "8"; 
        var firmasolicita = document.getElementById("firmasolicita");
        var firmarevisa = document.getElementById("firmarevisa");
        var firmarealiza = document.getElementById("firmarealiza");
        var firmaautoriza = document.getElementById("firmaautoriza");
        const res = await axios.get('https://compras.grupopetromar.com/apirest/?id='+id+'&idorden='+idorden);
        //console.log(res.data);
        // alert(res.data[0]);
        if(res.data[0] != null){
            if(res.data[0].tipo == "1"){
            firmasolicita.src = "data:image/png;base64,"+res.data[0].imagen;
            }
            if(res.data[0].tipo == "2"){
                firmarevisa.src = "data:image/png;base64,"+res.data[0].imagen;
                }
                if(res.data[0].tipo == "3"){
                    firmarealiza.src = "data:image/png;base64,"+res.data[0].imagen;
                    }
                    if(res.data[0].tipo == "4"){
                        firmaautoriza.src = "data:image/png;base64,"+res.data[0].imagen;
                        }
        }*/ 
        //setLista(res.data); 
    }

    async function getOrdenes(){    
        var id = "7";   
        var rzonsocial = props.rzonsocial;
        var date = document.getElementById("input-fecha").value; 
        const res = await axios.get('https://compras.grupopetromar.com/apirest/?id='+id+'&userid='+props.userid+'&date='+date+'&dptoid='+props.dptoid+'&rzonsocial='+rzonsocial);
        // console.log(res.data); 
        var table = document.getElementById('productstable');
        
        if(res.data.length >= 1){
            setLista(res.data); 
            try{
                table.removeAttribute("hidden");
            } catch(Exception){}
        } else {
            table.setAttribute("hidden", true);
        }
    }

    async function guardarPrecios(){ 
        var idd = document.getElementById("idreq").value; 
        var pro = document.getElementById("orden-proveedor").value;
        var est = document.getElementById("orden-estacion").value;

        let fd = new FormData() 
        fd.append("id", "10")
        fd.append("idorden", document.getElementById("folio").value) 
        fd.append("ivaret", document.getElementById("t-ivaret").value)
        fd.append("isr", document.getElementById("t-isrret").value)
        fd.append("rzonsocial", document.getElementById("rzonsocial").innerHTML)
        fd.append("proveedor", document.getElementById("orden-proveedor").value)
        fd.append("estacion", document.getElementById("orden-estacion").value)

        for (var i=0; i<document.getElementsByName("rowprods").length; i++){
            fd.append("folio[]", document.getElementsByName("folio")[i].value)
            fd.append("preciouni[]", document.getElementsByName("costouni")[i].value)
        }
        console.log(fd);

		if(pro != ""){

            if(est != ""){
                const res = await axios.post('https://compras.grupopetromar.com/apirest/', fd);  
                //console.log(res.data);
                alert(res.data.trim());
                verOrden(idd);
            } else {
                alert("Seleccione estación");
            }
            
        } else {
            alert("Ingrese datos del proveedor");
        }
    }

    async function addCotizacion(cell){ 
        console.log(cell);
        document.getElementById("input-cotizacion").click();
        id = cell;
    }

    async function postFile(){
        let fd = new FormData() 
        fd.append("id", "11")
        fd.append("idorden", id)
        fd.append("file", document.getElementById("input-cotizacion").files[0]) 
		const res = await axios.post('https://compras.grupopetromar.com/apirest/',  fd, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });  
        //console.log(res.data);
        getOrdenes();
    }

    async function verCotizacion(){ 
        var x = document.createElement("img");
        x.style.position = 'absolute';
        x.style.top = '10px';
        x.style.position = 'absolute';
        x.setAttribute('src', 'Whats.jpeg');
        document.getElementsByClassName("container")[0].appendChild(x);
    }

    async function verOrden(idd){
        var bttn = document.getElementById(idd);

        for(var i=0;i<document.getElementsByName("producto").length;i++){
            document.getElementsByName("producto")[i].value = "";
            //document.getElementsByName("descripcion")[i].value = "";
            document.getElementsByName("unidad")[i].value = ""; 
            document.getElementsByName("cantidad")[i].value = "";
            document.getElementsByName("folio")[i].value = "";
            document.getElementsByName("costouni")[i].value = "";
            document.getElementsByName("total")[i].value = "";
            document.getElementsByName("checkbox")[i].checked = false;
        }

        for(var i=0;i<document.getElementsByName("proveedor").length;i++){
            document.getElementsByName("proveedor")[i].value = ""; 
            document.getElementsByName("precio")[i].value = "";      
        }

        document.getElementById("observaciones").value = ""; 
        document.getElementById("t-subtotal").value = ""; 
        document.getElementById("t-iva").value = ""; 
        document.getElementById("t-ivaret").value = ""; 
        document.getElementById("t-isrret").value = ""; 
        document.getElementById("t-total").value = "";  
        document.getElementById("departamentos").value = "";  
        var idrequisicion = idd; 
        var id = "9";
        var rzonsocial = props.rzonsocial;

        await axios.get('https://compras.grupopetromar.com/apirest/?id='+id+'&idorden='+idrequisicion+'&rzonsocial='+rzonsocial)
        .then(res => {
            //alert(res.data);
            console.log(res.data);
            document.getElementById("departamento").value = res.data[0].rzonsocial; 
             document.getElementById("departamentos").value = res.data[0].departamentos; 
            document.getElementById("observaciones").value = "Observaciones: "+ res.data[0].observaciones; 
            document.getElementById("solicita").value = res.data[0].solicita;
            document.getElementById("fecha").value = formatDate(res.data[0].fechacaptura);    // (res.data[0].fechaorden).substring(0, 4) +"/"+ (res.data[0].fechaorden).substring(5,7) + "/" + (res.data[0].fechaorden).substring(8,10); 
            document.getElementById("folio").value = res.data[0].foliof;
            document.getElementById("orden-proveedor").value = res.data[0].proveedor;
            document.getElementById("orden-estacion").value = res.data[0].estacion;

            if(res.data[0].ivaret != null){
                document.getElementById("t-ivaret").value = res.data[0].ivaret;
                //document.getElementById("t-ivaret").setAttribute("disabled", "disabled");
                //document.getElementById("t-ivaret").style.color = "black";
            }

            if(res.data[0].isr != null){
                document.getElementById("t-isrret").value = res.data[0].isr;
                //document.getElementById("t-isrret").setAttribute("disabled", "disabled");
                //document.getElementById("t-isrret").style.color = "black";
            }

            if(res.data[0].proveedor != null){
                document.getElementById("orden-proveedor").setAttribute("readonly", true);
                document.getElementById("orden-estacion").setAttribute("disabled", true);
                document.getElementById("pro").setAttribute("disabled", true);
            } else {
                document.getElementById("orden-proveedor").removeAttribute("readonly");
                document.getElementById("orden-estacion").removeAttribute("disabled");
                document.getElementById("pro").removeAttribute("disabled");
            }
            var tableHeaderRowCount = 2;
            var table = document.getElementById('productosrows');
            var rowCount = table.rows.length;

            for (var i = tableHeaderRowCount; i < rowCount; i++) {
                table.deleteRow(tableHeaderRowCount);
            } 

            var arraydata = [];
            arraydata = JSON.stringify(res.data);
            try{
                if(res.data.indexOf(1)){
                    //CREATES EMPTY ROW (FORMATTED) FOR PRODUCT
                    for(var i=0;i<res.data[1].length-1;i++){
                        var newrow = table.lastChild.cloneNode(true);
                        newrow.childNodes[0].addEventListener("change", Change);
                        newrow.childNodes[4].addEventListener("keyup", Change);
                        table.appendChild(newrow);
                    }

                    //CLEAN DISABLED BEFORE ALL
                    var costosuni_inputs = document.getElementsByName("costouni");
                    for(var j=0; j<costosuni_inputs.length; j++){
                        costosuni_inputs[j].removeAttribute("disabled");
                    }

                    document.getElementById("t-ivaret").removeAttribute("disabled");
                    document.getElementById("t-isrret").removeAttribute("disabled");
                    //console.log(res.data[1].length);
                    //console.log(res.data);

                    for(var i=0;i<res.data[1].length;i++){
                        //console.log(i);
                        //alert(i);
                        if(res.data[1][i].iva == "1"){
                            document.getElementsByName("checkbox")[i].checked = true;
                        } else {
                            document.getElementsByName("checkbox")[i].checked = false;
                        }
                        
                        document.getElementsByName("producto")[i].value = res.data[1][i].producto;
                        document.getElementsByName("unidad")[i].value = res.data[1][i].unidad;
                        document.getElementsByName("cantidad")[i].value = res.data[1][i].cantidad;
                        document.getElementsByName("folio")[i].value = res.data[1][i].folio;
                        if(res.data[1][i].costouni != null){
                        document.getElementsByName("costouni")[i].value = res.data[1][i].costouni;
                        }else{
                            document.getElementsByName("costouni")[i].value = res.data[1][i].costouniinicial;
                        }
                        /*
                        if(res.data[1][i].costouni != null){
                            var costosuni_inputs = document.getElementsByName("costouni");
                            for(var j=0; j<costosuni_inputs.length; j++){
                                costosuni_inputs[j].setAttribute("disabled", "disabled");
                            }
                        } else {
                            var costosuni_inputs = document.getElementsByName("costouni");
                            for(var j=0; j<costosuni_inputs.length; j++){
                                costosuni_inputs[j].removeAttribute("disabled");
                            }
                        }
                        */
                    }

                    var b = document.getElementById("boton");
                
                    if(res.data[1][0].costouni != null){
                        b.setAttribute("hidden", true);

                        var costosuni_inputs = document.getElementsByName("costouni");
                        for(var j=0; j<costosuni_inputs.length; j++){
                            costosuni_inputs[j].setAttribute("disabled", "disabled");
                        }

                        document.getElementById("t-ivaret").setAttribute("disabled", "disabled");
                        document.getElementById("t-isrret").setAttribute("disabled", "disabled");

                    } else {
                        b.removeAttribute("hidden");
                    }

                    //CREATES EMPTY ROW (UNFORMATTED)
                    for(var i=0; i<(16 - res.data[1].length-1); i++){
                        //  var newrow = table.lastChild.cloneNode(true);
                        //console.log(newrow.childNodes[0].addEventListener("change", Change));
                        //console.log(newrow.childNodes[4].addEventListener("keyup", Change));
                        
                        var a = table.insertRow(-1);
                        var b = a.insertCell();
                        b.innerHTML="&nbsp;";
                        a.style.border = "1px solid black"
                        
                    }

                    Change(); 
                }
            } catch(Exception){console.log(Exception);}
            
            try{
                if(res.data.indexOf(2)){
                    for(var i=0;i<document.getElementsByName("proveedor").length;i++){
                        document.getElementsByName("proveedor")[i].value = res.data[2][i].proveedor;  
                        document.getElementsByName("precio")[i].value = res.data[2][i].precio;  
                    } 
                }
            } catch (Exception){}

            try{
                var firmasolicita = document.getElementById("firmasolicita");
                var firmarevisa = document.getElementById("firmarevisa");
                var firmarealiza = document.getElementById("firmarealiza");
                var firmaautoriza = document.getElementById("firmaautoriza");
                var uno = document.getElementById("solicita");
                var unol = document.getElementById("lsolicita");
                var unob = document.getElementById("bsolicita");
                var dos = document.getElementById("revisa");
                var dosl = document.getElementById("lrevisa");
                var dosb = document.getElementById("brevisa");
                var tres = document.getElementById("realiza");
                var tresl = document.getElementById("lrealiza");
                var tresb = document.getElementById("brealiza");
                var cuatro = document.getElementById("autoriza");
                var cuatrol = document.getElementById("lautoriza");
                var cuatrob = document.getElementById("bautoriza");
                
                for(var i=0;i<res.data[3].length;i++){ 
                    if(res.data[3][i].tipo == "1"){
                        uno.innerHTML = res.data[3][i].name;

                        if((props.userid == res.data[3][i].userid) && (res.data[3][i].autorizado == "0")){
                            unob.removeAttribute("hidden");
                            unob.setAttribute("name", "1"); 
                        } else { 
                            if(res.data[3][i].autorizado == "1"){
                                firmasolicita.src = "data:image/png;base64,"+res.data[3][i].imagen; 
                            }
                            unol.removeAttribute("hidden");
                            unob.setAttribute("hidden", true);
                        }
                    } 
                    
                    if(res.data[3][i].tipo == "2"){
                        dos.innerHTML = res.data[3][i].name;   
                        if((props.userid == res.data[3][i].userid) && (res.data[3][i].autorizado == "0")){
                            dosb.removeAttribute("hidden");
                            dosb.setAttribute("name", "2");
                        } else {
                            if(res.data[3][i].autorizado == "1"){
                                firmarevisa.src = "data:image/png;base64,"+res.data[3][i].imagen;
                            }

                            dosl.removeAttribute("hidden");
                            dosb.setAttribute("hidden", true);
                        } 
                    }
                    
                    if(res.data[3][i].tipo == "3"){
                        tres.innerHTML = res.data[3][i].name;
                        if((props.userid == res.data[3][i].userid) && (res.data[3][i].autorizado == "0")){
                            tresb.removeAttribute("hidden");
                            tresb.setAttribute("name", "3");
                        } else {
                            if(res.data[3][i].autorizado == "1"){
                                firmarealiza.src = "data:image/png;base64,"+res.data[3][i].imagen;
                            }
                            
                            tresl.removeAttribute("hidden");
                            tresb.setAttribute("hidden", true);
                        }
                    }
                    
                    if(res.data[3][i].tipo == "4"){
                        cuatro.innerHTML = res.data[3][i].name;
                        if((props.userid == res.data[3][i].userid) && (res.data[3][i].autorizado == "0")){
                           

                            cuatrob.removeAttribute("hidden");
                            cuatrob.setAttribute("name", "4");
                        } else { 
                            if(res.data[3][i].autorizado == "1"){
                                firmaautoriza.src = "data:image/png;base64,"+res.data[3][i].imagen;
                            }

                            cuatrol.removeAttribute("hidden");
                            cuatrob.setAttribute("hidden", true);
                        }
                    }
                }
                var textArea = document.getElementById("autorizartextarea"); 

                if(res.data.indexOf(3)){
                    for(var i=0;i<res.data[3].length;i++){
                        textArea.value = textArea.value + res.data[3][i].name + "\n";
                    } 
                }
            } catch (Exception){}

            getFirmas(idrequisicion);
        }); 
    }

    async function getUsuarios(){
        var id = "2";
        const rese = await axios.get('https://compras.grupopetromar.com/apirest/?id='+id); 
        // console.log(rese.data);
        setValue(rese.data);    
    }

    async function ActualizarStatus(id){
        /*  GET ROW OF WHERE SELECT WAS CHANGED  */
        var rows = document.getElementsByClassName('id-orden');
        var rw;
        
        for(let element of rows){
            if (element.innerHTML == id){
                var tr = element.parentElement;
                var td = tr.getElementsByTagName('select')[0];
                rw = td.value;
            }
        }

        if(window.confirm('Quieres actualizar a: ' + rw)){
            let fd = new FormData() 
            fd.append("id", "12")
            fd.append("idorden", id)
            fd.append("nvoestado", rw)
            const res = await axios.post('https://compras.grupopetromar.com/apirest/', fd); 
            console.log(res.data);
            alert(res.data);
            getOrdenes();
        }
    }

    function Change(){ 
        var checkbox = document.getElementsByName('checkbox');   
        var cantidades = document.getElementsByName('cantidad');
        var costosuni = document.getElementsByName('costouni');
        var totales = document.getElementsByName('total'); 
        var ivaret = document.getElementById('t-ivaret'); 
        var isrret = document.getElementById('t-isrret'); 

        var ivar = 0;
        var isrr = 0;

        if(ivaret.value != ""){
            ivar = parseFloat(ivaret.value);
        } 
        if(isrret.value != ""){
            isrr = parseFloat(isrret.value);
        }

        var subtotal = 0;
        var totalesz;
        var iva = 0;
        
        for(var i = 0; i<costosuni.length; i++){
            if((costosuni[i].value !="") && (cantidades[i].value != "")){
                totales[i].value = ((costosuni[i].value * cantidades[i].value)).toLocaleString("en-US"); 
                if(checkbox[i].checked == true){
                    iva = iva + ((parseFloat((costosuni[i].value * cantidades[i].value))) * 0.16);
                }else{} 
                subtotal += parseFloat((costosuni[i].value * cantidades[i].value));
            } else { 
                totales[i].value = ""; 
            }
        }

        document.getElementById("t-subtotal").value = subtotal;
        document.getElementById("t-iva").value = iva; 
        document.getElementById("t-total").value = (
            parseFloat(document.getElementById("t-subtotal").value) +
            parseFloat(document.getElementById("t-iva").value) - ivar - isrr
        );

            //Add format 
        document.getElementById("t-subtotal").value = parseFloat(document.getElementById("t-subtotal").value).toLocaleString("en-US");
        document.getElementById("t-iva").value = parseFloat(document.getElementById("t-iva").value).toLocaleString("en-US");
        document.getElementById("t-total").value  = parseFloat(document.getElementById("t-total").value).toLocaleString("en-US");
    }

    function formatDate(date){
		let index = date.search(" ");
		date = date.substring(0, index);
		date = date.split("-");
		let formatedDate = date[2] +"/"+ date[1] +"/"+ date[0];
		// console.log(formatedDate);
        return(formatedDate);
	}

    // Dynamically create select list
    let options = [];

    return(
        <div className="container "> 
            <Nabvar departamento={props.rzonsocial} dptoid={props.dptoid}/> 

            <div className="row p-3">
                <h3>Autorizar  </h3>
            
                <div>
                    <span>Filtrar por fecha &nbsp;</span>
                    <input id='input-fecha' type='date' style={{width:'10vw',fontSize:'12px', cursor:'pointer'}} onKeyUp={() => getOrdenes()}></input>
                </div>

            <div style={{maxHeight:'22vmax', overflowY: 'scroll', width:'100%'}}>
                <table id="productstable"  style={{width:'100%'}}> 
                    <tr>
                        <th>Folio</th>
                        <th>Fecha</th>
                        <th>Solicita</th>
                        <th>Estado</th>
                        <th>Detalles</th> 
                        <th>Cotización</th>
                        <th>Orden de Pago</th>
                    </tr>

                    {lista.map(item => ( 
                    <tr>
                        <td className='id-orden' >{item.foliof}</td>
                        <td>{ formatDate(item.fechacaptura) }</td>
                        <td>{item.name}</td>

                        <td>
                            {((item.estadoorden == "Generada") && (props.tipo ==  "2")) ? 
                                <select name={item.estadoorden} onChange={() => ActualizarStatus(item.ordencompra)}>
                                <option>{item.estadoorden}</option>
                                <option>Cancelada</option>
                                <option>Surtida</option>
                                </select> : <label>{item.estadoorden}</label>
                            }
                        </td>
                        
                        <td>
                            <button type="button" id={item.idrequisicion} className='btn btn-outline-success btn-sm' onClick={() => verOrden(item.idrequisicion)}>Ver</button>
                        </td>
                        
                        {/*  COLUMNA DE COTIZACIONES  */}
                        {(item.cotizacion == null) ? 
                        <td>
                            <button value={item.idrequisicion} className='btn btn-outline-success btn-sm' onClick={()=>addCotizacion(item.idrequisicion)}>Añadir</button>
                        </td> :
                        <td>
                            <a target="_blank" href={'https://compras.grupopetromar.com/apirest/cotizaciones/'+item.cotizacion}>Ver</a>
                        </td>
                        }   
                        
                        {(item.ordenpago == 0) ? 
                        <td> 
                           <button value={item.ordencompra} className='btn btn-outline-success btn-sm' onClick={()=>generarOrdenPago(item.ordencompra)}>Generar</button>
                        </td>  :
                        <td>
                           <label>Generada</label>
                        </td>
                        }   
                        <td>
                            <input id="idreq" value={item.idrequisicion} hidden></input>
                        </td>
                        
                    </tr>
                    ))}	
                    
                    <input id='input-cotizacion' type='file' style={{display:'none'}} onChange={()=> postFile()}></input>

                </table> 
            </div>

            

            <div style={{margin:'auto'}} > 
                <br></br> <br></br> 
                    <div id="pdf" style={{display: 'flex', flexDirection: 'column'}}>
                        <br></br>
                        
                        <div style={{display: 'flex', justifyContent: 'space-between'}}>
                            <div style={{display: 'flex', flexDirection: 'column'}}>
                                <img src={logo} alt="LOGO" style={{width: '160px', height: 'auto', paddingLeft:'25px'}}></img>
                                <span><b style={{fontSize: '25px'}}>ORDEN DE COMPRA</b></span>
                            </div>
            
                            <div style={{display: 'flex', flexDirection: 'column'}}>
                                <span><b style={{fontSize:'30px'}} id="rzonsocial"></b></span>
                                <span><b id="direccion"></b></span> 
                                <span><b>01 669 983 7071 y 986 1513</b></span>
                            </div>

                            <div style={{display: 'flex', flexDirection: 'column'}}>
                                <table style={{border: '1px solid black'}} align="center">
                                    <tr align="center">
                                        <th style={{backgroundColor:'#ddd', width:'120px', borderBottom:'1px solid black'}} align="center">Folio</th> 
                                    </tr>
                                    <tr>
                                        <td>
                                            <input id="folio" readOnly="readonly" style={{width:'120px', backgroundColor:'transparent', border:'none', textAlign:'center'}}></input>
                                        </td>
                                    </tr>
                                </table>
                                <br></br>
                                <table style={{border: '1px solid black'}}>
                                    <tr align="center">
                                        <th style={{backgroundColor:'#ddd', borderBottom:'1px solid black'}}>Fecha</th> 
                                    </tr>
                                    <tr>
                                        <td>
                                            <input id="fecha" readOnly='readonly' style={{width:'120px', backgroundColor:'transparent', border:'none', textAlign:'center'}}></input> 
                                        </td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                        <br></br> <br></br> 

                        <table style={{border:'1px solid black'}}>
                            <tr style={{backgroundColor: '#ddd'}}>
                                <th style={{border:'1px solid black'}}>PROVEEDOR</th>
                                <th style={{border:'1px solid black'}}>ESTACIÓN</th>
                            </tr>

                            <tr>
                                <td style={{border:'1px solid black', width:'663px'}}>
                                    <div class="select-editable">
                                        <select  id="pro" onChange={() => (document.getElementById("orden-proveedor").value = document.getElementById("pro").value)}>
                                            <option value=""></option>
                                            {proveedor.map(item => ( 
                                            <option  value={item.proveedor}> {item.proveedor}</option>))
                                            }   
                                        </select>
                                        <br></br>
                                        
                                        <input id="orden-proveedor" type="text" name="format" />
                                    </div>
                                </td>

                                <td id="departamento" style={{border:'1px solid black'}}>
                                    <select id="orden-estacion" style={{width:'100%', backgroundColor:'transparent', border:'none'}}>
                                        <option value='1'>Corporativo</option>
                                        <option value='2'>Santa Fe</option>
                                        <option value='3'>Ley del Mar</option>
                                        <option value='4'>Libramiento</option>
                                        <option value='5'>Munich</option>
                                        <option value='6'>Insurgentes</option>
                                        <option value='7'>Lopez Saenz</option>
                                        <option value='8'>Rio</option>
                                    </select>
                                </td>
                            </tr>

                            <tr style={{backgroundColor: '#ddd'}}>
                                <th style={{border:'1px solid black'}}>DEPARTAMENTO</th>
                            </tr>

                            <tr>
                                <td>
                                    <input id="departamentos" style={{width:'100%', backgroundColor:'white', border:'none'}} />
                                </td>
                            </tr>
                        </table>
                        <br></br> <br></br> 
        
                        <table id='productosrows' style={{border:'1px solid black'}}>
                            <tr style={{backgroundColor: '#ddd', height:'45px', border:'1px solid black'}} align="center">
                                <th style={{width: '20px', border:'1px solid black'}} id="ivath">IVA</th>
                                <th style={{width: '110px', border:'1px solid black'}}>CANTIDAD</th>
                                <th style={{width: '110px', border:'1px solid black'}}>UNIDAD</th>
                                <th style={{border:'1px solid black'}}>CONCEPTO</th>
                                <th style={{width: '120px', border:'1px solid black'}}>COSTO UNITARIO</th>
                                <th style={{width: '120px', border:'1px solid black'}}>TOTAL</th>
                            </tr>
                            <tr Name='rowprods' style={{height:'30px'}}>
                                <td align="center" style={{border:'1px solid black'}}><input type="checkbox" onChange={() => Change()} name="checkbox"/> </td>
                                <td style={{border:'1px solid black'}}> <input name="cantidad" readonly="readonly" style={{width:'95%', backgroundColor:'transparent', border:'none', textAlign:'center'}}/> </td>
                                <td style={{border:'1px solid black'}}> <input name="unidad" readonly="readonly" style={{width:'95%', backgroundColor:'transparent', border:'none', textAlign:'center'}}/> </td>
                                <td style={{border:'1px solid black'}}> <input name="producto" readonly="readonly" style={{width:'95%', backgroundColor:'transparent', border:'none'}}/> </td>
                                <td style={{border:'1px solid black'}}> &nbsp;$<input name="costouni"    onChange={() => Change()} style={{width:'85%', backgroundColor:'transparent', border:'none', textAlign:'right'}}/> </td>
                                <td style={{border:'1px solid black'}}> &nbsp;$<input name="total" readonly="readonly" style={{width:'85%', backgroundColor:'transparent', border:'none', textAlign:'right'}}/> </td>
                                <input name="folio" type='hidden'></input>
                            </tr>
                        </table>
                        
                        <div>
                            <label id="divdolares">Precio en dolares  &nbsp;</label>
                            <input type="checkbox" id="checkboxdolares"/> <br/>
                            <input type="text" id="checkdlls-valor"/>
                        </div> <br/><br/><br/>
                      
                        <table>
                            <tr style={{height:'30px',backgroundColor: '#ddd'}}>
                                <td colspan="3">-</td>
                                <td style={{width:'120px'}}>-</td>
                                <td style={{width:'120px', height:'30px', backgroundColor: '#ddd'}}>-</td>
                            </tr>
                            <tr style={{height:'30px',backgroundColor: '#ddd'}} align="center">
                                <td colspan="3" rowspan="5" style={{backgroundColor: 'white'}}> <textarea rows="3" id="observaciones" style={{width:'100%', height:'100%', resize: 'none', border:'none'}}></textarea>
                                    <textarea rows="3" id="facturacion" style={{width:'100%', height:'100%', resize: 'none', border:'none'}} readonly="readonly"></textarea>
                                </td>
                                <td style={{backgroundColor: '#ddd', borderTop:'1px solid black', borderLeft:'1px solid black', fontWeight:'bold'}} align="center">SUBTOTAL</td>
                                <td style={{backgroundColor: '#ddd', borderTop:'1px solid black', borderLeft:'1px solid black', borderRight:'1px solid black'}}> &nbsp;$<input readonly="readonly" id='t-subtotal' style={{width:'85%', backgroundColor:'transparent', border:'none', textAlign:'right'}}></input> </td>
                            </tr>
                            <tr style={{height:'30px',backgroundColor: '#ddd'}} align="center"> 
                                <td style={{backgroundColor: '#ddd', borderTop:'1px solid black', borderLeft:'1px solid black', fontWeight:'bold'}}>IVA</td>
                                <td style={{backgroundColor: '#ddd', borderTop:'1px solid black', borderLeft:'1px solid black', borderRight:'1px solid black'}}> &nbsp;$<input readonly="readonly" id='t-iva' style={{width:'85%', backgroundColor:'transparent', border:'none', textAlign:'right'}}></input> </td>
                            </tr>
                            <tr style={{height:'30px',backgroundColor: '#ddd'}} align="center"> 
                                <td style={{backgroundColor: '#ddd', borderTop:'1px solid black', borderLeft:'1px solid black', fontWeight:'bold'}}>IVA RET</td>
                                <td style={{backgroundColor: '#ddd', borderTop:'1px solid black', borderLeft:'1px solid black', borderRight:'1px solid black'}}> &nbsp;$<input onChange={(e) => onChange(e)} value={isr} id='t-ivaret' style={{width:'85%', backgroundColor:'transparent', border:'none', textAlign:'right'}}></input> </td>
                            </tr>
                            <tr style={{height:'30px',backgroundColor: '#ddd'}} align="center"> 
                                <td style={{backgroundColor: '#ddd', borderTop:'1px solid black', borderLeft:'1px solid black', fontWeight:'bold'}}>ISR RET</td>
                                <td style={{backgroundColor: '#ddd', borderTop:'1px solid black', borderLeft:'1px solid black', borderRight:'1px solid black'}}> &nbsp;$<input onChange={(e) => onChange1(e)} value={isr1} id='t-isrret' style={{width:'85%', backgroundColor:'transparent', border:'none', textAlign:'right'}}></input> </td>
                            </tr>
                            <tr style={{height:'30px',backgroundColor: '#ddd', borderBottom:'1px solid black'}} align="center"> 
                                <td style={{backgroundColor: '#ddd', borderTop:'1px solid black', borderLeft:'1px solid black', fontWeight:'bold'}}>TOTAL</td>
                                <td style={{backgroundColor: '#ddd', borderTop:'1px solid black', borderLeft:'1px solid black', borderRight:'1px solid black'}}> &nbsp;$<input readonly="readonly" id='t-total' style={{width:'85%', backgroundColor:'transparent', border:'none', textAlign:'right'}}></input> </td>
                            </tr>
                            <tr align="right">
                                <td colspan="5">
                                    <button type="button" id="boton" className='btn btn-outline-success btn-sm' style={{marginTop:'3px'}} onClick={() => guardarPrecios()}>Guardar</button>
                                </td>
                            </tr>
                        </table> <br/><br/>
                        
                        <div style={{display: 'flex', gap: '15px'}}>
                            <div style={{border: '1px solid black', flexDirection:'column', flex: '1', backgroundColor:'white'}} align="center">
                                <span><img id='firmasolicita'   width="250" height='180' style={{borderBottom: '1px solid black'}}></img></span><br></br>
                                <label id="solicita"></label><br></br>
                                <button   className='btn btn-outline-success btn-sm' onClick={() => Autorizar("1")} id="bsolicita" style={{paddingBottom:'5px', marginTop:'10px'}} hidden>SOLICITO</button> 
                                <label id="lsolicita" style={{paddingBottom:'10px'}} hidden>SOLICITÓ</label><br></br> 
                                <span>&nbsp;</span>
                            </div>
                            <div style={{border: '1px solid black', flexDirection:'column', flex: '1', backgroundColor:'white'}} align="center">
                                <span><img id='firmarevisa'   width="250" height='180' style={{borderBottom: '1px solid black'}}></img></span><br></br>
                                <label id="revisa"></label><br></br>
                                <button className='btn btn-outline-success btn-sm' onClick={() => Autorizar("2")} id="brevisa" style={{paddingBottom:'5px', marginTop:'10px'}} hidden>REVISO</button> 
                                <label id="lrevisa" style={{paddingBottom:'10px'}} hidden>REVISÓ</label> <br></br> 
                                <span>&nbsp;</span>
                            </div>
                            <div style={{border: '1px solid black', flexDirection: 'column', flex: '1', backgroundColor:'white'}} align="center">
                                <span><img id='firmarealiza'   width="250" height='180' style={{borderBottom: '1px solid black'}}></img></span> <br></br>
                                <label id='realiza'></label><br></br>
                                <button className='btn btn-outline-success btn-sm' onClick={() => Autorizar("3")} id="brealiza" style={{paddingBottom:'5px', marginTop:'10px'}} hidden>REALIZO</button> 
                                <label id="lrealiza" style={{paddingBottom:'20px'}} hidden>REALIZÓ</label><br></br> 
                                <span>&nbsp;</span>
                            </div>
                            <div style={{border: '1px solid black', flexDirection: 'column', flex: '1', backgroundColor:'white'}} align="center">
                                <span><img id='firmaautoriza'   width="250" height='180' style={{borderBottom: '1px solid black'}}></img></span><br></br>
                                <label id='autoriza'></label><br></br>
                                <button style={{marginTop:'5px'}}  className='btn btn-outline-success btn-sm' onClick={() => Autorizar("4")} id="bautoriza" style={{paddingBottom:'5px', marginTop:'10px'}} hidden>AUTORIZO</button> 
                                <label id="lautoriza" style={{paddingBottom:'10px'}} hidden>AUTORIZÓ</label> <br></br> 
                                <span>&nbsp;</span>   
                            </div>
                        </div>
                    </div>
                    <br></br>
                    
                    <button className="btn btn-outline-success btn-sm" onClick={(e) => Pdf(e)} >Imprimir <FaPrint /></button> 
                    <script></script>
                </div>
            </div>
        </div>
    );   
}

export default Ordenes;
