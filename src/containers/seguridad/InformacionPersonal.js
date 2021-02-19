import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";

import Header from "../../components/Header";
import PopupMensaje from "../../components/PopupMensaje";
import clienteServices from "../../services/ClienteServices";
import ciudadServices from "../../services/CiudadServices"; 
import autenticacionServices from "../../services/AutenticacionServices";
import Constantes from "../../Constantes";




/**
 * Componente funcion que permite registrar un nuevo cliente en la plataforma
 */
function InformacionPersonal() 
{
  const [isTokenValido, setTokenValido] = useState(autenticacionServices.getToken() ? true : false);
  const [nombres, setNombres] = useState("");
  const [cedula, setCedula] = useState("");
  const [telefono, setTelefono] = useState("");
  const [direccion, setDireccion] = useState("");
  const [dia, setDia] = useState("");
  const [mes, setMes] = useState("");
  const [año, setAño] = useState("");
  const [sexo, setSexo] = useState("");
  const [pais, setPais] = useState("");
  const [codProvincia, setCodProvincia] = useState("");
  const [codCiudad, setCodCiudad] = useState("");
  const [correo, setCorreo] = useState("");
  const [isMostrarPopup, setMostrarPopup] = useState(false);
  const [mensajePopup, setMensajePopup] = useState("");
  const [lstProvincias, setLstProvincias] = useState([]);
  const [lstCiudades, setLstCiudades] = useState([]);
  const [lstCiudadesFiltradas, setLstCiudadesFiltradas] = useState([]);
  const [lstDias] = useState([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31]);
  const [lstMeses] = useState([1,2,3,4,5,6,7,8,9,10,11,12]);
  const [lstAños, setLstAños] = useState([]);


  

  useEffect(() => 
	{
    
    console.log("useEffect Informacion Personal");


    /**
     * Metodo que permite cargar los articulos desde el API-REST
     */
    const cargarInformacion = async () => 
    {
      try 
      {
        //Se obtiene el cliente a traves del api-rest y se valida si el token es valido
        let {status, clienteBD} = await clienteServices.getCliente();

        switch (status)
        {
          case Constantes.STATUS_OK:
            let {status, lstCiudadesBD} = await ciudadServices.getAllCiudades();
  
            //Se carga el listado de años desde 1905 al año actual (Referencia de facebook)
            let añoActual = new Date().getFullYear();
    
            const lstAñosPredefinida = [];
    
            for (let año = añoActual; año >= 1905; año--) 
            {
              lstAñosPredefinida.push(año);
            }
    
            setLstAños(lstAñosPredefinida);

            let fechaNacimiento = new Date(clienteBD.fecha);

            setCorreo(clienteBD.correo);
            setNombres(clienteBD.nombres);
            setCedula(clienteBD.cedula);
            setTelefono(clienteBD.telefono);
            setDireccion(clienteBD.direccion);
            setSexo("F");
            setPais("EC");
            //El valor devuelto por getDay() es un entero correspondiente al día de la semana; siendo 0 (Domingo) el primer día, 1 (Lunes) el segundo
            setDia(fechaNacimiento.getDate());
            //El valor devuelto por getMonth() es un entero entre 0 y 11, donde 0 corresponde a Enero, 1 a Febrero y así sucesivamente
            setMes(fechaNacimiento.getMonth() + 1);
            setAño(fechaNacimiento.getFullYear());

            if (Constantes.STATUS_OK === status) 
            {
              setLstCiudades(lstCiudadesBD);
              //Cargando todas las provincias
              setLstProvincias(lstCiudadesBD.filter(ciudad => "" === ciudad.codigoCiudad));
              setCodProvincia(clienteBD.codProvincia);

              //Cargando todas las ciudades
              setLstCiudadesFiltradas(lstCiudadesBD.filter(ciudad => ciudad.codigoCiudad.includes(clienteBD.codProvincia+"-")));
              setCodCiudad(clienteBD.codProvincia.concat("-", clienteBD.codCiudad));
            }
            break;

          case Constantes.STATUS_ACCESO_DENEGADO:
            
            //Si tiene token es porque estoy logueado y debo informar que la sesión expiro
            if(autenticacionServices.getToken())
            {
              alert("Tu sesión ha expirado!!!");
            }
            
            autenticacionServices.logout();
            setTokenValido(false);
            break;

          default:
            //Valida si hubo un error en el api-rest
            //Si tiene token es porque estoy logueado y debo informar que hubo un error en el backend
            if(autenticacionServices.getToken())
            {
              setMensajePopup("En el momento no es posible acceder a la\ninformación, favor intentarlo más tarde.");
              setMostrarPopup(true);
            }
            break;
        }
      } 
      catch (error) 
      {
        //TODO: Guardar log del error en BD 
        console.log("error")
      }
    };

    cargarInformacion();
  }, [])
  
  

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
      let cliente = 
      {
        cedula,
        nombres,
        codProvincia,
        codCiudad: codCiudad.split("-")[1],
        direccion,
        correo,
        telefono,
        fecha: new Date(año,mes-1,dia), //El valor devuelto por getMonth() es un entero entre 0 y 11, donde 0 corresponde a Enero, 1 a Febrero y así sucesivamente
        direccionEntrega: direccion,
        estado: 1
      };

      
      //Se actualiza la información del cliente a traves del api-rest
      let { status } = await clienteServices.actualizarCliente(cliente);

      switch (status)
      {
        case Constantes.STATUS_OK:
          setMensajePopup("Tu información se ha guardado correctamente.");
          setMostrarPopup(true);
          break;

        case Constantes.STATUS_ACCESO_DENEGADO:
          autenticacionServices.logout();
          alert("Tu sesión ha expirado!!!");
          setTokenValido(false);
          break;

        default:
          //Valida si hubo un error en el api-rest
          setMensajePopup("En el momento, no es posible actualizar tus datos.");
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



  /**
  * Función que permite cargar las ciudades según la provincia seleccionada
  */
  const cargarCiudadesByProvincia = (e) => 
  {
    let codigoProvinciaSeleccionado = e.target.value;
    let lstCiudadesFiltradas = lstCiudades.filter(ciudad => ciudad.codigoCiudad.includes(codigoProvinciaSeleccionado+"-"));

    setCodProvincia(codigoProvinciaSeleccionado);
    setLstCiudadesFiltradas(lstCiudadesFiltradas);

    //Si el cliente pertenece a la primera ciudad de la lista entonces se coloca por default ese primer codigo ya que el cliente no tendrá la necesidad de interactuar con esta lista
    setCodCiudad(lstCiudadesFiltradas[0].codigoCiudad);
  }


  return (
    isTokenValido ?
    <div className="bgg-success">
      <Header height={"none"} fondo={""} titulo={""}/>

      <div className="container mt-5 pt-5 bgg-dark" style={{width:"42%"}}>
        <h2>DATOS PERSONALES</h2>
        <form className="needs-validation bgg-warning" onSubmit={validarFormulario} noValidate>
  
          <div className="row form-group mt-5">
            <div className="col mr-4">
              <label htmlFor="txtNombres">Nombre completo:</label>
              <input type="text" className="form-control" placeholderr="Enter nombres completos" id="txtNombres" maxLength="150" required value={nombres || ''} onChange={e => setNombres(e.target.value)} />
              <div className="invalid-feedback">
                Este campo es obligatorio.
              </div>
            </div>
            <div className="col ml-4">
              <label htmlFor="txtCedula">Cedula:</label>
              <input type="text" className="form-control" placeholderr="Enter cedula" id="txtCedula" maxLength="13" readOnly required value={cedula} onChange={e => setCedula(e.target.value)} />
              <div className="invalid-feedback">
                Este campo es obligatorio.
              </div>
            </div>
          </div>

          
          <div className="row form-group mt-5">
            <div className="col mr-4">
              <label htmlFor="txtTelefono">Número de teléfono:</label>
              <input type="text" className="form-control" placeholderr="Enter teléfono" id="txtTelefono" maxLength="10" required value={telefono} onChange={e => setTelefono(e.target.value)} />
              <div className="invalid-feedback">
                Este campo es obligatorio.
              </div>
            </div>
            <div className="col ml-4">
              <label htmlFor="txtDireccion">Dirección:</label>
              <input type="text" className="form-control" placeholderr="Enter Dirección" id="txtDireccion" maxLength="100" required value={direccion} onChange={e => setDireccion(e.target.value)} />
              <div className="invalid-feedback">
                Este campo es obligatorio.
              </div>
            </div>
          </div>


          <div className="row form-group mt-5">
            <div className="col mr-4">
              <span>Fecha de cumpleaños</span>

              <div className="d-flex pt-2 bg-secondaryy text-white">
                <select className="form-control mr-2" id="txtDia" value={dia} onChange={e => setDia(e.target.value)} >
                  <option>Día</option>
                  {
                    lstDias.map(dia => 
                    (
                      <option key={dia} value={dia}>{dia}</option>
                    ))
                  }
                </select>

                <select className="form-control mr-2" id="txtMes" value={mes} onChange={e => setMes(e.target.value)} >
                  <option>Mes</option>
                  {
                    lstMeses.map(mes => 
                    (
                      <option key={mes} value={mes}>{mes}</option>
                    ))
                  }
                </select>

                <select className="form-control" id="txtAño" value={año} onChange={e => setAño(e.target.value)} >
                  <option>Año</option>
                  {
                    lstAños.map(año => 
                    (
                      <option key={año} value={año}>{año}</option>
                    ))
                  }
                </select>
              </div>
              
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
              <select className="custom-select" id="cbxCodProvincia" value={codProvincia} onChange={cargarCiudadesByProvincia} >
              {
                lstProvincias.map(ciudad => 
                (
                  <option key={ciudad.id} value={ciudad.codigoProvincia}>{ciudad.nombre}</option>
                ))
              }
              </select>
            </div>
          </div>


          <div className="row form-group mt-5">
            <div className="col mr-4">
              <label htmlFor="cbxCodCiudad">Ciudad:</label>
              <select className="custom-select" id="cbxCodCiudad" value={codCiudad} onChange={e => setCodCiudad(e.target.value)} >
              {
                lstCiudadesFiltradas.map(ciudad => 
                (
                  <option key={ciudad.id} value={ciudad.codigoCiudad}>{ciudad.nombre}</option>
                ))
              }
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
    :
    <Redirect to={"/articulos"} />
  );
}

export default InformacionPersonal;