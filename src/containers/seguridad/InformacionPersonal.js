import React, { useState, useEffect } from "react";

import Header from "../../components/Header";
import PopupMensaje from "../../components/PopupMensaje";
import clienteServices from "../../services/ClienteServices";
import Constantes from "../../Constantes";




/**
 * Componente funcion que permite registrar un nuevo cliente en la plataforma
 */
function InformacionPersonal() 
{
  const [nombres, setNombres] = useState("");
  const [cedula, setCedula] = useState("");
  const [telefono, setTelefono] = useState("");
  const [direccion, setDireccion] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [sexo, setSexo] = useState("");
  const [pais, setPais] = useState("");
  const [codProvincia, setCodProvincia] = useState("");
  const [codCiudad, setCodCiudad] = useState("");
  const [isMostrarPopup, setMostrarPopup] = useState(false);
  const [mensajePopup, setMensajePopup] = useState("");

  const [cliente] = useState(JSON.parse(localStorage.getItem("@cliente")));


  

  useEffect(() => 
	{
		console.log("useEffect Informacion Personal");

    // let clienteStorage = JSON.parse(localStorage.getItem("@cliente"));
 
    
    if(null !== cliente)
    {
      setNombres(cliente.nombres);
      setCedula(cliente.cedula);
      setTelefono(cliente.telefono);
      setDireccion(cliente.direccion);
      setSexo("F");
      setPais("EC");
      // setFechaNacimiento(cliente.fechaNacimiento);
      setCodProvincia(cliente.codProvincia);
      setCodCiudad(cliente.codCiudad);
    }
		
  }, [cliente])
  
  

  /**
   * Función que permite validar y registrar un cliente
   * @param event Evento generado por el boton del formulario
   */
  const validarFormulario = async (event) => 
  {
    event.preventDefault();
    event.target.className += " was-validated";

    if (event.target.checkValidity()) 
    {
      // let cliente = JSON.parse(localStorage.getItem("@cliente"));

      cliente.nombres = nombres;
      cliente.codProvincia = codProvincia;
      cliente.codCiudad = codCiudad;
      cliente.direccion = direccion;
      cliente.telefono = telefono;
      cliente.fecha = fechaNacimiento;
      cliente.direccionEntrega = direccion;
      cliente.estado = 1;

      
      //Se validan los datos a traves del api-rest
      let {status, isClienteActualizado} = await clienteServices.actualizarCliente(cliente);

      let mensaje = "En el momento, no es posible actualizar tus datos.";

      if(Constantes.STATUS_OK === status && isClienteActualizado)
      {
        //El cliente se creo exitosamente y se guarda token en AsyncStorage
        localStorage.setItem("@cliente", JSON.stringify(cliente));
        mensaje = "Tu información se ha guardado correctamente.";
      }
      
      setMensajePopup(mensaje);
      setMostrarPopup(true);
    }
  };



  /**
   * Función que permite abrir o cerrar el popup de mensajes
   */
  const togglePopup = () => 
  {
    setMostrarPopup(!isMostrarPopup);
  }





  return (
    <div className="bgg-success">
      <Header height={"none"} fondo={""} titulo={""}/>

      <div className="container mt-5 pt-5 bgg-dark" style={{width:"42%"}}>
        <h2>DATOS PERSONALES</h2>
        <form className="needs-validation bgg-warning" onSubmit={validarFormulario} noValidate>
  
          <div className="row form-group mt-5">
            <div className="col mr-4">
              <label htmlFor="txtNombres">Nombre completo:</label>
              <input type="text" className="form-control" placeholderr="Enter nombres completos" id="txtNombres" required value={nombres || ''} onChange={e => setNombres(e.target.value)} />
              <div className="invalid-feedback">
                Este campo es obligatorio.
              </div>
            </div>
            <div className="col ml-4">
              <label htmlFor="txtCedula">Cedula:</label>
              <input type="text" className="form-control" placeholderr="Enter cedula" id="txtCedula" readOnly required value={cedula} onChange={e => setCedula(e.target.value)} />
              <div className="invalid-feedback">
                Este campo es obligatorio.
              </div>
            </div>
          </div>

          
          <div className="row form-group mt-5">
            <div className="col mr-4">
              <label htmlFor="txtTelefono">Número de teléfono:</label>
              <input type="text" className="form-control" placeholderr="Enter teléfono" id="txtTelefono" required value={telefono} onChange={e => setTelefono(e.target.value)} />
              <div className="invalid-feedback">
                Este campo es obligatorio.
              </div>
            </div>
            <div className="col ml-4">
              <label htmlFor="txtDireccion">Dirección:</label>
              <input type="text" className="form-control" placeholderr="Enter Dirección" id="txtDireccion" required value={direccion} onChange={e => setDireccion(e.target.value)} />
              <div className="invalid-feedback">
                Este campo es obligatorio.
              </div>
            </div>
          </div>


          <div className="row form-group mt-5">
            <div className="col mr-4">
              <label htmlFor="txtFechaCumpleaños">Fecha cumpleaños:</label>
              <input type="date" className="form-control" placeholderr="Enter fecha cumpleaños" id="txtFechaCumpleaños" value={fechaNacimiento} onChange={e => setFechaNacimiento(e.target.value)} />
            </div>
            <div className="col ml-4">
              Sexo
              <div>
                <div className="custom-control-inline custom-radio ml-4 mt-2">
                  <input type="radio" className="custom-control-input" id="rbMujer" name="mujer" checked={sexo === "F" ? true : false} onChange={() => setSexo("F")} />
                  <label className="custom-control-label" htmlFor="rbMujer">Mujer</label>
                </div>
                <div className="custom-control-inline custom-radio ml-4">
                  <input type="radio" className="custom-control-input" id="rbHombre" name="hombre" checked={sexo === "M" ? true : false} onChange={() => setSexo("M")}/>
                  <label className="custom-control-label" htmlFor="rbHombre">Hombre</label>
                </div>
              </div>
            </div>
          </div>
          

          <div className="row form-group mt-5">
            <div className="col mr-4">
                <label htmlFor="cbxPais">País:</label>
                <select className="custom-select" id="cbxPais" value={pais} onChange={e => setPais(e.target.value)} disabled={true}>
                  <option value="EC">Ecuador</option>
                  <option value="CO">Colombia</option>
                </select>
            </div>
            <div className="col ml-4">
              <label htmlFor="cbxCodProvincia">Provincia:</label>
              <select className="custom-select" id="cbxCodProvincia" value={codProvincia} onChange={e => setCodProvincia(e.target.value)} >
                  <option value="01">AZUAY</option>
                  <option value="02">BOLIVAR</option>
                </select>
            </div>
          </div>


          <div className="row form-group mt-5">
            <div className="col mr-4">
              <label htmlFor="cbxCodCiudad">Ciudad:</label>
              <select className="custom-select" id="cbxCodCiudad" value={codCiudad} onChange={e => setCodCiudad(e.target.value)} >
                <option value="001">CUENCA</option>
                <option value="001">GUARANDA</option>
              </select>
            </div>
            <div className="col ml-4">
              
            </div>
          </div>
        
          <div className="row form-group mt-3">
            <div className="col">
              <button type="submit" className="btn btn-lg mt-4 btn-dark" style={{width: 310, fontSize:17}}>ACTUALIZAR DATOS PERSONALES</button>
            </div>
          </div>
        </form>
      </div>

      {
        isMostrarPopup && <PopupMensaje togglePopup={togglePopup} mensaje={mensajePopup} titulo={"DATOS GUARDADOS"} />
      }
    
    </div>
  );
}

export default InformacionPersonal;