import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import Header from "../../components/Header";
import PopupMensaje from "../../components/PopupMensaje";
import DatosPersonalesHeader from "../../components/DatosPersonalesHeader";
import clienteServices from "../../services/ClienteServices";
import Constantes from "../../Constantes";




/**
 * Componente funcion que permite registrar un nuevo cliente en la plataforma
 */
function Registro({isRegistro}) 
{
  const [correo, setCorreo] = useState("ivan.hernandez.coral@gmail.com");
  const [clave, setClave] = useState("12345");
  const [nombres, setNombres] = useState("ivan hernandez");
  const [cedula, setCedula] = useState("13072207");
  const [telefono, setTelefono] = useState("3014317636");
  const [direccion, setDireccion] = useState("valle lili");
  const [fechaNacimiento, setFechaNacimiento] = useState("2020-10-20");
  const [sexo, setSexo] = useState("M");
  const [politicas, setPoliticas] = useState(true);
  const [pais, setPais] = useState("EC");
  const [codProvincia, setCodProvincia] = useState("20");
  const [codCiudad, setCodCiudad] = useState("002");
  const [isMostrarPopup, setMostrarPopup] = useState(false);
  const [mensajePopup, setMensajePopup] = useState("");

  //Hook de react-router-dom maneja el historial de navegación
  let history = useHistory(); 

  
  

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
      //Capturando los datos digitados por el cleinte
      let cliente =
      {
        cedula, nombres, codProvincia, codCiudad, direccion, correo, telefono, clave, fecha:fechaNacimiento, direccionEntrega:direccion, estado:1
      }

      
      let respuesta = null;

      if(isRegistro)
      {
        //Se validan los datos a traves del api-rest
        respuesta = await clienteServices.registrarCliente(cliente);
      }
      else
      {
        respuesta = await clienteServices.actualizarInformacionCliente(cliente);
      }

      let status = respuesta.status;
      let clienteBD = respuesta.clienteBD;

      switch (status) 
      {
        case Constantes.STATUS_OK:
          //El cliente se creo exitosamente y se guarda token en AsyncStorage
          localStorage.setItem("@cliente", JSON.stringify(clienteBD));
          history.goBack();
          break;

        case Constantes.STATUS_CREATED:
          //Valida si el cliente ya esta registrado en BD a través del correo
          setMensajePopup("Ingresaste un direccion de email que ya esta\nregistrada en Acuatex, Si ya eres miembro,\nhaz clic en Iniciar sesión");
          setMostrarPopup(true);
          break;
        
        default:
          //Valida si hubo un error en el api-rest al crear el cliente
          setMensajePopup("En el momento, no es posible registrar tus datos.");
          setMostrarPopup(true);
          break;
      }
    }
  };



  /**
   * Función que permite abrir o cerrar el popup de mensajes
   */
  const togglePopup = () => 
  {
    setMostrarPopup(!isMostrarPopup);
  }


  const onChangeCorreo = (e) => 
  {
    console.log(e.target.value);
    setCorreo(e.target.value)
  }


  const onChangeClave = (e) => 
  {
    console.log(e.target.value);
    setClave(e.target.value)
  }




  return (
    <div className="bgg-success">
      <Header height={"none"} fondo={""} titulo={""}/>

      <div className="container mt-5 pt-5 bgg-dark" style={{width:"42%"}}>
        <h2>{isRegistro ? "ESCRIBE TUS " : null} DATOS PERSONALES</h2>
        <form className="needs-validation bgg-warning" onSubmit={validarFormulario} noValidate>

        <DatosPersonalesHeader onChangeCorreo={onChangeCorreo} valorCorreo={correo} onChangeClave={onChangeClave} valorClave={clave}/>
          
          {/* {
            isRegistro && 
              <div className="row form-group">
                <div className="col mt-5 mr-4">
                  <label htmlFor="correo">E-mail:</label>
                  <input type="correo" className="form-control" id="correo" placeholderr="E-mail" name="correo" required value={correo} onChange={onChangeCorreo} />
                  <div className="invalid-feedback">
                    Este campo es obligatorio.
                  </div>
                </div>
                <div className="col mt-5 ml-4">
                  <label htmlFor="pwd">Contraseña:</label>
                  <input type="password" className="form-control" id="pwd" placeholderr="Contraseña" name="pswd" required value={clave} onChange={e => setClave(e.target.value)} />
                  <div className="invalid-feedback">
                    Este campo es obligatorio.
                  </div>
                </div>
              </div>
          } */}

          <div className="row form-group mt-5">
            <div className="col mr-4">
              <label htmlFor="nombres">Nombre completo:</label>
              <input type="text" className="form-control" placeholderr="Enter nombres completos" id="nombres" required value={nombres} onChange={e => setNombres(e.target.value)} />
              <div className="invalid-feedback">
                Este campo es obligatorio.
              </div>
            </div>
            <div className="col ml-4">
              <label htmlFor="cedula">Cedula:</label>
              <input type="text" className="form-control" placeholderr="Enter cedula" id="cedula" required value={cedula} onChange={e => setCedula(e.target.value)} />
              <div className="invalid-feedback">
                Este campo es obligatorio.
              </div>
            </div>
          </div>

          
          <div className="row form-group mt-5">
            <div className="col mr-4">
              <label htmlFor="telefono">Número de teléfono:</label>
              <input type="text" className="form-control" placeholderr="Enter teléfono" id="telefono" required value={telefono} onChange={e => setTelefono(e.target.value)} />
              <div className="invalid-feedback">
                Este campo es obligatorio.
              </div>
            </div>
            <div className="col ml-4">
              <label htmlFor="direccion">Dirección:</label>
              <input type="text" className="form-control" placeholderr="Enter Dirección" id="direccion" required value={direccion} onChange={e => setDireccion(e.target.value)} />
              <div className="invalid-feedback">
                Este campo es obligatorio.
              </div>
            </div>
          </div>


          <div className="row form-group mt-5">
            <div className="col mr-4">
              <label htmlFor="fechaCumpleaños">Fecha cumpleaños:</label>
              <input type="date" className="form-control" placeholderr="Enter fecha cumpleaños" id="fechaCumpleaños" value={fechaNacimiento} onChange={e => setFechaNacimiento(e.target.value)} />
            </div>
            <div className="col ml-4">
              Sexo
              <div>
                <div className="custom-control-inline custom-radio ml-4 mt-2">
                  <input type="radio" className="custom-control-input" id="mujer" name="mujer" checked={sexo === "F" ? true : false} onChange={() => setSexo("F")} />
                  <label className="custom-control-label" htmlFor="mujer">Mujer</label>
                </div>
                <div className="custom-control-inline custom-radio ml-4">
                  <input type="radio" className="custom-control-input" id="hombre" name="hombre" checked={sexo === "M" ? true : false} onChange={() => setSexo("M")}/>
                  <label className="custom-control-label" htmlFor="hombre">Hombre</label>
                </div>
              </div>
            </div>
          </div>
          

          <div className="row form-group mt-5">
            <div className="col mr-4">
                <label htmlFor="pais">País:</label>
                <select className="custom-select" id="pais" value={pais} onChange={e => setPais(e.target.value)} disabled={true}>
                  <option value="EC">Ecuador</option>
                  <option value="CO">Colombia</option>
                </select>
            </div>
            <div className="col ml-4">
              <label htmlFor="codProvincia">Provincia:</label>
              <select className="custom-select" id="codProvincia" value={codProvincia} onChange={e => setCodProvincia(e.target.value)} >
                  <option value="01">AZUAY</option>
                  <option value="02">BOLIVAR</option>
                </select>
            </div>
          </div>


          <div className="row form-group mt-5">
            <div className="col mr-4">
              <label htmlFor="codCiudad">Ciudad:</label>
              <select className="custom-select" id="codCiudad" value={codCiudad} onChange={e => setCodCiudad(e.target.value)} >
                <option value="001">CUENCA</option>
                <option value="001">GUARANDA</option>
              </select>
            </div>
            <div className="col ml-4">
              
            </div>
          </div>
        

          {
            isRegistro && 
            <div className="row form-group mt-5">
              <div className="col">
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" id="politicas" required value={politicas} onChange={e => setPoliticas(e.target.value)}/>
                  <label className="form-check-label" htmlFor="politicas" style={{fontSize:13}}>
                    He podido leer y entiendo la Política de Privacidad
                  </label>
                  <div className="invalid-feedback">
                    Este campo es obligatorio.
                  </div>
                </div>
              </div>
            </div>
          }


          <div className="row form-group mt-3">
            <div className="col">
              <button type="submit" className="btn btn-lg mt-4 btn-dark" style={{width: isRegistro ? 220: 310, fontSize:17}}>{isRegistro ? "REGISTRAR" : "ACTUALIZAR DATOS PERSONALES"}</button>
            </div>
          </div>
        </form>
      </div>

      {
        isMostrarPopup && <PopupMensaje togglePopup={togglePopup} mensaje={mensajePopup} titulo={"AVISO"} />
      }
    
    </div>
  );
}

export default Registro;
